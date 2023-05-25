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

describe("GET /api/race", () => {
  it("should return all races", async () => {
    const res = await request(app).get("/api/race");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/race/:id", () => {
  it("should return a race", async () => {
    const res = await request(app).get(
      "/api/race/646bade75636de10cc23187c"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Giro");
  });
});

describe("POST /api/race", () => {
  it("should create a race", async () => {
    const res = await request(app)
      .post("/api/race")
      .set("x-auth-token", authToken)
      .send({
        name: "TourdeFrance",
        raceType: "Flat"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("TourdeFrance");
  });
});

describe("PUT /api/race/:id", () => {
  it("should update a race", async () => {
    const res = await request(app)
      .put("/api/race/646baddd5636de10cc231878")
      .set("x-auth-token", authToken)
      .send({
        name: "NewRace",
        raceType: "Flat"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("NewRace");
  });
});

describe("DELETE /api/race/:id", () => {
  it("should delete a race", async () => {
    const res = await request(app)
      .delete("/api/race/646caad1991665a15446845a")
      .set("x-auth-token", deleteToken);
    expect(res.statusCode).toBe(200);
  });
});