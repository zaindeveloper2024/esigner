import jsSha3 from "js-sha3";
import secp256k1 from "secp256k1";

export const toPublicKeyHex = (publicKey: Uint8Array): string => {
  const publicKeyHex = Array.from(publicKey)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return publicKeyHex;
};

export const publicKeyToAddress = (publicKey: Uint8Array | Buffer | string) => {
  let bufferPublicKey: Buffer | undefined;

  if (ArrayBuffer.isView(publicKey)) {
    bufferPublicKey = Buffer.from(publicKey);
  } else if (typeof publicKey === "string") {
    const publicKeyWithoutHex = publicKey.startsWith("0x")
      ? publicKey.slice(2)
      : publicKey;
    bufferPublicKey = Buffer.from(publicKeyWithoutHex, "hex");
  } else if (Buffer.isBuffer(publicKey)) {
    bufferPublicKey = publicKey;
  }
  if (!bufferPublicKey) {
    throw new Error("Expected a Buffer or a hexadecimal string as argument");
  }

  const uncompressedPublicKey = Buffer.from(
    secp256k1.publicKeyConvert(bufferPublicKey!, false)
  ).slice(1);
  const hashedPublicKey = jsSha3.keccak256(uncompressedPublicKey);
  const address = "0x" + hashedPublicKey.slice(-40);
  return address;
};

const hexPrefix = /^0[xX]/;

export const remove0x = (hex: string): string => {
  return hex.replace(hexPrefix, "");
};

export const add0x = (hex: string): string => {
  return hexPrefix.test(hex) ? hex : `0x${hex}`;
};

export const hexToUint8Array = (data: string): Uint8Array => {
  let hex = remove0x(data);
  hex = hex.length & 1 ? `0${hex}` : hex;
  return Buffer.from(hex, "hex");
};
