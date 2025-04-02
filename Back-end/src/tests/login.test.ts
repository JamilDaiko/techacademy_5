import request from "supertest";
import app from "../app"; // Adjust the path to your app file

describe("Login API", () => {
  it("should login successfully with valid email and password", async () => {
    const response = await request(app).post("/login").send({
      email: "beludo@gmail.com",
      password: "J234568@",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail login with invalid email", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should fail login with invalid password", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should fail login with missing email or password", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Email and password are required"
    );
  });
});
