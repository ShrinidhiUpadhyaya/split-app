import { useEffect } from "react";
import { useAuthStore } from "@/store/zustand";
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
}: CreateUserWithEmailProps): Promise<Object> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken();

  return idToken;
};

const signInWithGoogle = async (): Promise<Object> => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  return idToken;
};

const useGetUser = () => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const authState = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => authState();
  }, [setUser]);

  return user;
};

// const onAuthStateChanged = auth.onAuthStateChanged;

export { createUserWithEmail, signInWithGoogle, useGetUser };
