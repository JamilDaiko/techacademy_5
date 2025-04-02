import request from "supertest";
import app from "../app"; // Certifique-se de apontar para o arquivo correto do seu servidor Express
import { validateEmail } from "../services/UserService"; // Importa a função validateEmail

describe("Email Validation API", () => {
  it("should return true for a valid email format", () => {
    expect(() => validateEmail("test@example.com")).not.toThrow();
    expect(() => validateEmail("user.name@domain.co.uk")).not.toThrow();
    expect(() => validateEmail("123456@domain.net")).not.toThrow();
  });

  it("should throw an error for an invalid email format", () => {
    expect(() => validateEmail("invalid-email")).toThrow("E-mail inválido");
    expect(() => validateEmail("@missingusername.com")).toThrow(
      "E-mail inválido"
    );
    expect(() => validateEmail("user@domain,com")).toThrow("E-mail inválido");
    expect(() => validateEmail("user@domain..com")).toThrow("E-mail inválido");
  });
});
