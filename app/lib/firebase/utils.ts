import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {auth} from "./config";

interface CreateUserWithEmailProps {
  email: string;
  password: string;
}

const provider = new GoogleAuthProvider();

const createUserWithEmail = async ({email, password}: CreateUserWithEmailProps) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = await result?.user;
    return user;
  } catch (error) {
    console.log("Firebase Manual Sign Up Error", error);
  }

  return;
};

const signInWithGoogle = async (): Promise<Object> => {
  const response = await signInWithPopup(auth, provider);

  return response;
};

const manualSignIn = async ({email, password}: CreateUserWithEmailProps) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return await response?.user;
  } catch (error) {
    console.log("Firebase Manual Sign In Error", error);
  }

  return;
};

const logOut = () => {
  signOut(auth);
};

export {createUserWithEmail, logOut, manualSignIn, signInWithGoogle};
