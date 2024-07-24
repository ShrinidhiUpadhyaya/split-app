import { setCookie, deleteCookie, hasCookie } from "cookies-next";

const addAuthCookie = (value: string) => {
  setCookie("user-id", value);
};

const deleteAuthCookie = () => {
  deleteCookie("user-id");
};

const hasAuthCookie = (): boolean => {
  return hasCookie("user-id");
};

export { addAuthCookie, deleteAuthCookie, hasAuthCookie };
