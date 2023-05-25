const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
require("dotenv").config();

/* Set the authentication token for tests */
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZjOWZmMTQ3NjY1MDRiNmRiNDEwNmUiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg0ODQyNzg5fQ.WwWT08i7KJ3HxERoumBgpoNGEzC506_z2TZA0GMMPJM";
const deleteToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZiOTkzOGUzZGM5ODM3YjQ4NjQwODkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ4NjA1NjB9.tmTpgMAOBtvyF5wXNEWKkVnliToxySxJf83UAtMuiiE";

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api/users/me", () => {
    it("should return a who i am", async () => {
      const res = await request(app)
      .get("/api/users/me")
      .set("x-auth-token", authToken);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("bigboy");
    });
  });

  
describe("POST /api/users", () => {
    it("should create a user", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
            name: "lucas",
            email: "lucas@gmail.com",
            password: "12345"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("lucas");
    });
  });