import { encrypt, decrypt } from "./decrypt_helper";

describe("encryptDecrypt", () => {
  test("should return the same value as was encrypted", () => {
    const sampleText = "Hello World";
    const encrypted = encrypt(sampleText);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toEqual(sampleText);
  });
});
