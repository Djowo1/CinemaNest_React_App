import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAhK_EGoXEAVsPhFVtc7NNQHjoDBKQSaj8",
  authDomain: "netflix-clone-c484b.firebaseapp.com",
  projectId: "netflix-clone-c484b",
  storageBucket: "netflix-clone-c484b.firebasestorage.app",
  messagingSenderId: "709524706846",
  appId: "1:709524706846:web:13c82972da57c275bc800f",
  measurementId: "G-VJK5YZNKVP"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid
,
name, 
authProvider: "local",
email,
   }
);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

}
}

const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}