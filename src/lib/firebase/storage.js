import { storage } from "./config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nanoid } from 'nanoid'


export const uploadImageFirebase = (file) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${nanoid()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle progress, such as updating a progress bar
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error("Upload failed:", error);
                reject(error);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("File available at", url);
                    resolve(url);
                });
            }
        );
    });
};