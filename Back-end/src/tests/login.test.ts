import request from "supertest";
import app from "../app"; // Caminho para o seu app
import UserModel from "../models/UserModel";

// Mock do modelo UserModel
jest.mock("../models/UserModel", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const UserModelMock = dbMock.define("User", {});
  UserModelMock.hasMany = jest.fn();
  UserModelMock.findOne = jest.fn(); // Mock do método findOne
  return UserModelMock;
});

// Mock do modelo BookModel
jest.mock("../models/BookModel", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const BookMock = dbMock.define("Book", {});
  BookMock.belongsToMany = jest.fn(); // Mock do método belongsToMany
  return BookMock;
});

// Mock do modelo AssessmentModel
jest.mock("../models/AssessmentModel", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const AssessmentModelMock = dbMock.define("Assessment", {});
  AssessmentModelMock.belongsTo = jest.fn();
  return AssessmentModelMock;
});

// Mock do modelo CategoriesModel
jest.mock("../models/CategoriesModel", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const CategoriesMock = dbMock.define("Categories", {});
  CategoriesMock.belongsToMany = jest.fn();
  return CategoriesMock;
});

// Mock do modelo AuthorsModel
jest.mock("../models/AuthorsModel", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const AuthorsMock = dbMock.define("Authors", {});
  AuthorsMock.belongsToMany = jest.fn(); // Mock do método belongsToMany
  return AuthorsMock;
});

// Testes de login
describe("Login User", () => {
  it("should return 400 if email or password is missing", async () => {
    const res = await request(app).post("/login").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email and password are required");
  });

  it("should return 404 if user is not found", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null); // Mocka o retorno de findOne
    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "123456" });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("should return 400 if password is invalid", async () => {
    const mockUser = { validatePassword: jest.fn().mockResolvedValue(false) };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "wrongpass" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email or password are invalid");
  });

  it("should return 200 and a token if login is successful", async () => {
    const mockUser = { validatePassword: jest.fn().mockResolvedValue(true) };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "correctpass" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body.token).toBeDefined(); // Verifica se o token foi gerado
    console.log(res.body.token);
  });
});
