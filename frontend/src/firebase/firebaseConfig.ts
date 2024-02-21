import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAwS7K8wIqt54MUjWJruaJlhPxAo0MyRM",
  authDomain: "orderllm.firebaseapp.com",
  projectId: "orderllm",
  storageBucket: "orderllm.appspot.com",
  messagingSenderId: "605484571898",
  appId: "1:605484571898:web:5d32e66bbebf9f94573d43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;