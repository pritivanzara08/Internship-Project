// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   if (req.method === "GET") {
//     const docSnap = await getDoc(doc(db, "orders", id as string));
//     if (!docSnap.exists()) return res.status(404).json({ error: "Order not found" });
//     return res.status(200).json({ id, ...docSnap.data() });
//   }

//   res.setHeader("Allow", ["GET"]);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }
