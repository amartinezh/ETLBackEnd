import { Request, Response } from "express";
import { FilterDAO } from "../repository/IndustryBackDB/filterDAO";
import { ErrorEnum } from "../models/ETLBackEnd/error";
import { Filter } from "../models/ETLBackEnd/filter";

let filter = new FilterDAO();

export class FilterController {

    public async getValidator(req: Request, res: Response, next) {
		try {
			res.send(await filter.getValidator());
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting filters :" +
				error +
				`: ${FilterController.name} -> getValidator`
			);
		}
	}

}