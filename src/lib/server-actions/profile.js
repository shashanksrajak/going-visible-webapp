'use server'

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { revalidatePath } from "next/cache";


export const updateProfile = async (userId, profileData) => {
    try {
        // Reference to the user's document in the Firestore database
        const userRef = doc(db, "users", userId);

        // Update the user's document with the new profile data
        await updateDoc(userRef, profileData);

        console.log("Profile updated successfully");
        revalidatePath("/profile")

        return true;
    } catch (error) {
        console.error("Error updating profile:", error);
    }
};
