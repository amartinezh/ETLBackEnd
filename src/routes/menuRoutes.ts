/**
 * @description Rutas para la gestión de los menús
 * @author Gildardo Patiño Trillos, Breiner Barreto, Hector Vallejo
 * @date 03/07/2021
 */
import {Request, Response, NextFunction} from "express";
import * as auth from '../authService'
import { MenuController } from "../controllers/menuController";
var cors = require('cors');
export class MenuRoutes {        
    public menuController: MenuController = new MenuController();
    public routes(app): void {           
        app.use(cors());
        app.route('/menu/get').get(auth,this.menuController.getMenu);
        app.route('/menu/:menu/show').get(auth,this.menuController.getShow);
        app.route('/menu/getall').get(auth,this.menuController.getMenuAll);
        app.route('/menu/getpadres').get(auth,this.menuController.getMenuPadres);
        app.route('/menu/:menu/submenu').get(auth,this.menuController.getSubMenu);
        app.route('/menu/store').post(auth,this.menuController.store);
        app.route('/menu/update/:menu').post(auth,this.menuController.update);
        app.route('/menu/delete/:menu').get(auth,this.menuController.delete);
    }
}