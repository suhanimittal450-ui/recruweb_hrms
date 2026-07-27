const request = require("supertest");
const app = require("../app");

describe("Health API", () => {
  test("GET / should return success", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
