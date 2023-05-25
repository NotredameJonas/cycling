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

describe("GET /api/team", () => {
  it("should return all teams", async () => {
    const res = await request(app).get("/api/team");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/team/:id", () => {
  it("should return a team", async () => {
    const res = await request(app).get(
      "/api/team/646cede6c329c260611cdb59"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Proteam");
  });
});

describe("POST /api/team", () => {
  it("should create a team", async () => {
    const res = await request(app)
      .post("/api/team")
      .set("x-auth-token", authToken)
      .send({
        name: "quickstep2",
        teamLeader: "Boss12",
        wins: 65
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("quickstep2");
  });
});

describe("PUT /api/team/:id", () => {
  it("should update a team", async () => {
    const res = await request(app)
      .put("/api/team/646cede6c329c260611cdb59")
      .set("x-auth-token", authToken)
      .send({
        name: "Proteam",
        teamLeader: "Boss12",
        wins: 65
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Proteam");
  });
});

describe("DELETE /api/team/:id", () => {
  it("should delete a team", async () => {
    const res = await request(app)
      .delete("/api/team/646ceebe71188dde4a9b4779")
      .set("x-auth-token", deleteToken);
    expect(res.statusCode).toBe(200);
  });
});