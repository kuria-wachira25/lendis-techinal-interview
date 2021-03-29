import * as services from "../services/index";

export const setApplicationRoutes = (app:any) => {
	app.get("/checkApiHealth", services.checkApiHealth);
	app.post("/githubWebhook", services.githubWebhook);
};
