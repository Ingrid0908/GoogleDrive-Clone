import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDKy_u2xfAIaXqTTyHlESKSGZ6WmZ7t-JI",
  authDomain: "drive-clone-a5132.firebaseapp.com",
  projectId: "drive-clone-a5132",
  storageBucket: "drive-clone-a5132.firebasestorage.app",
  messagingSenderId: "1083969115840",
  appId: "1:1083969115840:web:74673b0be3c16a6b04ff25"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };