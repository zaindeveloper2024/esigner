import jsSha3 from "js-sha3";
import { randomBytes } from "node:crypto";
import secp256k1 from "secp256k1";
import { toPublicKeyHex } from "./utils.js";

export const createRandom = () => {
  let privateKey;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));
  const publicKey = secp256k1.publicKeyCreate(privateKey);
  const address = jsSha3.keccak256(publicKey).substring(24);
  return {
    privateKey: privateKey.toString("hex"),
    publicKey: toPublicKeyHex(publicKey),
    address,
  };
};
