import React, { useState } from "react";
import { Product } from "@/types/admin";
import categories from "@/data/catalog";
import "@/styles/ProductStyles.css";

interface Props {
  initialData?: Product;
  onSave: (data: Product) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState<Product>(
    initialData ?? { id: "", name: "", title: "", description: "", categoryId: "", imageUrl: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, id: form.id || Date.now().toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="text" name="name" value={form.name} placeholder="Name" onChange={handleChange} required />
      <input type="text" name="title" value={form.title} placeholder="Title" onChange={handleChange} required />
      <input type="text" name="description" value={form.description} placeholder="Description" onChange={handleChange} />
      <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
      <input type="text" name="imageUrl" value={form.imageUrl} placeholder="Image URL" onChange={handleChange} />
      <div className="form-actions">
        <button type="submit" className="btn-save">Save</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};
