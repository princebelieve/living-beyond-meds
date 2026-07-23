const BASE_URL = import.meta.env.VITE_API_URL;

// -------------------------
// AUTH
// -------------------------
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function resetPassword(token, password) {
  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  return res.json();
}

// -------------------------
// STRIPE / PAYMENTS
// -------------------------
export async function createCheckoutSession(productId) {
  const res = await fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Payment session failed");
  }
  return data;
}

export async function createCartCheckoutSession(cartItems) {
  const res = await fetch(`${BASE_URL}/api/payments/create-cart-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Checkout session failed");
  }
  return data;
}

// DONATION
export async function createDonationSession(data) {
  const res = await fetch(`${BASE_URL}/api/payments/create-donation-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      result.error || result.message || "Donation session failed",
    );
  }
  return result;
}

export async function sendSupportChat(data) {
  const res = await fetch(`${BASE_URL}/api/support/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Support request failed");
  }
  return result;
}

export async function getSupportTickets(token) {
  const res = await fetch(`${BASE_URL}/api/support/tickets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Unable to load support tickets");
  }
  return result;
}

export async function updateSupportTicket(id, data, token) {
  const res = await fetch(`${BASE_URL}/api/support/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Unable to update support ticket");
  }
  return result;
}

// -------------------------
// STORIES
// -------------------------
export async function getStories() {
  const res = await fetch(`${BASE_URL}/api/stories`);
  return res.json();
}

export async function getStory(id) {
  const res = await fetch(`${BASE_URL}/api/stories/${id}`);
  return res.json();
}

export async function createStory(data, token) {
  const res = await fetch(`${BASE_URL}/api/stories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return res.json();
}

export async function updateStory(id, data, token) {
  const res = await fetch(`${BASE_URL}/api/stories/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return res.json();
}

export async function deleteStory(id, token) {
  const res = await fetch(`${BASE_URL}/api/stories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// -------------------------
// PRODUCTS
// -------------------------
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  return res.json();
}
