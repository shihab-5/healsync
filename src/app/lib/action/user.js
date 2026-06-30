

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/user`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const updateUserStatus = async (id, status) => {
  // status: "active" | "suspended"
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update user status");
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};