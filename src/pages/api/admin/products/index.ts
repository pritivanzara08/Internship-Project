// import { db } from '@/lib/firebase';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const productsRef = collection(db, 'products');

//   if (req.method === 'GET') {
//     const snapshot = await getDocs(productsRef);
//     const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return res.status(200).json(products);
//   }

//   if (req.method === 'POST') {
//     try {
//       const product = req.body;
//       const docRef = await addDoc(productsRef, product);
//       return res.status(201).json({ id: docRef.id });
//     } catch (err) {
//       return res.status(500).json({ message: 'Error creating product', error: err });
//     }
//   }

//   res.setHeader('Allow', ['GET', 'POST']);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }