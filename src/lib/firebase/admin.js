import * as admin from "firebase-admin";

// var serviceAccount = require("path/to/serviceAccountKey.json");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

const firebaseAdmin = admin.apps.length === 0 ? admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount))
}) : admin.apps[0];


export { firebaseAdmin };
