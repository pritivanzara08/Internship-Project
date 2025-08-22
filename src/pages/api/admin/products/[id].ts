import dbConnect from "@/lib/dbConnect";
import Product, {IProduct} from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  //connect to database
  await dbConnect();

  //basic Id Validation
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const productId = id.toString();

  if (req.method === "GET") {
    try {
      const product = await Product.findById(productId).lean();
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json({id: product._id, ...product});
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  if (req.method === "PUT") {
    try {
      const updated = await Product.findByIdAndUpdate(productId, req.body, { new: true }).lean();
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ message: "Product updated", product: updated });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleted = await Product.findByIdAndDelete(productId).lean();
      if (!deleted) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
