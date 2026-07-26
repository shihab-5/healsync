"use server";

import { revalidatePath } from "next/cache";

// Replace these placeholders with your actual Database / ORM calls (e.g., MongoDB / Prisma)
export async function addScheduleSlot(doctorId, slotData) {
  try {
    // DB Call: await Schedule.create({ doctorId, ...slotData })
    revalidatePath("/doctor/schedule");
    return { success: true };
  } catch (error) {
    console.error("Failed to add slot:", error);
    throw new Error("Failed to add schedule slot");
  }
}

export async function updateScheduleSlot(slotId, slotData) {
  try {
    // DB Call: await Schedule.findByIdAndUpdate(slotId, slotData)
    revalidatePath("/doctor/schedule");
    return { success: true };
  } catch (error) {
    console.error("Failed to update slot:", error);
    throw new Error("Failed to update schedule slot");
  }
}

export async function deleteScheduleSlot(slotId) {
  try {
    // DB Call: await Schedule.findByIdAndDelete(slotId)
    revalidatePath("/doctor/schedule");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete slot:", error);
    throw new Error("Failed to delete schedule slot");
  }
}