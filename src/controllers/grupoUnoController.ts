import { Request, Response } from "express";
import { ExcelDAO } from "../repository/IndustryBackDB/excelDAO";
import { ErrorEnum } from "../models/ETLBackEnd/error";
import { ExcelCampos } from "../models/ETLBackEnd/excelCampos";
import xlsxFile from 'read-excel-file'

let excelDAO = new ExcelDAO();
var fs = require('fs');
const readXlsxFile = require('read-excel-file/node')

export class GrupoUnoController {
	public leerExcel(req: Request, res: Response) {
		try {
			var bitmap = new Buffer(req.body.excelBase, 'base64');
			fs.writeFileSync('file.xlsx', bitmap);
			console.log('******** File created from base64 encoded string ********');

			let lstExcel = [];
			readXlsxFile('file.xlsx').then((rows) => {
				for (var i in rows) {
					let excel: ExcelCampos = new ExcelCampos();
					for (var j in rows[i]) {
						switch (j) {
							case "0":
								excel.temperatura = rows[i][j];
								break;
							case "1":
								excel.vibracion = rows[i][j];
								break;
							case "2":
								excel.horaLectura = rows[i][j];
								break;
							case "3":
								excel.fechaCargaArchivo = rows[i][j];
								break;
							case "4":
								excel.maquina = rows[i][j];
								break;
							default:
								console.log('Sin columna');
						}
					}
					lstExcel.push(excel);
				}
				console.log("Lista");
				res.send(excelDAO.insertExcelLista(lstExcel));
			});
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400
			console.log("Error leyendo excel :" + error);
		}
	}

	public procesarExcel() {
		try {
			let lstExcel = [];
			let excel: ExcelCampos;
			excel.id = "2";
			excel.temperatura = "25°";
			excel.vibracion = "120pps";
			excel.horaLectura = "12:30pm";
			excel.fechaCargaArchivo = "27/06/2021";
			lstExcel.push(excel);
			return lstExcel;
		} catch (error) {
			let err: ErrorEnum = new Error(error);
			err.status = 400;
			console.log("Error procesando el Excel :" + error);
		}
	}
}