const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  
describe("POST /api/auth", () => {
    it("log in", async () => {
      const res = await request(app)
        .post("/api/auth")
        .send({    
            email: "jon8@gmail.com",
            password: "12345"
        });
      expect(res.statusCode).toBe(200);
    });
  });