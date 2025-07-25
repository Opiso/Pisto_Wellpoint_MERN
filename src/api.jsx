// Automatically use either VITE_API_URL (prod) or '' (dev with proxy)
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// Example: GET /api/users
export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    credentials: "include", // include cookies if using auth
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

// Example: POST /api/login
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // important for sessions or JWT in cookies
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}
