import { describe, expect, it } from "vitest";
import { createRandom } from "../src";

describe("createRandom", () => {
  it("should create a valid wallet", () => {
    const wallet = createRandom();
    expect(wallet.privateKey).toHaveLength(64);
    expect(wallet.publicKey).toHaveLength(66);
    expect(wallet.address).toHaveLength(40);
  });

  it("should create a unique wallet each time", () => {
    const wallet1 = createRandom();
    const wallet2 = createRandom();
    expect(wallet1).not.toEqual(wallet2);
  });
});
