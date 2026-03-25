import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { stat } from "fs";
import { exp } from "firebase/firestore/pipelines";
type Transactions = {
  id: string;
  memberId: string;
  name: string;
  amount: number;
  date: Date;
  proof: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};
export async function addTransactions(param: {
  memberId: string;
  name: string;
  amount: number;
  date: Date;
  proof: string;
  type: "contribution" | "loan";
}) {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      memberId: param.memberId,
      name: param.name,
      amount: param.amount,
      date: param.date,
      proof: param.proof,
      createdAt: serverTimestamp(),
      status: "pending",
      type: param.type,
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding contribution:", error);
    return { success: false, error };
  }
}
export function getTransactions(
  callback: (
    data: Transactions[],
    approvedTotal: number,
    pendingTotal: number,
  ) => void,
) {
  return onSnapshot(collection(db, "transactions"), (snapshot) => {
    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Transactions, "id">),
    }));

    // ✅ compute total pending
    const pendingTotal = transactions
      .filter((c) => c.status === "pending")
      .reduce((sum, c) => sum + Number(c.amount), 0);

    // ✅ compute total contributions approved
    const approvedTotal = transactions
      .filter((c) => c.status === "approved")
      .reduce((sum, c) => sum + Number(c.amount), 0);

    callback(transactions, approvedTotal, pendingTotal);
  });
}

export function getContributions(
  callback: (data: Transactions[], approvedTotal: number) => void,
) {
  const q = query(
    collection(db, "transactions"),
    where("type", "==", "contribution"),
    where("status", "==", "approved"), 
  );

  // listen for real-time changes
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transactions[];

    const approvedTotal = data
      .filter((t) => t.status === "approved")
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    callback(data, approvedTotal);
  });
}

export async function getPendingContributions() {
  const q = query(
    collection(db, "transactions"),
    where("status", "==", "pending"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
