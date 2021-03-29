import * as functions from "firebase-functions";
import * as firebaseFunctionsTest from "firebase-functions-test";
import * as fs from "fs";
import * as path from "path";

const initFirebaseFuntionsTest=firebaseFunctionsTest({
	databaseURL: "https://lendis-project-default-rtdb.firebaseio.com",
	projectId: "lendis-project",
}, require("../../../service-account.json"));

const envData:string = fs.readFileSync(path.resolve("env.json")).toString("utf-8");

initFirebaseFuntionsTest.mockConfig(JSON.parse(envData));

functions.config();

export default initFirebaseFuntionsTest;
