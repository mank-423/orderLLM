import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/auth';
import loginImage from '../../assets/svg/authentication.svg';
// import GoogleLogo from '../../assets/svg/Google-icon.svg';
import logo from '../../assets/Images/logoCircle.png';
import baseUrl from '../../baseUrl';

const Login = () => {
    // const [userDetails, setUserDetails] = useState<firebase.User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // let tokenSaved;
            if (user) {
                // setUserDetails(user);
                getIdToken(user).then((token) => {
                    setIdToken(token);
                    // tokenSaved = token;
                })
                    .catch((error) => {
                        console.error('Error getting ID token:', error.message);
                    });


                const authUser = async (userIp: firebase.User) => {
                    try {
                        const response: any = await fetch(`${baseUrl}/api/users/auth`, {
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
                console.log(idToken);
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
        <div>
            <div className='bg-gradient-to-br from-[#161616] via-[#3A3A3A] to-orange-300 min-h-screen flex items-center justify-center lg:pt-0 md:pt-0 pt-8'>
                <div>
                    <div className='relative grid grid-cols-1 lg:grid-cols-2 bg-[#1e1c1c] rounded-lg p-10 shadow-lg login-main mx-4 lg:mx-auto'>
                        <img src={logo} className='absolute left-[150px] top-[-50px] h-[90px] block md:hidden lg:hidden w-[90px] rounded-full border-2 border-black' alt="order LLM logo" />
                        <div className='bg-[#484848] rounded-lg lg:order-2 lg:col-span-1'>
                            <img src={loginImage} className='h-80 w-80' alt="Login logo" />
                        </div>

                        <div className='flex flex-col items-center justify-center space-y-4 lg:col-span-1 lg:order-1'>
                            <img src={logo} className='h-[90px] w-[90px] hidden md:block lg:block rounded-full border-2 border-orange-500 mt-2' alt="order LLM logo" />
                            <h1 className='font-bold text-2xl text-white'>Order LLM</h1>
                            <button
                                className="bg-orange-400 text-white rounded-lg p-3 font-semibold flex items-center justify-center"
                                onClick={handleGoogle}
                            >
                                {/* Google logo */}
                                <div className='h-8 w-8'>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="30" height="30">
                                        <defs>
                                            <path id="A" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                        </defs>
                                        <clipPath id="B"><use xlinkHref="#A" />
                                        </clipPath><g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                                            <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                                            <path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335" />
                                            <path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853" />
                                            <path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4" />
                                        </g>
                                    </svg>
                                </div>
                                <span className='ml-2'>Login with Google</span>
                            </button>

                            <p className='text-center text-white'>
                                <span>*You use google, right?</span><br />
                                P.S. Developer is lazy
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            className="bg-[#1e1c1c] text-white py-4 px-8 rounded-lg transition duration-300 hover:bg-[#F27B35]/80 focus:outline-none font-bold text-lg mt-4"
                            onClick={() => { navigate('/') }}
                        >
                            Go back?
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
