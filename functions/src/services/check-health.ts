import * as express from "express";

export default (req:express.Request, res:express.Response) => {
	res.status(200).send("Healthy");
};
