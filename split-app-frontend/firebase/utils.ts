import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

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

const useAuthStateUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authState = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => authState();
  }, [setUser]);

  return user;
};

export { createUserWithEmail, signInWithGoogle, useAuthStateUser };
