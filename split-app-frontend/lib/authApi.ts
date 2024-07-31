import axios from "axios";
axios.defaults.withCredentials = true;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const login = async (token: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login/`, {
      token: token,
    });
    return response.data;
  } catch (error) {
    console.log("Login Error", error);
  }

  return;
};

const signUp = async (token: string) => {
  console.log("Signup");
  console.log(BACKEND_URL);
  console.log(token);
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/signup/`, {
      idToken: token,
    });
    return response.data;
  } catch (error) {
    console.log("SignUp Error", error);
  }

  return;
};

const logOut = async () => {
  try {
    return await axios.post(`${BACKEND_URL}/auth/logout`);
  } catch (error) {
    console.log("logout Error", error);
  }

  return;
};

export { login, signUp, logOut };
