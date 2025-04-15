import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // ⬅️ Usa el auth correcto, configurado con firebaseConfig

// Login con email y contraseña
export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Registro con email y contraseña
export const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Para cerrar sesión
export const logout = () => {
    return signOut(auth);
};