
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getReviews = async () => {
  const res = await fetch(`${BASE_URL}/api/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

export const addReview = async (payload) => {
  // payload: { patientId, doctorId, doctorName, rating, reviewText }
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add review");
  return res.json();
};

export const updateReview = async (id, payload) => {
  // payload: { rating, reviewText }
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update review");
  return res.json();
};

export const deleteReview = async (id) => {
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete review");
  return res.json();
};