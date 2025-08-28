import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  customerName: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    productId: string;
    name: string;
    qty: number;
    price: number;
  }[];
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    customerName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    total: { type: Number, required: true },
    items: [
      {
        productId: String,
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
