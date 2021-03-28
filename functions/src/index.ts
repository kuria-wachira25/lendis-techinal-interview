import * as functions from "firebase-functions";
import * as express from "express";
import * as routes from "./routes/index";

const app = express();

routes.setApplicationRoutes(app);

export const tweetApi = functions.https.onRequest(app);
