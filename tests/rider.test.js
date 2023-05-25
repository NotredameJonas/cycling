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

describe("GET /api/rider", () => {
  it("should return all riders", async () => {
    const res = await request(app).get("/api/rider");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/rider/:id", () => {
  it("should return a race", async () => {
    const res = await request(app).get(
      "/api/rider/646cae10fce3fbe0dbebe45d"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Thomas");
  });
});

describe("POST /api/rider", () => {
  it("should create a rider", async () => {
    const res = await request(app)
      .post("/api/rider")
      .set("x-auth-token", authToken)
      .send({
        name:"Thomas",
        wins:69,
        teamId:"646cede6c329c260611cdb59",
        raceId:"646baddd5636de10cc231878"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Thomas");
  });
});

describe("PUT /api/rider/:id", () => {
  it("should update a rider", async () => {
    const res = await request(app)
      .put("/api/rider/646cae10fce3fbe0dbebe45d")
      .set("x-auth-token", authToken)
      .send({
        name:"Thomas",
        wins:69,
        teamId:"646cede6c329c260611cdb59",
        raceId:"646baddd5636de10cc231878"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Thomas");
  });
});

describe("DELETE /api/rider/:id", () => {
  it("should delete a rider", async () => {
    const res = await request(app)
      .delete("/api/rider/646cfcdeade52bdde0f62b97")
      .set("x-auth-token", deleteToken);
    expect(res.statusCode).toBe(200);
  });
});
