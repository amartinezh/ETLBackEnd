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


import * as express from "express";
import * as bodyParser from "body-parser";
import { DataBaseService } from './db/dev/dataBaseService';
import { PeopleRoutes } from "./routes/peopleRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import { ErrorHandler } from "./errorHandlerService";
import { LogRoutes } from "./routes/logRoutes";

class App {

    public app: express.Application;
    public peopleRoutes: PeopleRoutes = new PeopleRoutes();
    public authRoutes: AuthRoutes = new AuthRoutes();
    public errorHandler: ErrorHandler = new ErrorHandler();

    private connection;

    constructor() {
        this.app = express();
        this.config();
        this.peopleRoutes.routes(this.app);
        this.authRoutes.routes(this.app);
        this.errorHandler.routes(this.app);

        this.connection = DataBaseService.getInstance();
        //this.httpRequestService = HttpRequestService.getInstance();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;