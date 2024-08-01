import axios from "axios";
axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const login = async (uid: string) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      uid: uid,
    });
    return response.data;
  } catch (error) {
    console.log("Login Error", error);
  }

  return;
};

const signUp = async (token: string) => {
  console.log("Token signup", token);
  try {
    const response = await axios.post(`/api/auth/signup/`, {
      token: token,
    });
    return response.data;
  } catch (error) {
    console.log("SignUp Error", error);
  }

  return;
};

const logOut = async () => {
  try {
    return await axios.post(`/api/auth/logout`);
  } catch (error) {
    console.log("logout Error", error);
  }

  return;
};

export { login, signUp, logOut };
