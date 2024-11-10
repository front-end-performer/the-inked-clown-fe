// import * as joseJwt from "jose";
// import { nanoid } from "nanoid";
// import CryptoJS from "crypto-js";

// const key = process.env.CRYPTO_ENCRYPTION_KEY || "";
// const iv_key = process.env.CRYPTO_IV_KEY || "";

// export const signJwtToken = async (payload: any) => {
//   const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
//   const expiresIn = "5m";
//   const token = await new joseJwt.SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setJti(nanoid())
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(new TextEncoder().encode(privateKey));
//   return token;
// };

// export const verifyJwtToken = async (token: any) => {
//   try {
//     const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
//     const result = await joseJwt.jwtVerify(
//       token,
//       new TextEncoder().encode(privateKey)
//     );
//     return { data: result.payload, isError: false, message: "success" };
//   } catch (error: any) {
//     return { data: null, isError: true, message: error.message };
//   }
// };

// export const decodeJwtToken = (token: any) => {
//   try {
//     const payload = joseJwt.decodeJwt(token);
//     return { data: payload, isError: false, message: "success" };
//   } catch (error: any) {
//     return { data: null, isError: true, message: error.message };
//   }
// };

// export const encryptString = (str: any) => {
//   const secretKey = CryptoJS.enc.Utf8.parse(key);
//   const iv = CryptoJS.enc.Utf8.parse(iv_key);
//   const encrypted = CryptoJS.AES.encrypt(str, secretKey, { iv });
//   const hexString = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
//   return hexString;
// };

// export const decryptString = (hexString: any) => {
//   const secretKey = CryptoJS.enc.Utf8.parse(key);
//   const iv = CryptoJS.enc.Utf8.parse(iv_key);
//   const ciphertext = CryptoJS.enc.Hex.parse(hexString);
//   const decrypted = CryptoJS.AES.decrypt({ ciphertext }, secretKey, {
//     iv,
//   }).toString(CryptoJS.enc.Utf8);
//   console.log("decrypted: ", decrypted);
//   return JSON.parse(decrypted);
// };

export const checkUserRole = (role: string): { isAdminRole: boolean } => {
  return {
    isAdminRole: role === "admin",
  };
};

// export const formatDate = (date: any) => {
//   return new Intl.DateTimeFormat(undefined, {
//     dateStyle: "short",
//     timeStyle: "short",
//   }).format(new Date(date));
// };

// export const getErrorMessage = (error: any) => {
//   let message = error.message;
//   if (error?.response?.data) {
//     message = error.response.data;
//   }
//   return message;
// };
