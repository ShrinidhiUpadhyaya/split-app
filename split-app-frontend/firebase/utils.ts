import { auth } from "./config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

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

export { createUserWithEmail, signInWithGoogle };
