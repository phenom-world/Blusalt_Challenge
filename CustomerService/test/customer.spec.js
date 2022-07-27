const chai = require("chai");
const { assert } = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

require("dotenv").config();

chai.use(chaiHttp);

describe("customer service methods", () => {
  it("depositfunds", async () => {
    chai
      .request(app)
      .post("/depositfunds")
      .send({
        customerId: "62dffedb2c770a8877233add",
        amount: 30,
      })
      .end((error, response) => {
        assert.ifError(error);
        assert.equal(response.status, 200);
        assert.typeOf(response.body, "object");
        assert.property(response.body, "message");
        assert.equal(response.body.message, "Fund deposited succesfully.");
        assert.property(response.body, "data");
        assert.typeOf(response.body.data, "object");
      });
  });
});
