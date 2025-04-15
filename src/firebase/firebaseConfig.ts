import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3oSgCBrikfk_sdr8I_edDok749mFMl88",
    authDomain: "recetasapp-93e5c.firebaseapp.com",
    projectId: "recetasapp-93e5c",
    storageBucket: "recetasapp-93e5c.appspot.com",
    messagingSenderId: "275026242241",
    appId: "1:275026242241:web:74108ff13f8a9ceedb8240"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);