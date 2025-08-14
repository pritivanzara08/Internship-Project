import { Schema, model, models, Types } from 'mongoose';

export interface IOrderItem {
productId: Types.ObjectId;
name?: string;
price: number;
quantity: number;
// You can store customization data per item if needed
customizationData?: any;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

export interface IOrder {
userId: Types.ObjectId;
items: IOrderItem[];
total: number;
status: OrderStatus;
createdAt?: Date;
updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
{
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
items: [
{
productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
name: String,
price: { type: Number, required: true },
quantity: { type: Number, required: true },
customizationData: Schema.Types.Mixed,
},
],
total: { type: Number, required: true },
status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
},
{ timestamps: true }
);

const Order = (models.Order as unknown as typeof Schema) || model<IOrder>('Order', OrderSchema) as any;
export default Order;