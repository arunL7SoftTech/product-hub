const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(errorBody.message || "Request failed");
    error.status = response.status;
    error.details = errorBody.errors;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchProducts = () =>
  fetch(buildUrl("/api/products")).then(handleResponse);

export const createProduct = (product) =>
  fetch(buildUrl("/api/products"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then(handleResponse);

export const updateProduct = (id, product) =>
  fetch(buildUrl(`/api/products/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then(handleResponse);

export const deleteProduct = (id) =>
  fetch(buildUrl(`/api/products/${id}`), {
    method: "DELETE",
  }).then(handleResponse);

