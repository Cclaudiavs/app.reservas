import React from 'react';
import { auth } from '../firebase/firebase.config';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

export const authContext = createContext(); // Corregido el nombre a authContext

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.log('Error'); // Corregido el mensaje de error
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState("")
    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log("no hay usuario")
                setUser("")
            } else {
                setUser(currentUser)
            }
        })
        return () => subscribe()
    }, [])

    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response)
    }
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response)
    }
    const loginWithGoogle = async () => {
        const resposeGoogle = new GoogleAuthProvider()
        return signInWithPopup(auth, resposeGoogle)
    }
    const logout = async () => {
        try {
            const response = await signOut(auth);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return <authContext.Provider value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user
    }}
    >{children}</authContext.Provider>;
}
