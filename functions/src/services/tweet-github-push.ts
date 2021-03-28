import * as functions from "firebase-functions";
import * as jsSha256 from "js-sha256";

export default async (req:any, res:any) => {
	try {
		if (req.headers["x-hub-signature-256"]) {
			if (req.headers["x-hub-signature-256"].includes("sha256=")) {
				const signature:string=req.headers["x-hub-signature-256"].toString();
				const hashRecieved:string=signature.split("sha256=")[1];
				const webPushSecret:string=functions.config().github.webPushSecret;
				const computedHash:string=jsSha256.sha256.hmac(webPushSecret, req.body);
				if (hashRecieved !== computedHash) {
					res.status(200).json({status: "Webhook Processed Successfully", content: {tweeted: false}});
				} else {
					res.status(401).json({status: "Invalid Webhook", content: {reason: "Invalid x-hub-signature-256 header"}});
				}
			} else {
				res.status(401).json({status: "Invalid Webhook", content: {reason: "Malformed x-hub-signature-256 header"}});
			}
		} else {
			res.status(401).json({status: "Invalid Webhook", content: {reason: "Missing x-hub-signature-256 header"}});
		}
	} catch (error) {
		res.status(500).json({status: "Unable To Process Request", content: {error: error.message}});
	}
};
