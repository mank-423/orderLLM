import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/auth';
import loginImage from '../../assets/svg/login.svg';
import GoogleLogo from '../../assets/svg/Google-icon.svg';
import logo from '../../assets/Images/logoCircle.png';

const Login = () => {
    // const [userDetails, setUserDetails] = useState<firebase.User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            let tokenSaved;
            if (user) {
                // setUserDetails(user);
                getIdToken(user).then((token) => {
                    setIdToken(token);
                    tokenSaved = token;
                })
                .catch((error) => {
                    console.error('Error getting ID token:', error.message);
                });


                const authUser = async (userIp: firebase.User) => {
                    try {
                        const response: any = await fetch(`http://localhost:8000/api/users/auth`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: userIp?.displayName,
                                email: userIp?.email,
                                userName: userIp?.displayName,
                                password: 'Damn hacker!'
                            })
                        });
                        const user = await response.json();
                        console.log(user);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
                authUser(user);
                const userObject = {
                    name: user?.displayName,
                    token: user?.uid,
                    email: user?.email
                };

                console.log("UserObject", userObject);
                

                localStorage.setItem('user', JSON.stringify(userObject));
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
            navigate('/order');
        } catch (error: unknown) {
            const errorMessage = (error as Error).message;
            console.error('Error signing in with Google:', errorMessage);
        }
    };

    return (
        <div className='bg-[#211f1f] min-h-screen flex items-center justify-center'>
            <div className='relative grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-b from-orange-400 to-orange-100 rounded-lg p-10 shadow-lg login-main mx-4 lg:mx-auto'>
                <img src={logo} className='absolute left-[150px] top-[-50px] h-[90px] block md:hidden lg:hidden w-[90px] rounded-full' alt="order LLM logo" />
                <div className='border border-white rounded-lg lg:order-2 lg:col-span-1'>
                    <img src={loginImage} className='h-80 w-80' alt="Login logo" />
                </div>

                <div className='flex flex-col items-center justify-center space-y-4 lg:col-span-1 lg:order-1'>
                    <img src={logo} className='h-[90px] w-[90px] hidden md:block lg:block rounded-full' alt="order LLM logo" />
                    <h1 className='font-bold text-2xl'>Order LLM</h1>
                    <button
                        className="bg-black text-white rounded-lg p-3 font-semibold flex items-center justify-center"
                        onClick={handleGoogle}
                    >
                        <img src={GoogleLogo} className='h-8 w-8' alt="Google logo" />
                        <span className='ml-2'>Login with Google</span>
                    </button>

                    <p className='text-center'>
                        <span>*You use google, right?</span><br />
                        P.s. Developer is lazy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
