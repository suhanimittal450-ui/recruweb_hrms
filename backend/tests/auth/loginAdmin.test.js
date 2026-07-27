const request = require("supertest");
const app = require("../../app");

jest.setTimeout(20000);

let token = "";

describe("Admin Login", () => {
  test("Login Admin", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "admin@hrms.com",
      password: "Admin@123",
    });

    if (res.body?.data?.accessToken) {
      token = res.body.data.accessToken;
    }

    expect(res.statusCode).toBe(200);
  });
});

module.exports = { token };
