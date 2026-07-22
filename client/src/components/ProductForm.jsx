// src/components/ProductForm.jsx
import { useState, useEffect } from "react";

export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancelEdit,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        image: editingProduct.image,
      });
    } else {
      setForm({ name: "", price: "", image: "" });
    }
  }, [editingProduct]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...form,
      price: Number(form.price),
    });

    setForm({ name: "", price: "", image: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 500 }}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancelEdit} className="btn-danger">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
