const request = require("supertest");
const app = require("../../app");

describe("Employee API", () => {
  test("Should reject unauthenticated request", async () => {
    const res = await request(app).get("/api/v1/employees");

    expect(res.statusCode).toBe(401);
  });
});
