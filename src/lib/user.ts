import { authAxios } from "@/configs/auth";

export const getAllUsers = async (accessToken: any) => {
  try {
    authAxios.accessToken = accessToken;
    const result = await authAxios.get("/users");
    console.log('all users', result);

    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
