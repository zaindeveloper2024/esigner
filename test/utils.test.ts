import { describe, expect, it } from "vitest";
import { add0x, hexToUint8Array, remove0x } from "../src";

describe("remove0x", () => {
  it("should remove 0x prefix from hex string", () => {
    expect(remove0x("0x123")).toBe("123");
    expect(remove0x("0xabcdef")).toBe("abcdef");
    expect(remove0x("0x")).toBe("");
  });

  it("should not change hex string without 0x prefix", () => {
    expect(remove0x("123")).toBe("123");
    expect(remove0x("abcdef")).toBe("abcdef");
  });
});

describe("add0x", () => {
  it("should add 0x prefix to hex string without prefix", () => {
    expect(add0x("123")).toBe("0x123");
    expect(add0x("abcdef")).toBe("0xabcdef");
  });

  it("should not change hex string with 0x prefix", () => {
    expect(add0x("0x123")).toBe("0x123");
    expect(add0x("0xabcdef")).toBe("0xabcdef");
  });
});

describe("hexToUint8Array", () => {
  it("should convert a hex string with 0x prefix to Uint8Array", () => {
    const hexString = "0x1a2b3c";
    const expected = new Uint8Array([26, 43, 60]);
    const result = hexToUint8Array(hexString);
    expect(result).to.deep.equal(expected);
  });

  it("should convert a hex string without 0x prefix to Uint8Array", () => {
    const hexString = "1a2b3c";
    const expected = new Uint8Array([26, 43, 60]);
    const result = hexToUint8Array(hexString);
    expect(result).to.deep.equal(expected);
  });
});
