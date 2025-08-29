import { Order, OrderStatus } from "@/types/admin";
import React from "react";

interface Props {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}

export const OrderRow: React.FC<Props> = ({ order, onStatusChange, onDelete }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.customerName}</td>
      <td>₹{order.total}</td>
      <td>{order.items.length}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>
      <td>
        <button onClick={() => onDelete(order.id)}>Delete</button>
      </td>
    </tr>
  );
};
