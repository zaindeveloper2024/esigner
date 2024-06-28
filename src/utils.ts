export const toPublicKeyHex = (publicKey: Uint8Array): string => {
  const publicKeyHex = Array.from(publicKey)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return publicKeyHex;
};
