import * as functions from "firebase-functions";
import * as Twitter from "twitter";

export interface TweetStatus {
	status:boolean,
	message:string
}

export const tweet=async (tweet:string):Promise<TweetStatus> => {
	const twitterConfig:Twitter.AccessTokenOptions={
		consumer_key: functions.config().twitter.consumerkey,
		consumer_secret: functions.config().twitter.consumersecret,
		access_token_key: functions.config().twitter.accesstoken,
		access_token_secret: functions.config().twitter.accesstokensecret,
	};
	const client:Twitter = new Twitter(twitterConfig);

	let tweetStatus:TweetStatus;

	try {
		const message=await client.post("statuses/update", {status: tweet});
		tweetStatus={status: true, message: message.toString()};
	} catch (error) {
		tweetStatus={status: false, message: error.message};
	}

	return tweetStatus;
};
