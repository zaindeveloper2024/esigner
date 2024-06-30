import { describe, expect, it } from "vitest";
import { createRandomWallet, createWalletFromPrivateKey } from "../src";

describe("createRandom", () => {
  it("should create a valid wallet", () => {
    const wallet = createRandomWallet();
    expect(wallet.privateKey).toHaveLength(64);
    expect(wallet.publicKey).toHaveLength(66);
    expect(wallet.address).toHaveLength(42);
  });

  it("should create a unique wallet each time", () => {
    const wallet1 = createRandomWallet();
    const wallet2 = createRandomWallet();
    expect(wallet1).not.toEqual(wallet2);
  });

  it("should create a valid wallet from a private key", () => {
    const wallet1 = createRandomWallet();
    const wallet2 = createWalletFromPrivateKey(wallet1.privateKey);
    expect(wallet1).toEqual(wallet2);
  });
});
