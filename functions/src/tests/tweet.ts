import * as chai from "chai";
import * as testConfig from "./config/config";

const assert = chai.assert;

describe("Testing Service Tweet", () => {
	let tweetService:any;

	before(() => {
		tweetService = require("../services/tweet");
	});

	after(() => {
		testConfig.default.cleanup();
	});

	it("Should Tweet", async () => {
		const response=await tweetService.tweet("This is a test tweet");
		assert.isTrue(response["status"]);
	});
});
