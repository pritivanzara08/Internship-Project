import React from "react";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export const OrderStatusSelect: React.FC<{
  value: string;
  onChange: (newStatus: string) => void;
}> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="order-status-select"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
};
