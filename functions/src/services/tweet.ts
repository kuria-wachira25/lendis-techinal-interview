import * as functions from "firebase-functions";
import * as Twitter from "twitter";

export const tweet=async (tweet:string) => {
	const twitterConfig:Twitter.AccessTokenOptions={
		consumer_key: functions.config().twitter.consumerkey,
		consumer_secret: functions.config().twitter.consumersecret,
		access_token_key: functions.config().twitter.accesstoken,
		access_token_secret: functions.config().twitter.accesstokensecret,
	};
	const client:Twitter = new Twitter(twitterConfig);
	try {
		const message=await client.post("statuses/update", {status: tweet});
		return {status: true, message: message};
	} catch (error) {
		return {status: false, message: error.message};
	}
};
