import admin from 'firebase-admin';
import { config } from './env';

// Initialize Firebase Admin SDK
export const initializeFirebase = (): void => {
  try {
    const hasCreds = Boolean(
      config.firebase.projectId &&
      config.firebase.privateKey &&
      config.firebase.clientEmail
    );

    if (!hasCreds) {
      console.warn('Firebase credentials not provided. Skipping Firebase Admin initialization.');
      return;
    }

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          privateKey: String(config.firebase.privateKey).replace(/\\n/g, '\n'),
          clientEmail: config.firebase.clientEmail,
        } as any),
        databaseURL: `https://${config.firebase.projectId}-default-rtdb.firebaseio.com`,
      });

      console.log('Firebase Admin SDK initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // Do not throw in development; allow app to continue without Firebase
    if (process.env['NODE_ENV'] === 'production') {
      throw error;
    }
  }
};

// Get Firebase Admin instance
export const getFirebaseAdmin = () => {
  if (admin.apps.length === 0) {
    initializeFirebase();
  }
  return admin;
};

// Get Firestore instance
export const getFirestore = () => {
  return getFirebaseAdmin().firestore();
};

// Get Auth instance
export const getAuth = () => {
  return getFirebaseAdmin().auth();
};

// Verify Firebase ID token
export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    throw error;
  }
};

// Create custom token
export const createCustomToken = async (uid: string, additionalClaims?: object) => {
  try {
    const customToken = await getAuth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

export default {
  initializeFirebase,
  getFirebaseAdmin,
  getFirestore,
  getAuth,
  verifyIdToken,
  createCustomToken,
};
