const request = require("supertest");
const app = require("../../app");
const getAdminToken = require("../helpers/getAdminToken");
jest.setTimeout(20000);
describe("Employee Protected APIs", () => {
  let token;

  beforeAll(async () => {
    token = await getAdminToken();
  });

  test("GET Employees With JWT", async () => {
    const res = await request(app)
      .get("/api/v1/employees")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
