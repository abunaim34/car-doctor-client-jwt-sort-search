import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios"

export const AuthCotext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email: userEmail}
            setUser(currentUser)
            setLoading(false)

            // if user existis the issue a token
            if(currentUser){
                axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }
            else{
                axios.post('http://localhost:5000/login', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }
        })
        return () => unSubscribe()
    }, [])

    const authInfo = {logOut, createUser, user, loading, signIn }
    return (
        <AuthCotext.Provider value={authInfo}>
            {children}
        </AuthCotext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;