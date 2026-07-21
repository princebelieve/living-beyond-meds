// src/pages/AdminProducts.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import StoryForm from "../components/StoryForm";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [stories, setStories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  async function loadProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  }

  async function loadStories() {
    const res = await fetch(`${BASE_URL}/api/stories`);
    const data = await res.json();
    setStories(data);
  }

  useEffect(() => {
    loadProducts();
    loadStories();
  }, []);

  async function handleSubmit(formData) {
    const method = editingProduct ? "PUT" : "POST";

    const url = editingProduct
      ? `${BASE_URL}/api/products/${editingProduct._id}`
      : `${BASE_URL}/api/products`;

    const body = new FormData();

    body.append("name", formData.name);
    body.append("price", formData.price);

    if (formData.image) {
      body.append("image", formData.image);
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Unable to save product");
      return;
    }

    setEditingProduct(null);
    loadProducts();
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    const res = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Unable to delete product");
      return;
    }

    if (editingProduct?._id === id) {
      setEditingProduct(null);
    }

    loadProducts();
  }

  async function handleStorySubmit({ formData, id }) {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${BASE_URL}/api/stories/${id}`
      : `${BASE_URL}/api/stories`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || data.message || "Unable to save story");
      return;
    }

    setEditingStory(null);
    loadStories();
  }

  async function handleStoryDelete(id) {
    const ok = window.confirm("Delete this story?");
    if (!ok) return;

    const res = await fetch(`${BASE_URL}/api/stories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || data.message || "Unable to delete story");
      return;
    }

    if (editingStory?._id === id) {
      setEditingStory(null);
    }

    loadStories();
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border:
                activeTab === "products"
                  ? "2px solid #16664d"
                  : "1px solid #ccc",
              background: activeTab === "products" ? "#effaf2" : "white",
            }}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("stories")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border:
                activeTab === "stories"
                  ? "2px solid #16664d"
                  : "1px solid #ccc",
              background: activeTab === "stories" ? "#effaf2" : "white",
            }}
          >
            Stories
          </button>
        </div>

        {activeTab === "products" ? (
          <>
            <ProductForm
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              onCancelEdit={() => setEditingProduct(null)}
            />

            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                marginTop: 30,
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #ddd",
                    padding: 20,
                    borderRadius: 8,
                    background: "#fff",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 6,
                      marginBottom: 12,
                    }}
                  />

                  <h3>{product.name}</h3>
                  <p>£{product.price.toLocaleString()}</p>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <StoryForm
              onSubmit={handleStorySubmit}
              editingStory={editingStory}
              onCancelEdit={() => setEditingStory(null)}
            />

            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                marginTop: 30,
              }}
            >
              {stories.map((story) => (
                <div
                  key={story._id}
                  style={{
                    border: "1px solid #ddd",
                    padding: 20,
                    borderRadius: 8,
                    background: "#fff",
                  }}
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.title}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 6,
                        marginBottom: 12,
                      }}
                    />
                  )}

                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <p style={{ fontSize: 14, color: "#5c677d" }}>
                    Type: {story.type}
                  </p>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => setEditingStory(story)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStoryDelete(story._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
