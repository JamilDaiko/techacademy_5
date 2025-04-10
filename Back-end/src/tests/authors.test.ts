import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

let token: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const user = await UserModel.create({
    name: "Jamil Teste",
    email: "jamil@teste.com",
    password: "J234568@",
    cpf: "12345678901",
  });

  token = generateToken(user);
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testes de Authors", () => {
  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/author");
    expect(res.status).toBe(401);
  });

  it("Deve listar os autores com token válido", async () => {
    const res = await request(app)
      .get("/author")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve criar um autor com token válido", async () => {
    const res = await request(app)
      .post("/author")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Autor Teste",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
