import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const authAxios: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// intercept the request
authAxios.interceptors.request.use(
  async (config: any) => {
    const accessToken = authAxios.accessToken;
    if (!accessToken)
      return Promise.reject(new Error("No access token provided"));
    config.headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
    };
    return config;
  },
  (error: any) => Promise.reject(new Error(error))
);

//  intercept the response

authAxios.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const result = await refreshAccessToken();
        authAxios.accessToken = result?.accessToken;
        return authAxios(originalRequest);
      } catch (err: any) {
        if (err?.response && err?.response?.data) {
          return Promise.reject(err?.response?.data);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const authNodeAxios: any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_NODE_URL,
  withCredentials: true,
});

// intercept the request
authNodeAxios.interceptors.request.use(
  async (config: any) => {
    const accessToken = authNodeAxios.accessToken;
    if (!accessToken)
      return Promise.reject(new Error("No access token provided"));
    config.headers = {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
    };
    return config;
  },
  (error: any) => Promise.reject(new Error(error))
);

//  intercept the response

authNodeAxios.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const result = await refreshAccessToken();
        authNodeAxios.accessToken = result?.accessToken;
        return authNodeAxios(originalRequest);
      } catch (err: any) {
        if (err?.response && err?.response?.data) {
          return Promise.reject(err?.response?.data);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axiosPublic.get("/auth/session");
    return response.data;
  } catch (error) {
    throw error;
  }
};
