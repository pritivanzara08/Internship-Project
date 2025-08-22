// // import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const order = req.body;
//     const docRef = await addDoc(collection(db, "orders"), order);
//     return res.status(201).json({ id: docRef.id });
//   }

//   res.setHeader("Allow", ["POST"]);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }
