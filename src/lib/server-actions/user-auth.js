"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { firebaseAdmin } from "../firebase/admin";
import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";

export async function login(idToken) {
    console.log("login server action");

    // Verify idToken with firebase
    const token = await firebaseAdmin.auth().verifyIdToken(idToken);
    // console.log('verified token')
    // console.log(token)

    // Sync user to users collection
    const docData = {
        uid: token.uid,
        name: token.name,
        picture: token.picture,
        email: token.email,
        badges: {
            firstMoodLogBadge: 0,
            weeklyStreakBadge: 0,
            positiveDayBadge: 0
        }
    }
    await setDoc(doc(db, "users", token.uid), docData, { merge: true });


    // Set session cookie using firebase

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // Set session expiration to 5 days.
    const sessionCookie = await firebaseAdmin.auth().createSessionCookie(idToken, { expiresIn })

    // set cookie for session
    cookies().set('session', sessionCookie, { httpOnly: true, maxAge: expiresIn, secure: true })
    // cookies().set('test-user', 'Delba')

    // // Delete cookie
    // cookies().delete('name')
    // Set cookie

    redirect("/dashboard")

}

export async function logout() {
    // revoke session in firebase
    const sessionCookie = cookies().get("session");
    const decodedClaims = await firebaseAdmin.auth().verifySessionCookie(sessionCookie.value);

    await firebaseAdmin.auth().revokeRefreshTokens(decodedClaims.sub);

    // clear the cookie
    cookies().delete("session");

    // redirect to home page
    redirect("/")
}

export async function currentUser() {
    const sessionCookie = cookies().get("session");

    try {
        console.log("currentUser action")
        console.log('cookie', sessionCookie)

        const decodedClaims = await firebaseAdmin.auth().verifySessionCookie(sessionCookie.value);

        const uid = decodedClaims.uid;

        console.log('uid', uid)

        // get user from users collection
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const user = docSnap.data()
            return user;
        } else {
            console.log("no user found")
            // throw an error
            return null
        }
    } catch (error) {
        console.log(error);
        return null
    }
}

