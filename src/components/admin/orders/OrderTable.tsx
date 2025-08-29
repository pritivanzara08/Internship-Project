import React from "react";
import { Order, OrderStatus } from "@/types/admin";
import { OrderRow } from "./OrderRow";

interface Props {
  orders: Order[];
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}

export const OrderTable: React.FC<Props> = ({ orders, onStatusChange, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Items</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <OrderRow
            key={o.id}
            order={o}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};
