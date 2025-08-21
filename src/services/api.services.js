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
