import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBKrhdlYLdLSJfaILiYyu33ZwVDAKRKpyo",
  authDomain: "twitter-clone-7e317.firebaseapp.com",
  projectId: "twitter-clone-7e317",
  storageBucket: "twitter-clone-7e317.appspot.com",
  messagingSenderId: "137354632487",
  appId: "1:137354632487:web:31be42102547d8f6389d02"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app)

export const storage = getStorage(app)

