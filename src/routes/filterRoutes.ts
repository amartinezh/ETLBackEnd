import {Request, Response, NextFunction} from "express";
import { FilterController } from "../controllers/filterController";
import * as auth from '../authService'
var cors = require('cors');

export class FilterRoutes { 
    

    public filterController: FilterController = new FilterController();

    public routes(app): void {

        app.use(cors());

        app.route('/validator/filter')
        .post(auth,this.filterController.getValidator)

    }


}