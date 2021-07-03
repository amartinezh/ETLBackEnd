import { DataBaseService } from '../../db/dev/dataBaseService';
import { ExcelCampos } from 'models/ETLBackEnd/excelCampos';
import { LogEnum } from '../../models/ETLBackEnd/log.enum';
import { LogDAO } from './logDAO';

export class ExcelDAO {

    private log: LogDAO;
    private connection;
    constructor() {
        this.connection = DataBaseService.getInstance();
        this.log = new LogDAO()
    }

    public async insertExcel(excel: ExcelCampos) {
        try {
            this.connection.pool.query('INSERT INTO adm.tbl_excel (temperatura, vibracion, hora_lectura, fecha_archivo) VALUES ($1, $2, $3, $4)',
                [
                    excel.temperatura,
                    excel.vibracion,
                    excel.horaLectura,
                    excel.fechaCargaArchivo
                ],
                (error, results) => {
                    if (error) {
                        throw error
                    }
                    return results;
                })
        } catch (error) {
            //this.log.insertLog(LogEnum.ERROR, "Error insertando el Excel")
            throw new Error(error)
        }
    }

    public async insertExcelLista(lstExcel: ExcelCampos[]) {
        try {
            var connection = this.connection;
            lstExcel.forEach(function (excel) {
                connection.pool.query('INSERT INTO adm.tbl_excel (temperatura, vibracion, hora_lectura, fecha_archivo) VALUES ($1, $2, $3, $4)',
                    [
                        excel.temperatura,
                        excel.vibracion,
                        excel.horaLectura,
                        excel.fechaCargaArchivo
                    ],
                    (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log('Insert Exitoso: ' + JSON.stringify(excel));
                    });
            });
        } catch (error) {
            throw new Error(error)
        }
    }
}
