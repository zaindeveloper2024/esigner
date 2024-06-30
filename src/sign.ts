import { secp256k1 } from "@noble/curves/secp256k1";
import jsSha3 from "js-sha3";
import {
  add0x,
  hexToUint8Array,
  publicKeyToAddress,
  remove0x,
} from "./utils.js";

type SignMessageParameters = {
  message: string;
  privateKey: string;
};

type RecoverAddressParameters = {
  message: string;
  signature: string;
};

export const signMessage = ({ message, privateKey }: SignMessageParameters) => {
  const hash = jsSha3.keccak256(message);
  const sig = secp256k1.sign(hash, hexToUint8Array(privateKey), undefined);
  const end = sig.recovery === 0 ? "1b" : "1c";
  return add0x(sig.toCompactHex() + end);
};

export const recoverAddress = ({
  message,
  signature,
}: RecoverAddressParameters): string => {
  signature = remove0x(signature);
  const start = signature.slice(0, -2);
  const end = signature.slice(-2);
  const sig = secp256k1.Signature.fromCompact(start).addRecoveryBit(
    end === "1b" ? 0 : 1
  );
  const hash = jsSha3.keccak256(message);
  const pub = sig.recoverPublicKey(hash).toHex();
  return publicKeyToAddress(pub);
};
