import NodeRSA from "node-rsa";
import { PRIVATE_KEY, PUBLIC_KEY } from "./rsa_keys";

export const encrypt = (input: any) => {
  const encrypter = new NodeRSA(PUBLIC_KEY)
  const encrypted = encrypter.encrypt(input, "base64");
  return encrypted;
};

export const decrypt = (input: any) => {
  const decrypter = new NodeRSA(PRIVATE_KEY)
  const decrypted = decrypter.decrypt(input, "utf8");
  return decrypted;
};

export default {encrypt, decrypt};