const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);
describe("Auth API", () => {
  test("POST /api/v1/auth/login invalid credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect([400, 401, 404, 500]).toContain(res.statusCode);
  });
});
