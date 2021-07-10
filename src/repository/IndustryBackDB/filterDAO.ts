import { DataBaseService } from '../../db/dev/dataBaseService';
import { Filter } from 'models/ETLBackEnd/filter';
import { LogEnum } from '../../models/ETLBackEnd/log.enum';
import { LogDAO } from './logDAO';

export class FilterDAO {

    private log: LogDAO;
    private connection;
    constructor() {
        this.connection = DataBaseService.getInstance();
        this.log = new LogDAO()
    }

    public async getValidator() {
        try {
            var res = await this.connection.pool.query('CALL adm.validar_rangos()', "")
                .catch(e => console.error(e.stack));
            return res;
        } catch (error) {
            //this.log.insertLog(LogEnum.ERROR, `${PeopleDAO.name} -> ${this.getPeople.name}: ${error}`)
            throw new Error(error)
        }
    }

}