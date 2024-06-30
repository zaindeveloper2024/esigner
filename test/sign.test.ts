import { describe, expect, it } from "vitest";
import { recoverAddress, signMessage } from "../src";

const privateKey =
  "9fd3a423ec9a07ae3e7da3ff22716cb527b368150fe4ec62be662785329a48fe";
const message = "Hello World!";
const expectedAddress = "0xe488edeb5f93163c15259b5229616e223feb41ff";

describe("signatureUtils", () => {
  describe("signMessage", () => {
    it("should sign a message with the given private key", () => {
      const signature = signMessage({ message, privateKey });
      expect(signature.slice(0, 2)).to.equal("0x");
      const address = recoverAddress({ message, signature });
      expect(address).to.equal(expectedAddress);
    });
  });
});
