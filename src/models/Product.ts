import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct {
name: string;
description?: string;
price: number;
imageUrl?: string;
inStock?: boolean;
// Placeholder for customization options (e.g., color, size)
customizationOptions?: {
optionName: string;
values: string[];
}[];
createdAt?: Date;
updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
{
name: { type: String, required: true },
description: String,
price: { type: Number, required: true },
imageUrl: String,
inStock: { type: Boolean, default: true },
customizationOptions: [
{
optionName: { type: String },
values: [{ type: String }],
},
],
},
{ timestamps: true }
);

const Product =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>('Product', ProductSchema);
export default Product;