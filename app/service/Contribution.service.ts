import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { stat } from "fs";

export async function addContribution(param: {
  memberId: string;
  name: string;
  amount: number;
  date: Date;
  proof: string;
}) {
  try {
    const docRef = await addDoc(collection(db, "contributions"), {
      memberId: param.memberId,
      name: param.name,
      amount: param.amount,
      date: param.date,
      proof: param.proof,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding contribution:", error);
    return { success: false, error };
  }
}
export async function getContributions() {
  const querySnapshot = await getDocs(collection(db, "contributions"));

  const contributions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return contributions;
}

export async function getPendingContributions() {
  const q = query(
    collection(db, "contributions"),
    where("status", "==", "pending"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
