// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBbp2uBup2oXlc6YpeRqlfn9iZ0TebLpcI',
  authDomain: 'crwnclothing-appp.firebaseapp.com',
  projectId: 'crwnclothing-appp',
  storageBucket: 'crwnclothing-appp.appspot.com',
  messagingSenderId: '937504774306',
  appId: '1:937504774306:web:78adb601b73764222e1ffb',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithGoogleRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  console.log(userSnapShot);

  //if user data doesn't exists
  // create/set the document with data from userAuth in my collection

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(
        'error while performing this operation',
        error.message,
      );
    }
  }

  //if user data exists
  return userDocRef;
};

export const createAuthenticatedUserWithEmailAndPassword =
  async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
  };
