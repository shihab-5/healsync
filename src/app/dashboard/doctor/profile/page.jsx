"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Input, Chip } from "@heroui/react";
import {
  CirclePlus,
  TrashBin,
  Person,
  CircleCheck,
} from "@gravity-ui/icons";import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { getDoctors, updateDoctorProfile } from "@/app/lib/action/doctor";
import Image from "next/image";

const DEFAULT_SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"];

export default function DoctorProfilePage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const currentUser = session?.user;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [doctorId, setDoctorId] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [slots, setSlots] = useState(DEFAULT_SLOTS);
  const [newSlotInput, setNewSlotInput] = useState("");

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const allDoctors = await getDoctors();
        if (!allDoctors || allDoctors.length === 0) return;

        // Match doctor profile by session user ID or email
        const matchedDoctor =
          allDoctors.find(
            (doc) =>
              doc.userId === currentUser?.id ||
              doc.email?.toLowerCase() === currentUser?.email?.toLowerCase() ||
              doc._id === currentUser?.id
          ) || allDoctors[0];

        if (matchedDoctor) {
          setDoctorId(matchedDoctor._id || matchedDoctor.id);
          setName(matchedDoctor.name || currentUser?.name || "Dr. James Mitchell");
          setEmail(matchedDoctor.email || currentUser?.email || "james@medicare.com");
          setPhone(matchedDoctor.phone || "+1-555-0102");
          setGender(matchedDoctor.gender || "Male");
          setQualifications(matchedDoctor.qualifications || "MBBS, MD (Cardiology)");
          setExperience(matchedDoctor.experience || "8 Years");
          setConsultationFee(matchedDoctor.consultationFee || "120");
          if (matchedDoctor.schedule || matchedDoctor.slots) {
            setSlots(matchedDoctor.schedule || matchedDoctor.slots);
          }
        }
      } catch (err) {
        console.error("Failed to fetch doctor profile:", err);
        toast.error("Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };

    if (!isSessionPending) {
      loadProfileData();
    }
  }, [currentUser, isSessionPending]);

  // Slot Management
  const handleAddSlot = () => {
    if (!newSlotInput.trim()) return;
    if (slots.includes(newSlotInput.trim())) {
      toast.error("Slot already exists");
      return;
    }
    setSlots([...slots, newSlotInput.trim()]);
    setNewSlotInput("");
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter((slot) => slot !== slotToRemove));
  };

  // Profile Form Submission matched to your exact updateDoctorProfile API action
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      toast.error("Doctor profile ID not found");
      return;
    }

    setSubmitting(true);

    // Payload formatted to match exact keys expected by your API endpoint
    const payload = {
      qualifications,
      experience,
      consultationFee: Number(consultationFee) || consultationFee,
      schedule: slots,
      // Optional extra fields if supported by your API
      phone,
      gender,
    };

    try {
      // Calls your exact fetch action (throws error if !res.ok)
      await updateDoctorProfile(doctorId, payload);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.message || "Failed to update doctor profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSessionPending || loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F4F6F8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F4F6F8] p-4 md:p-8 font-sans">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Manage your personal account information
        </p>
      </div>

      <div className="space-y-6 max-w-5xl">
        {/* Top Header Card */}
        <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 shadow-sm flex flex-row items-center gap-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
              <Image
                             src={currentUser?.image || 'https://images.pexels.com/photos/30002405/pexels-photo-30002405.jpeg'}
                             alt={`${currentUser?.name || 'User'}'s profile avatar`}
                             width={112}
                             height={112}
                             priority
                             className="relative w-28 h-28 object-cover rounded-2xl border border-white/10 shadow-md bg-teal-950"
                           />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#1E293B]">{name}</h2>
            <p className="text-xs font-semibold text-slate-400">{email}</p>
            <div className="pt-1">
              <Chip
                status="success"
                variant="flat"
                className="bg-emerald-50 text-emerald-600 font-bold text-xs px-3 py-0.5 rounded-full"
              >
                Doctor
              </Chip>
            </div>
          </div>
        </Card>

        {/* Profile Settings Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Section 1: Personal Information */}
          <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Person className="text-blue-600" width={20} height={20} />
              <h3 className="text-lg font-extrabold text-[#1E293B]">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Full Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. James Mitchell"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Email
                </label>
                <Input
                  value={email}
                  disabled
                  className="bg-slate-100/70 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Phone
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1-555-0102"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Section 2: Professional Details */}
          <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#1E293B] mb-6">
              Professional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Qualifications
                </label>
                <Input
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="MBBS, MD"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Experience
                </label>
                <Input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 8 Years"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Consultation Fee ($)
                </label>
                <Input
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  placeholder="120"
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Available Slots */}
          <Card className="border border-slate-200/60 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-[#1E293B] mb-4">
              Available Slots
            </h3>

            {/* Input to add a new slot */}
            <div className="flex items-center gap-3 mb-5 max-w-md">
              <Input
                placeholder="Add slot (e.g. 03:00 PM)"
                value={newSlotInput}
                onChange={(e) => setNewSlotInput(e.target.value)}
              />
              <Button
                type="button"
                onPress={handleAddSlot}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl px-4 shrink-0"
                startContent={<CirclePlus width={16} height={16} />}
              >
                Add Slot
              </Button>
            </div>

            {/* Existing Slots Badges */}
            <div className="flex flex-wrap gap-2">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700"
                >
                  <span>{slot}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(slot)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <TrashBin width={14} height={14} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Save Button */}
          <div>
            <Button
              type="submit"
              isLoading={submitting}
              className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-3 shadow-md"
              startContent={!submitting && <CircleCheck width={18} height={18} />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}