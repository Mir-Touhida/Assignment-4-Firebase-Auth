import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/Firebase.init";

export const AuthContext= createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser]= useState([]);
    const [loading, setLoading] = useState(true);

    const createUser =(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email, password);
    };
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const githubSignIn = (provider)=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const logOut = () => {  
        setLoading(true); 
        return signOut(auth);
    };
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return() =>{
            unSubscribe();
        }
    }, [])
    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        githubSignIn,
        logOut,
        
    };
    return (<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>);
       
        
    
};

export default AuthProvider;