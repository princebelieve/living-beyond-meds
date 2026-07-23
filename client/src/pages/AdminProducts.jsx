// src/pages/AdminProducts.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import StoryForm from "../components/StoryForm";
import { getSupportTickets, updateSupportTicket } from "../services/api";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [stories, setStories] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState("");
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

  async function loadSupportTickets() {
    setSupportLoading(true);
    setSupportError("");

    try {
      const tickets = await getSupportTickets(getToken());
      setSupportTickets(tickets);
    } catch (error) {
      setSupportError(error.message || "Unable to load support tickets.");
    } finally {
      setSupportLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "support") {
      loadSupportTickets();
    }
  }, [activeTab]);

  async function handleSupportStatus(ticketId, status) {
    try {
      const updated = await updateSupportTicket(ticketId, { status }, getToken());
      setSupportTickets((prev) => prev.map((ticket) => (ticket._id === ticketId ? updated : ticket)));
    } catch (error) {
      setSupportError(error.message || "Unable to update ticket.");
    }
  }

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
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border:
                activeTab === "support"
                  ? "2px solid #16664d"
                  : "1px solid #ccc",
              background: activeTab === "support" ? "#effaf2" : "white",
            }}
          >
            Support
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
        ) : activeTab === "stories" ? (
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
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2>Support tickets</h2>
              <p style={{ color: "#475569" }}>
                Review and update escalated support requests from the global chat bubble.
              </p>
            </div>
            {supportLoading && <p>Loading support tickets...</p>}
            {supportError && <p style={{ color: "#b13636" }}>{supportError}</p>}
            {!supportLoading && supportTickets.length === 0 && (
              <p>No support tickets have been created yet.</p>
            )}
            <div
              style={{
                display: "grid",
                gap: 20,
                marginTop: 20,
              }}
            >
              {supportTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 20,
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0 }}>{ticket.name}</h3>
                      <p style={{ margin: "6px 0", color: "#4b5b6a" }}>
                        {ticket.email}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        background:
                          ticket.status === "resolved" ? "#d7f2dc" : "#eef4ff",
                        color: ticket.status === "resolved" ? "#16664d" : "#304b7e",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div style={{ margin: "18px 0" }}>
                    <p style={{ margin: 0, color: "#475569" }}>{ticket.message}</p>
                  </div>
                  {ticket.aiReply && (
                    <div style={{ marginBottom: 18 }}>
                      <strong>AI Reply</strong>
                      <p style={{ margin: "10px 0", color: "#334155" }}>
                        {ticket.aiReply}
                      </p>
                    </div>
                  )}
                  {ticket.adminReply && (
                    <div style={{ marginBottom: 18 }}>
                      <strong>Admin Reply</strong>
                      <p style={{ margin: "10px 0", color: "#334155" }}>
                        {ticket.adminReply}
                      </p>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => handleSupportStatus(ticket._id, "open")}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 999,
                        border: "1px solid #16664d",
                        background: "#fff",
                        color: "#16664d",
                      }}
                    >
                      Mark open
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSupportStatus(ticket._id, "resolved")}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 999,
                        border: "1px solid #0f2f44",
                        background: "#0f2f44",
                        color: "#fff",
                      }}
                    >
                      Mark resolved
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
