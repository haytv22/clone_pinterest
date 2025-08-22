import { createContext, useContext, useEffect, useState } from "react";
import { getInfoUserAPI } from "../services/api.services";

const context = createContext();

export const AuthContext = ({ children }) => {
  const [infoUser, setInfoUser] = useState({});

  const value = {
    infoUser,
    setInfoUser,
  };

  const getUserInfo = async () => {
    try {
      const res = await getInfoUserAPI();
      console.log(res);

      if (res) {
        setInfoUser(res.user_metadata);
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setInfoUser(null);
      console.log("token đã hết hạng nên xóa rồi :)");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getUserInfo();
    }
  }, []);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const UseAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    console.log("error in AuthContext");
  }
  return authContext;
};
