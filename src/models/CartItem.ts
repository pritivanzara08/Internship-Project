import { Schema, model, models, Types } from 'mongoose';

export interface ICartItem {
productId: Types.ObjectId;
quantity: number;
customizationData?: any;
addedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>(
{
productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
quantity: { type: Number, required: true, default: 1 },
customizationData: Schema.Types.Mixed,
addedAt: { type: Date, default: Date.now },
},
{ _id: false } // typically embedded in a Cart document; set false if you store as array items inside a Cart
);

const CartItem = (models.CartItem as unknown as typeof Schema) || model<ICartItem>('CartItem', CartItemSchema) as any;
export default CartItem;