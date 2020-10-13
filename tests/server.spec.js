const request = require("supertest");
const testServer = require("./test-server");
const {
  findBy,
  findById,
  add
} = require("../auth/auth-model");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("server.js", () => {
  describe("register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should register new user", async () => {
      const testUser = {
        username: "sam",
        password: "password",
      };

      const newUser = await add(testUser);

      expect(newUser.username).toBe("sam");
    });

    it("should throw err if no username or password is provided", async () => {
      const invalidUser = {
        username: "F",
      };

      const fail = await add(invalidUser);

      expect(fail).toThrow();
    });
  });

  describe("jokes", () => {
    it("get request without token returns 401 unauthorized", async () => {
      const jokes = await request(server).get("/api/jokes");

      expect(jokes.status).toEqual(401);
    });
  });
});