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

export const uploaImgAPI = async (path, file, fileName) => {
  const url = `storage/v1/object/${path}/${fileName}`;

  return axiosInstance.post(url, file, {
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      apikey: import.meta.env.VITE_API_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });
};

export const insertPinAPI = (pinData) => {
  const url = "/rest/v1/pins";
  return axiosInstance.post(url, pinData, {
    headers: {
      Prefer: "return=representation", // trả về row vừa insert
    },
  });
};

export const logOutAPI = () => {
  const url = "/auth/v1/logout";
  return axiosInstance.post(url);
};

export const getPinsAPI = (from, to) => {
  const url = `/rest/v1/pins?select=*&order=created_at.desc`;
  return axiosInstance.get(url, {
    headers: { Range: `${from}-${to}` },
  });
};

export const getPinByIdAPI = (id)=>{
  const url = `/rest/v1/pins?id=eq.${id}&select=*`;
  return axiosInstance.get(url)
}