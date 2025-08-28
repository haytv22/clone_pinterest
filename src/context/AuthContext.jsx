import { createContext, useContext, useEffect, useState } from "react";
import { getInfoUserAPI, refreshTokenAPI } from "../services/api.services";
import { readTokensFromUrl } from "../services/readTokensFromUrl";

const context = createContext();

export const AuthContext = ({ children }) => {
  const [infoUser, setInfoUser] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const getUserInfo = async () => {
    const refresTtoken = async () => {
      const refresTtoken = localStorage.getItem("refresh_token");
      try {
        const res = await refreshTokenAPI(refresTtoken);

        if (res) {
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          await getUserInfo();
        }
      } catch (error) {
        console.log("refreshToken error:", error);
        setIsLogined(false);
        setInfoUser(null);
      }
    };
    try {
      const res = await getInfoUserAPI();

      if (res.user_metadata) {
        setInfoUser(res.user_metadata);

        setIsLogined(true);
        setIsloading(false);
      }
    } catch (error) {
      if (error.code === 403) {
        refresTtoken();
      }
    }
  };

  const validateEmail = (value) => {
    // regex cơ bản check email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  useEffect(() => {
    const checkAndGetUserInfo = async () => {
      const tok = readTokensFromUrl();

      if (tok?.access_token) {
        localStorage.setItem("access_token", tok.access_token);
        if (tok.refresh_token) {
          localStorage.setItem("refresh_token", tok.refresh_token);
        }
      }

      const token = localStorage.getItem("access_token");
      if (token) {
        await getUserInfo();
      } else {
        setIsloading(false);
      }
    };
    checkAndGetUserInfo();
  }, []);

  const value = {
    infoUser,
    setInfoUser,
    isLogined,
    isLoading,
    setIsLogined,
    getUserInfo,
    validateEmail,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const UseAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    console.log("error in AuthContext");
  }
  return authContext;
};
