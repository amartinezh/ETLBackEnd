//    ETLBackEnd
//    Copyright (c) 2021 ETLBackEnd
//
/**
 * @description Controlador de los verbos http para la gestión de los menús
 * @author Gildardo Patiño Trillos, Breiner Barreto, Hector Vallejo
 * @date 03/07/2021
 */
import { Request, Response } from "express";
import { Token } from "../models/interfaces/token.interface";
import { ErrorEnum } from "../models/ETLBackEnd/error";
import * as jwt from 'jsonwebtoken'
import { MenuDAO } from "../repository/IndustryBackDB/menuDAO";
//import { } from "express-jwt";

let menu = new MenuDAO();

export class MenuController {
	
	public async store(req: Request, res: Response, next) {		
		try {
			let respuesta = await menu.store(req.body);
			console.log(respuesta);
			res.send(respuesta);
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400
			next(err);
			console.log(
				"An error occurred while inserting user :" +
				error +
				`: ${MenuController.name} -> store`
			);
		}
	}

	public async getSubMenu(req: Request, res: Response, next){
		var id = req.params.menu;
		try {
			res.send(await menu.getSubMenu(id));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting menus :" +
				error +
				`: ${MenuController.name} -> getMenu`
			);
		}		
	}

	public async getMenu(req: Request, res: Response, next) {		
		try {
			res.send(await menu.getMenu());
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting menus :" +
				error +
				`: ${MenuController.name} -> getMenu`
			);
		}
	}

	public async getMenuAll(req: Request, res: Response, next) {		
		try {
			res.send(await menu.getMenu(true));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting menus :" +
				error +
				`: ${MenuController.name} -> getMenu`
			);
		}
	}

	public async getMenuPadres(req: Request, res: Response, next) {		
		try {
			res.send(await menu.getMenu(true, true));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 404
			next(err);
			console.log(
				"An error occurred while getting menus :" +
				error +
				`: ${MenuController.name} -> getMenu`
			);
		}
	}

	public async update(req: Request, res: Response, next) {
		var id = req.params.menu;
		console.log(id);
		try {
			res.send(await menu.update(req.body, id));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400
			next(err);
			console.log(
				"An error occurred while updating menu :" +
				error +
				`: ${MenuController.name} -> update`
			);
		}
	}

	public async delete(req: Request, res: Response, next) {
		var id = req.params.menu;
		console.log(id);
		try {
			res.send(await menu.delete(id));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 500
			next(err);
			console.log(
				"An error occurred while deleting menu :" +
				error +
				`: ${MenuController.name} -> delete`
			);
		}
	}

	public async getShow(req: Request, res: Response, next) {
		var id = req.params.menu;
		try {
			res.send(await menu.show(id));
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 500
			next(err);
			console.log(
				"An error occurred while deleting menu :" +
				error +
				`: ${MenuController.name} -> delete`
			);
		}
	}

}