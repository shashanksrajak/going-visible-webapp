import * as admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

const firebaseAdmin = admin.apps.length === 0 ? admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount))
}) : admin.apps[0];


export { firebaseAdmin };
