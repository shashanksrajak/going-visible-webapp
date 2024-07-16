"use server";

import { revalidatePath } from "next/cache";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function addFamilyMember(userId, memberName, memberEmail) {
    try {
        // get user from users collection
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef)

        const user = docSnap.data()
        const userFamily = user.family || [];


        // Check if the email already exists and number of entries <5
        if (userFamily.length === 5) {
            return {
                success: false,
                message: "Maximum 5 members allowed."
            }
        }

        if (userFamily.length > 0) {
            const emailExists = userFamily.find(el => el.email === memberEmail)
            if (emailExists) {
                return {
                    success: false,
                    message: "Email already added."
                }
            }
        }

        const newMember = { email: memberEmail, name: memberName };

        userFamily.push(newMember);

        await updateDoc(docRef, { family: userFamily });

        // revalidate path
        revalidatePath("/family")

        return true;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong!"
        }
    }
}

