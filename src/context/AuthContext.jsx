import { createContext, useContext, useEffect, useState } from "react";
import { getInfoUserAPI } from "../services/api.services";
import { useNavigate } from "react-router-dom";
import { readTokensFromUrl } from "../services/readTokensFromUrl";

const context = createContext();

export const AuthContext = ({ children }) => {
  const [infoUser, setInfoUser] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const getUserInfo = async () => {
    try {
      const res = await getInfoUserAPI();

      if (res) {
        setInfoUser(res.user_metadata);
        setIsLogined(true);
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setInfoUser(null);
      console.log("token đã hết hạng nên xóa rồi :)");
    } finally {
      setIsloading(false);
    }
  };
  console.log(infoUser);

  useEffect(() => {
    const tok = readTokensFromUrl();

    if (tok?.access_token) {
      localStorage.setItem("access_token", tok.access_token);
      if (tok.refresh_token)
        localStorage.setItem("refresh_token", tok.refresh_token);
    }
    const token = localStorage.getItem("access_token");

    if (token && isLogined === false) {
      console.log("chay");

      getUserInfo();
    } else {
      setIsloading(false);
    }
  }, []);

  const value = {
    infoUser,
    setInfoUser,
    isLogined,
    isLoading,
    setIsLogined,
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
