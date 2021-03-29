import * as request from "supertest";
import * as testConfig from "./config/config";

describe("Testing Service Github Webhook", async () => {
	let tweetApiApp:any;

	before(() => {
		tweetApiApp = require("../index");
	});

	after(() => {
		testConfig.default.cleanup();
	});

	it("Should Fail To Process Github Webhook", (done) => {
		request(tweetApiApp.tweetApi).post("/githubWebhook").expect(404).end((err, res) => {
			if (err) {
				throw err;
			}
			done();
		});
	});
});
