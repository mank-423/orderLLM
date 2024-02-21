import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/auth';

const Login: React.FC = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);

            if (user) {
                getIdToken(user)
                    .then((token) => {
                        setIdToken(token);
                    })
                    .catch((error) => {
                        console.error('Error getting ID token:', error.message);
                    });
            } else {
                setIdToken(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Navigate to /order after successful login
            navigate('/order');
        }catch (error: unknown) {
            const errorMessage = (error as Error).message;
            console.error('Error signing in with Google:', errorMessage);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        }catch (error: unknown) {
            // Use type assertion to cast 'error' to 'Error' type
            const errorMessage = (error as Error).message;
            console.error('Error signing in with Google:', errorMessage);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    <p>ID Token: {idToken}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <button className="google-button" onClick={handleGoogle}>
                    Sign In with Google
                </button>
            )}
        </div>
    );
};

export default Login;
