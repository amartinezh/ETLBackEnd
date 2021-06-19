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

import { ErrorEnum } from "models/ETLBackEnd/error";


export class ErrorHandler {

    public routes(app): void {

        app.use((req, res, next) => {
            let error: ErrorEnum = new Error('Not Found');
            error.status = 404
            next(error);
        })

        app.use((error: ErrorEnum, req, res, next) => {
            res.status(error.status || 500)
            res.json({
                status: error.status,
                message: error.message
            })
        })
    }
}