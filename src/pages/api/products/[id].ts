import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const docRef = doc(db, "products", id as string);

  if (req.method === "GET") {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ id, ...docSnap.data() });
  }

  if (req.method === "PUT") {
    await updateDoc(docRef, req.body);
    return res.status(200).json({ message: "Product updated" });
  }

  if (req.method === "DELETE") {
    await deleteDoc(docRef);
    return res.status(200).json({ message: "Product deleted" });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
