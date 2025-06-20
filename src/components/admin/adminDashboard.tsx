import React from "react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
          <p className="text-gray-600">Add, edit, or delete products in your store.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">View Orders</h2>
          <p className="text-gray-600">Track and manage customer orders.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <p className="text-gray-600">Manage user roles and permissions.</p>
        </div>
      </div>
    </div>
  );
}