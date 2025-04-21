import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};


export const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};


export const logout = () => {
    return signOut(auth);
};