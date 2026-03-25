import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { exp } from "firebase/firestore/pipelines";

export const addUser = async () => {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     name: "Arcebel Escol",
  //     email: "arcebel.escol@gmail.com",
  //     age: 25,
  //     createdAt: new Date(),
  //     password: "123456",
  //     role: "member",
  //   });
  //return docRef.id;
};

export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));

  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
}
export async function checklogin(param: { email: string; password: string }) {
  const q = query(
    collection(db, "users"),
    where("email", "==", param.email),
    where("password", "==", param.password),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null; // ❌ no user found
  }

  const userDoc = snapshot.docs[0]; // ✅ get first match

  return {
    id: userDoc.id,
    ...userDoc.data(),
  };
}
export async function getMembers() {
  const q = query(collection(db, "users"), where("role", "==", "member"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
