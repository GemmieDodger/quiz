import React from 'react';
import {
    useEffect,
    useState,
    useContext,
    createContext,
    FunctionComponent
} from 'react';
import firebase from './Firebase';
import { browserLocalPersistence, initializeAuth, onAuthStateChanged, getAuth} from 'firebase/auth';


const AuthContext = createContext({
    user: null,
    loading: true,
    logout: () => {}
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
            console.log('user', u);
            if (u) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = u.uid;
              console.log("User is signed in");
            } else {
              // User is signed out
              console.log("User is signed out");
            }
          });
        // const cancelAuthListener = firebase.auth().onIdTokenChanged(u => {
        //     setUser(u);
        //     setLoading(false);
        // });
        // return () => cancelAuthListener();
    }, [])

    return ( <AuthContext.Provider value = {
                { user,
                loading,
                logout: () => firebase.auth().signOut() }} > 
                {children} </AuthContext.Provider>
    );
};

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can 
    //provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ]
};

function useAuth() {
    return useContext(AuthContext);

};

export {
    AuthProvider,
    uiConfig,
    useAuth
};