import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import app from "./init";
import { errorHandler } from "../error";

const firestore = getFirestore(app);

export async function retrieveDataByUserSub(collectionName: string, userSub: string) {
  try {
    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, where("sub", "==", userSub));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    errorHandler("firestore", error);
  }
}

export async function addData(collectionName: string, data: any) {
  try {
    const collectionRef = collection(firestore, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    errorHandler("firestore", error);
  }
}

export async function setData(collectionName: string, docId: string, data: any) {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await setDoc(docRef, data);
    return { id: docId, ...data };
  } catch (error) {
    errorHandler("firestore", error);
  }
}

export async function deleteData(collectionName: string, docId: string) {
  try {
    const docRef = doc(firestore, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, id: docId };
  } catch (error) {
    errorHandler("firestore", error);
    return { success: false, error };
  }
}