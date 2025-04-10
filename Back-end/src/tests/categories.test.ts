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

describe("Testes de Categories", () => {
  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/categories");
    expect(res.status).toBe(401);
  });

  it("Deve listar as categorias com token válido", async () => {
    const res = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve criar uma categoria com token válido", async () => {
    const res = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Categoria Teste",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
