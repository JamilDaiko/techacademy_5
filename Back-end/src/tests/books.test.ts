import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import UserModel from "../models/UserModel";
import AuthorModel from "../models/AuthorsModel";
import CategoriesModel from "../models/CategoriesModel";
import { generateToken } from "../utils/jwt";

let token: string;
let authorId: number;
let categoryId: number;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const user = await UserModel.create({
    name: "Jamil Teste",
    email: "jamil@teste.com",
    password: "J234568@",
    cpf: "12345678901",
  });

  token = generateToken(user);

  const author = await AuthorModel.create({ name: "Autor Teste" });
  authorId = author.id;

  const category = await CategoriesModel.create({ name: "Categoria Teste" });
  categoryId = category.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Testes de Books", () => {
  it("Deve bloquear acesso sem token", async () => {
    const res = await request(app).get("/books");
    expect(res.status).toBe(401);
  });

  it("Deve listar os livros com token válido", async () => {
    const res = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("Deve criar um livro com token válido", async () => {
    const res = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Livro Teste",
        description: "Descrição Teste",
        date_published: "2024-01-01",
        authorIds: [authorId], // agora tem author
        categoryIds: [categoryId], // agora tem category
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
