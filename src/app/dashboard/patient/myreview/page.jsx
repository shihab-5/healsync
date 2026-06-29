"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  Button,
  Modal,
  TextArea,
  Chip,
} from "@heroui/react";
import { Star, TrashBin, Pencil, Plus } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { getAppointments } from "@/app/lib/data";
import {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from "@/app/lib/action/review";

// Small reusable star-picker
const StarPicker = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={26}
            className={
              n <= (hover || value)
                ? "text-amber-500 fill-current"
                : "text-slate-200 fill-current"
            }
          />
        </button>
      ))}
    </div>
  );
};

const MyReviews = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null); // null = add mode
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  // ---- Load data ----
  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      try {
        const [allAppointments, allReviews] = await Promise.all([
          getAppointments(),
          getReviews(),
        ]);

        setAppointments(
          (allAppointments || []).filter((a) => a.userId === user.id)
        );
        setReviews(
          (allReviews || []).filter((r) => r.patientId === user.id)
        );
      } catch (err) {
        console.error("Failed to load reviews data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  // Doctors the patient has actually booked, minus doctors already reviewed (for "Add" flow)
  const reviewableDoctors = useMemo(() => {
    const reviewedDoctorIds = new Set(reviews.map((r) => r.doctorId));
    const seen = new Set();
    const list = [];

    appointments.forEach((a) => {
      if (!a.doctorId || seen.has(a.doctorId) || reviewedDoctorIds.has(a.doctorId)) return;
      seen.add(a.doctorId);
      list.push({ id: a.doctorId, name: a.doctorName });
    });

    return list;
  }, [appointments, reviews]);

  // ---- Modal helpers ----
  const openAddModal = () => {
    setEditingReview(null);
    setSelectedDoctorId(reviewableDoctors[0]?.id || "");
    setRating(0);
    setReviewText("");
    setError("");
    setIsOpen(true);
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setSelectedDoctorId(review.doctorId);
    setRating(review.rating);
    setReviewText(review.reviewText);
    setError("");
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!rating) {
      setError("Please select a star rating.");
      return;
    }
    if (!reviewText.trim()) {
      setError("Please write a short review.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (editingReview) {
        const updated = await updateReview(editingReview._id, {
          rating,
          reviewText: reviewText.trim(),
        });
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editingReview._id ? { ...r, rating, reviewText: reviewText.trim() } : r
          )
        );
      } else {
        const doctor = reviewableDoctors.find((d) => d.id === selectedDoctorId);
        if (!doctor) {
          setError("Please select a doctor.");
          setSubmitting(false);
          return;
        }
        const created = await addReview({
          patientId: user.id,
          doctorId: doctor.id,
          doctorName: doctor.name,
          rating,
          reviewText: reviewText.trim(),
        });
        setReviews((prev) => [
          {
            _id: created.insertedId || created._id || crypto.randomUUID(),
            patientId: user.id,
            doctorId: doctor.id,
            doctorName: doctor.name,
            rating,
            reviewText: reviewText.trim(),
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }

      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review? This can't be undone.")) return;

    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review. Please try again.");
    }
  };

  // ---- Loading ----
  if (isPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading your reviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            My Reviews
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Share feedback on the doctors you've consulted with.
          </p>
        </div>

        <Button
          onPress={openAddModal}
          isDisabled={reviewableDoctors.length === 0}
          className="bg-teal-700 hover:bg-teal-600 text-white font-bold rounded-xl px-5 self-start md:self-center"
          startContent={<Plus size={16} />}
        >
          Add Review
        </Button>
      </div>

      {reviewableDoctors.length === 0 && reviews.length === 0 && (
        <p className="text-xs text-slate-400 font-medium mb-6 -mt-4">
          You can review a doctor after booking an appointment with them.
        </p>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
            <Star size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            You haven't written any reviews yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Booked doctors will appear here once you're ready to leave feedback.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <Card
              key={review._id}
              className="border border-slate-100 bg-white rounded-2xl shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-sm font-bold text-slate-800">
                    Dr. {review.doctorName}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={14}
                        className={
                          n <= review.rating
                            ? "text-amber-500 fill-current"
                            : "text-slate-200 fill-current"
                        }
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(review)}
                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-teal-50 text-slate-500 hover:text-teal-600 flex items-center justify-center transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors"
                  >
                    <TrashBin size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {review.reviewText}
              </p>

              {review.createdAt && (
                <span className="text-[11px] font-medium text-slate-400 mt-3 block">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="font-black text-slate-800">
                  {editingReview ? "Update Review" : "Add Review"}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="gap-4">
                {!editingReview && (
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                      Doctor
                    </label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500"
                    >
                      {reviewableDoctors.map((d) => (
                        <option key={d.id} value={d.id}>
                          Dr. {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {editingReview && (
                  <div className="text-sm font-bold text-slate-700">
                    Dr. {editingReview.doctorName}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                    Your Rating
                  </label>
                  <StarPicker value={rating} onChange={setRating} />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                    Your Review
                  </label>
                  <TextArea
                    aria-label="Your Review"
                    placeholder="Share your experience with this doctor..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {error && (
                  <p className="text-xs font-semibold text-rose-600">{error}</p>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="light" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onPress={handleSubmit}
                  isLoading={submitting}
                  className="bg-teal-700 hover:bg-teal-600 text-white font-bold"
                >
                  {editingReview ? "Save Changes" : "Submit Review"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default MyReviews;