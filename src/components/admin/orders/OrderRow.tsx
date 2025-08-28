import React from "react";
import { Order } from "@/types/admin";
import { OrderStatusSelect } from "./OrderStatusSelect";

export const OrderRow: React.FC<{
  order: Order;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}> = ({ order, onStatusChange, onDelete }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.customerName}</td>
      <td>₹{order.total}</td>
      <td>{order.items.length}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <OrderStatusSelect
          value={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
        />
      </td>
      <td>
        <button className="btn-delete" onClick={() => onDelete(order.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
