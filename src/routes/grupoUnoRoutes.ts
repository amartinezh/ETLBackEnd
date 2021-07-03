
import {Request, Response, NextFunction} from "express";
import { GrupoUnoController } from "../controllers/grupoUnoController";
import * as auth from '../authService'
var cors = require('cors');
export class GrupoUnoRoutes { 
    
    public grupoUnoController: GrupoUnoController = new GrupoUnoController();

    public routes(app): void {   
        
        app.use(cors());

        app.route('/grupoUno/subirExcel2').post(auth, this.grupoUnoController.leerExcel);
    }
}