import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useAppStore } from "@/store/zustand";
import { auth } from "./config";
import { addAuthCookie, deleteAuthCookie } from "@/utils/cookies";

interface CreateUserWithEmailProps {
  email: string;
  password: string;
}

const provider = new GoogleAuthProvider();

const createUserWithEmail = async ({
  email,
  password,
}: CreateUserWithEmailProps): Promise<string> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken();

  return idToken;
};

const signInWithGoogle = async (): Promise<string> => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  return idToken;
};

const manualSignIn = async ({ email, password }: CreateUserWithEmailProps) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return await response.user.getIdToken();
};

const logOut = () => {
  signOut(auth);
};

export { createUserWithEmail, signInWithGoogle, manualSignIn, logOut };
