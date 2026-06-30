
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
 
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/user`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};
 