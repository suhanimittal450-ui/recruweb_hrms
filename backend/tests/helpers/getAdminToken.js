const request = require("supertest");
const app = require("../../app");

module.exports = async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    email: "admin@hrms.com",
    password: "Admin@123",
  });

  return res.body.data.accessToken;
};
const getAdminToken = require("../helpers/getAdminToken");

beforeAll(async () => {
  token = await getAdminToken();
});
module.exports = getAdminToken;
