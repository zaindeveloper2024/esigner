import { randomBytes } from "node:crypto";
import secp256k1 from "secp256k1";
import { publicKeyToAddress, toPublicKeyHex } from "./utils.js";

export const createRandomWallet = () => {
  let privateKey: Buffer;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));
  const publicKeyBytes = secp256k1.publicKeyCreate(privateKey);
  const publicKeyHex = toPublicKeyHex(publicKeyBytes);
  const address = publicKeyToAddress(publicKeyHex);
  return {
    privateKey: privateKey.toString("hex"),
    publicKey: publicKeyHex,
    address,
  };
};

export const createWalletFromPrivateKey = (privateKey: string) => {
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  const publicKeyBytes = secp256k1.publicKeyCreate(privateKeyBuffer);
  const publicKeyHex = toPublicKeyHex(publicKeyBytes);
  const address = publicKeyToAddress(publicKeyBytes);
  return {
    privateKey,
    publicKey: publicKeyHex,
    address,
  };
};
