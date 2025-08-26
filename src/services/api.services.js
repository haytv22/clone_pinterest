import axiosInstance from "./axiot.custom";

export const signupAPI = (email, password) => {
  const urlBackend = "/auth/v1/signup";
  const value = {
    email: email,
    password: password,
  };
  return axiosInstance.post(urlBackend, value);
};

export const loginAPI = (email, password) => {
  const urlBackend = "/auth/v1/token?grant_type=password";
  const value = {
    email: email,
    password: password,
  };
  return axiosInstance.post(urlBackend, value);
};

export const getInfoUserAPI = () => {
  const urlBackend = "auth/v1/user";
  return axiosInstance.get(urlBackend);
};

export const refreshTokenAPI = (refresh_token) => {
  const urlBackend = "auth/v1/token?grant_type=refresh_token";
  const value = {
    refresh_token: refresh_token,
  };
  return axiosInstance.post(urlBackend, value);
};
