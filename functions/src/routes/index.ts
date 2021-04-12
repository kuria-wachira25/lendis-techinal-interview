import * as services from "../services/index";
import * as express from "express";

export const setApplicationRoutes = (app:express.Application) => {
	app.get("/checkApiHealth", services.checkApiHealth);
	app.post("/githubWebhook", services.githubWebhook);
};
