import * as testConfig from "./config/config";
import * as chai from "chai";
import * as request from "supertest";

const assert = chai.assert;

describe("Testing Service Health", async () => {
	let tweetApiApp:any;

	before(() => {
		tweetApiApp = require("../index");
	});

	after(() => {
		testConfig.default.cleanup();
	});

	it("Should be Healthy", (done) => {
		request(tweetApiApp.tweetApi).get("/checkApiHealth").expect(200).end((err, res) => {
			if (err) {
				throw err;
			} else {
				assert.equal(res.text, "Healthy");
			}
			done();
		});
	});
});
