import admin from "firebase-admin";
import { env, isDev } from "./env.js";

let initialized = false;

function initFirebase() {
  if (initialized) {
    return;
  }

  if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      })
    });
    initialized = true;
  }
}

export async function verifyFirebaseToken(token: string) {
  initFirebase();

  if (!admin.apps.length) {
    if (isDev && token.startsWith("dev-token:")) {
      const [, firebaseUid, email = "demo@dishcovery.app"] = token.split(":");
      return {
        uid: firebaseUid ?? "dev-user",
        email
      };
    }

    throw new Error("Firebase is not configured");
  }

  const decoded = await admin.auth().verifyIdToken(token);
  return {
    uid: decoded.uid,
    email: decoded.email
  };
}
