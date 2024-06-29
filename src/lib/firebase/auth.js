import { auth } from "./config"
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}


export async function signOut() {
    try {
        return auth.signOut()
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}