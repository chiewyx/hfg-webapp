import { initializeApp } from "firebase/app";
​​import {
​​  GoogleAuthProvider,
​​  getAuth,
​​  signInWithPopup,
​​  signInWithEmailAndPassword,
​​  createUserWithEmailAndPassword,
​​  sendPasswordResetEmail,
​​  signOut,
​​} from "firebase/auth";
​​import {
​​  getFirestore,
​​  query,
​​  getDocs,
​​  collection,
​​  where,
​​  addDoc,
​​} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDooS5z3hWo0b-qeVWDThHj-HDvCu6AABc",
  authDomain: "democpp-a3140.firebaseapp.com",
  projectId: "democpp-a3140",
  storageBucket: "democpp-a3140.appspot.com",
  messagingSenderId: "153608965842",
  appId: "1:153608965842:web:ab1644b88d8c5c2356270b"
};

// Initialize Firebase
const app = ​​initializeApp(firebaseConfig);
​​const auth = getAuth(app);
​​const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
