import * as functions from "firebase-functions";
import * as verify from "verify-github-webhook-secret";
import * as dateformat from "dateformat";
import * as tweetService from "./tweet";
import * as express from "express";

export default async (req:express.Request, res:express.Response) => {
	if (!(req.headers["x-github-event"] === "push" && req.headers["x-hub-signature"] && req.headers["x-hub-signature"].includes("sha1=")) ) {
		res.status(404).json({status: "Invalid Webhook", content: {reason: "Invalid Paramaters Set"}});
		return;
	}
	try {
		const payload:string=JSON.stringify(req.body);

		const webpushsecret:string=functions.config().github.webpushsecret;

		const hashRecieved:string=req.headers["x-hub-signature"].toString();

		if (!await verify.verifySecret(payload, webpushsecret, hashRecieved)) {
			res.status(401).json({status: "Invalid Webhook", content: {reason: "Invalid x-hub-signature Signature"}});
			return;	
		}

		let tweet:string="";

		req.body.commits.forEach((element:any) => {
			tweet+="Branch:"+req.body["ref"].split("refs/heads/")[1]+"\n";
			tweet+="ID:"+element["id"]+"\n";
			tweet+="By:"+element["committer"]["name"]+"\n";
			tweet+="Message:"+element["message"]+"\n";
			tweet+="Timestamp:"+dateformat(new Date(element["timestamp"]), "dddd, mmmm dS, yyyy, h:MM:ss TT")+"\n";
		});

		const response:tweetService.TweetStatus=await tweetService.tweet(tweet);

		if (response["status"]) {
			res.status(200).json({status: "Processed Webhook", content: {tweetResponse: response["message"]}});
			return;
		}

		throw new Error("Unable To Tweet. Reason "+response["message"]);
	} catch (error) {
		res.status(500).json({status: "Unable To Process Request", content: {error: error.message}});
	}
};
