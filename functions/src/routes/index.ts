import * as services from "../services/index";

export const setApplicationRoutes = (app:any) => {
	app.get("/check-api-health", services.checkApiHealth);
	app.post("/tweet-github-push", services.tweetGithubPush);
};
