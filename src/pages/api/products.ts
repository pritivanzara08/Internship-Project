import { connect } from "http2";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  res.status(200).json(products);
}