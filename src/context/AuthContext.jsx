import { createContext, useContext, useEffect, useState } from "react";
import {
  getInfoUserAPI,
  getProfileAPI,
  refreshTokenAPI,
} from "../services/api.services";
import { readTokensFromUrl } from "../services/readTokensFromUrl";
import { useNavigate } from "react-router-dom";

const context = createContext();

export const AuthContext = ({ children }) => {
  const [infoUser, setInfoUser] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);

  const refresTtoken = async () => {
    const refreshTokenStr = localStorage.getItem("refresh_token");
    if (!refreshTokenStr) {
      setIsLogined(false);
      setInfoUser(null);
      setToken(null);
      setUserID(null);
      return false;
    }

    try {
      const res = await refreshTokenAPI(refreshTokenStr);
      if (!res?.access_token) {
        throw new Error("No access token in response");
      }

      // Lưu token mới
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);

      // Lấy userID từ token mới
      const uid = getSupabaseUid(res.access_token);
      if (!uid) {
        throw new Error("Invalid token format");
      }

      // Set state với thông tin mới
      setToken(res.access_token);
      setUserID(uid);

      // Thử lấy thông tin user với token mới
      const userInfo = await getProfileAPI(uid);
      if (userInfo) {
        setInfoUser(userInfo);
        setIsLogined(true);
        return true;
      } else {
        throw new Error("Could not get user info");
      }
    } catch (error) {
      console.log("Refresh token failed:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setToken(null);
      setUserID(null);
      setInfoUser(null);
      setIsLogined(false);
      return false;
    } finally {
      setIsloading(false);
    }
  };

  const getUserInfo = async () => {
    if (!userID) {
      setIsLogined(false);
      setIsloading(false);
      return;
    }

    try {
      const res = await getProfileAPI(userID);
      if (res) {
        setInfoUser(res);
        setIsLogined(true);
      } else {
        // Nếu không lấy được thông tin user, thử refresh token
        const refreshSuccess = await refresTtoken();
        if (!refreshSuccess) {
          setIsLogined(false);
        }
      }
    } catch (error) {
      console.log("Error getting user info:", error);
      const refreshSuccess = await refresTtoken();
      if (!refreshSuccess) {
        setIsLogined(false);
      }
    } finally {
      setIsloading(false);
    }
  };

  const getSupabaseUid = (tokenStr) => {
    if (!tokenStr) return null;
    try {
      const payload = JSON.parse(atob(tokenStr.split(".")[1]));
      return payload.sub;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // Check URL tokens
      const urlTokens = readTokensFromUrl();
      if (urlTokens?.access_token) {
        localStorage.setItem("access_token", urlTokens.access_token);
        if (urlTokens.refresh_token) {
          localStorage.setItem("refresh_token", urlTokens.refresh_token);
        }
      }

      // Get stored token
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setIsLogined(false);
        setIsloading(false);
        return;
      }

      // Set token and extract userID
      setToken(accessToken);
      const uid = getSupabaseUid(accessToken);
      if (uid) {
        setUserID(uid);
        // Get user info immediately
        try {
          const userInfo = await getProfileAPI(uid);
          if (userInfo) {
            setInfoUser(userInfo);
            setIsLogined(true);
          }
        } catch (error) {
          console.log("Error getting user info:", error);
        }
      }
      setIsloading(false);
    };

    initAuth();
  }, []);

  const value = {
    userID,
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

export const useAuthContex = () => {
  const authContext = useContext(context);
  if (!authContext) {
    console.log("error in AuthContext");
  }
  return authContext;
};
