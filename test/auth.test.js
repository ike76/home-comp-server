const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const faker = require("faker");
const mongoose = require("mongoose");

const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");
const { User } = require("../models/user.model");

const createUser = () => {
  const user = { email: faker.internet.email(), password: "password" };
  return user;
};

const tearDownDB = () => {
  console.warn("deleting database");
  return mongoose.connection.dropDatabase();
};

describe("Sign UP", () => {
  before(() => {
    return runServer(TEST_DATABASE_URL);
  });
  after(() => {
    tearDownDB();
    closeServer();
  });

  let user = createUser();
  const agent = chai.request.agent(app);

  it("should sign up", () => {
    return agent
      .post("/auth/signup")
      .send(user)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("email");
      });
  });
});
