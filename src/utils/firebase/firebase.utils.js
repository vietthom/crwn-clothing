import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBHrAu6QBH_pwnLKqiVLOuc561ztot343s",
  authDomain: "crwn-clothing-db-7ea51.firebaseapp.com",
  projectId: "crwn-clothing-db-7ea51",
  storageBucket: "crwn-clothing-db-7ea51.appspot.com",
  messagingSenderId: "75633310690",
  appId: "1:75633310690:web:6534eb800a0468ef0797bb"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
