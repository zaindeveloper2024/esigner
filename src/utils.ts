import jsSha3 from "js-sha3";
import secp256k1 from "secp256k1";

export const toPublicKeyHex = (publicKey: Uint8Array): string => {
  const publicKeyHex = Array.from(publicKey)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return publicKeyHex;
};

export const publicKeyToAddress = (publicKey: Uint8Array | Buffer | string) => {
  if (ArrayBuffer.isView(publicKey)) {
    publicKey = Buffer.from(publicKey);
  }

  if (typeof publicKey === "string") {
    publicKey = publicKey.startsWith("0x") ? publicKey.slice(2) : publicKey;
    publicKey = Buffer.from(publicKey, "hex");
  }

  if (!Buffer.isBuffer(publicKey)) {
    throw new Error("Expected a Buffer or a hexadecimal string as argument");
  }
  publicKey = Buffer.from(secp256k1.publicKeyConvert(publicKey, false)).slice(
    1
  );
  const hash = jsSha3.keccak256(publicKey);
  // TODO: const toChecksumAddress
  return "0x" + hash.slice(-40);
};
