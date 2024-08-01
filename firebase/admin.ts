// lib/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_AUTH_CERT_URL,
      client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DATABASE_URL,
  });
}

export default admin;
