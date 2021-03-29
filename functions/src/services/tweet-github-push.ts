import * as functions from "firebase-functions";
import * as verify from "verify-github-webhook-secret";
import * as Twitter from "twitter";
import * as dateformat from "dateformat";

export default async (req:any, res:any) => {
	try {
		if (req.headers["x-hub-signature"]) {
			if (req.headers["x-hub-signature"].includes("sha1=")) {
				const payload:string=JSON.stringify(req.body);

				const webpushsecret:string=functions.config().github.webpushsecret;

				const hashRecieved:string=req.headers["x-hub-signature"];

				if (await verify.verifySecret(payload, webpushsecret, hashRecieved)) {
					if (req.headers["x-github-event"] === "push") {
						let tweet:string="";

						req.body.commits.forEach((element:any) => {
							tweet+="Commit Branch: "+req.body["ref"].split("refs/heads/")[1]+"\n";
							tweet+="Commit ID: "+element["id"]+"\n";
							tweet+="Commited By: "+element["committer"]["name"]+"\n";
							tweet+="Commit Message: "+element["message"]+"\n";
							tweet+="Commit Date Time: "+dateformat(new Date(element["timestamp"]), "dddd, mmmm dS, yyyy, h:MM:ss TT")+"\n\n";
							tweet+="\n\nTo View more details of the commit please visit \n\n"+element["url"]+"\n";
						});

						const twitterConfig:Twitter.AccessTokenOptions={
							consumer_key: functions.config().twitter.consumerkey,
							consumer_secret: functions.config().twitter.consumersecret,
							access_token_key: functions.config().twitter.accesstoken,
							access_token_secret: functions.config().twitter.accesstokensecret,
						};

						const client:Twitter = new Twitter(twitterConfig);

						try {
							const tweetResponse=await client.post("statuses/update", {status: tweet});
							res.status(200).json({status: "Processed Webhook Successfully", content: {tweetResponse: tweetResponse}});
						} catch (error) {
							res.status(500).json({status: "Unable To Tweet Commit", content: {error: error.message}});
						}
					} else {
						res.status(404).json({status: "Invalid Webhook", content: {reason: "Invalid x-github-event Event"}});
					}
				} else {
					res.status(401).json({status: "Invalid Webhook", content: {reason: "Invalid x-hub-signature Signature"}});
				}
			} else {
				res.status(404).json({status: "Invalid Webhook", content: {reason: "Malformed x-hub-signature header"}});
			}
		} else {
			res.status(404).json({status: "Invalid Webhook", content: {reason: "Missing x-hub-signature header"}});
		}
	} catch (error) {
		res.status(500).json({status: "Unable To Process Request", content: {error: error.message}});
	}
};
