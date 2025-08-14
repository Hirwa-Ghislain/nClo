import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBWnffm20HUGcVmaChtesQzvRKTXxSK8IY",
  authDomain: "nclo-c921e.firebaseapp.com",
  projectId: "nclo-c921e",
  storageBucket: "nclo-c921e.firebasestorage.app",
  messagingSenderId: "711232654302",
  appId: "1:711232654302:web:931b3d8a3664ded0716b4f"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,  
            name,
            authProvider: "local",
            email,
        })
    }catch(error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth)
}

export { auth, db, signup, login, logout };