import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHrAu6QBH_pwnLKqiVLOuc561ztot343s",
  authDomain: "crwn-clothing-db-7ea51.firebaseapp.com",
  projectId: "crwn-clothing-db-7ea51",
  storageBucket: "crwn-clothing-db-7ea51.appspot.com",
  messagingSenderId: "75633310690",
  appId: "1:75633310690:web:6534eb800a0468ef0797bb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider= new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
  if(!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);

  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt,
        ...additionalInformation,
      });
    } catch(error) {
      console.log('error createing the user', error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}