//    ETLBackEnd
//    Copyright (c) 2021 ETLBackEnd
//
//    This file is part of ETLBackEnd
//    @uthor: Andrés Mauricio Martinez Hincapié
//
//    ETLBackEnd is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    ETLBackEnd is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with ETLBackEnd.  If not, see <http://www.gnu.org/licenses/>.

import { Request, Response } from "express";
import { PeopleDAO } from "../repository/IndustryBackDB/peopleDAO";
import { Token } from "../models/interfaces/token.interface";
import { ErrorEnum } from "../models/ETLBackEnd/error";
import * as jwt from 'jsonwebtoken'
//import { } from "express-jwt";

let people = new PeopleDAO();

export class AuthController {
	/*-------------------------------- app --------------------------------------------------------*/

	public async valUser(req: Request, res: Response, next) {
		try {

			res.send(await people.val(req.body.id, req.body.apppassword));

			/* var result = await people.val(req.body.id, req.body.apppassword).then((successMessage) => {
				console.log("¡Sí! " + successMessage);
			  });
			
			let token: Token;
			var tokenReturn = jwt.sign(token, "fcasc3210sdfjnmku+98KJH45f", {
				expiresIn: 60 * 60 * 24 // expires in 24 hours
			});
			
			
			res.send({
				user: result[0],
				tokenReturn
			});

			if (result.length > 0) {
				result.map((item: any) => {
					token = {
						id: item.id,
						name: item.name,
						rol: item.role,
						password: item.apppassword
					};
				});
				var tokenReturn = jwt.sign(token, "fcasc3210sdfjnmku+98KJH45f", {
					expiresIn: 60 * 60 * 24 // expires in 24 hours
				});		
				res.send({
					user: result[0],
					tokenReturn
				});
			} else {
				let err: ErrorEnum = new Error('Incorrect user or password');
				err.status = 403
				next(err);
			}
			*/
			
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 500
			next(err);
			console.log(
				"An error occurred while validating user :" +
				error +
				`: ${AuthController.name} -> val`
			);
		}
	}
}