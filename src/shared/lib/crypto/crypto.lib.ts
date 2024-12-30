// Crypto를 사용해 암호화를 수행한다.
import * as CryptoJS from "crypto-js";

const key = import.meta.env.VITE_AES_PBSZ_USER_KEY; // 암호화 키
const iv = import.meta.env.VITE_AES_PBSZ_IV; // 초기화 벡터

export const encryptData = (data: string): string => {
  const cipher = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
};

export const decryptData = (encryptedData: string): string => {
  const cipher = CryptoJS.AES.decrypt(encryptedData, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString(CryptoJS.enc.Utf8);
};
