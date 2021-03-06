
import {Request, Response, NextFunction} from "express";
import { PeopleController } from "../controllers/peopleController";
import { FilterController } from "../controllers/filterController";
import * as auth from '../authService'
import { GrupoUnoController } from "../controllers/grupoUnoController";
var cors = require('cors');
export class PeopleRoutes { 
    
    public peopleController: PeopleController = new PeopleController();
    public grupoUnoController: GrupoUnoController = new GrupoUnoController();
    public filterController: FilterController = new FilterController();

    public routes(app): void {   
        
        app.use(cors());

        app.route('/user/insert').post(auth,this.peopleController.insertPeople)

        app.route('/user/get')
        .post(auth,this.peopleController.getPeople)

        app.route('/user/getById')
        .post(auth,this.peopleController.getPeopleById)

        app.route('/user/update')
        .post(auth,this.peopleController.updatePeople)

        app.route('/user/delete')
        .post(auth,this.peopleController.deletePeople)

        app.route('/validator/filter')
        .post(auth,this.filterController.getValidator)

        app.route('/grupoUno/subirExcel').post(auth, this.grupoUnoController.leerExcel);
    }
}