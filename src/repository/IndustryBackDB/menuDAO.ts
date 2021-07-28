//    ETLBackEnd
//    Copyright (c) 2021 ETLBackEnd
//
/**
 * [description] ETLBackEnd
 * [Copyright (c) 2021] ETLBackEnd
 * @author Gildardo Patiño Trillos, Breiner Barreto, Hector Vallejo
 * @date 07-07-2021
 */

import { DataBaseService } from '../../db/dev/dataBaseService';
import * as uuid from "uuid";
import { LogEnum } from '../../models/ETLBackEnd/log.enum';
import { LogDAO } from './logDAO';
import * as bcrypt from 'bcrypt'
import { Menu } from '../../models/ETLBackEnd/menu';

export class MenuDAO {

    private log: LogDAO;
    private connection;

    constructor() {
        this.connection = DataBaseService.getInstance();
        this.log = new LogDAO()
    }

    /**
     * [async metodo para guadar la informacion del nuevo menu]
     *
     * @param   {Menu}  menu  [menu description]
     *
     * @return  {[type]}      [return description]
     */
    public async store(menu: Menu) {
        try {
            await this.connection.pool.query('INSERT INTO adm.tbl_menu (title, name, url, icon, badge_variant, badge_text, children_of, es_titulo, orden) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [menu.title, menu.title, menu.url, menu.icon, menu.badge_variant, menu.badge_text, menu.children_of, menu.es_titulo, menu.orden], (error, results) => {
                if (error) {
                    return false;
                }
                return true;
            })
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${MenuDAO.name} -> ${this.store.name}: ${error}`)
            return 0;
            //throw new Error(error)
        }
    }

    /**
     * [async description]
     *  Metodo para obtener el submenu de un menu especifico, solo acepta 1 nivel segun la plantilla
     * @param   {any}  id  [id description]
     *
     * @return  {[type]}   [return description]
     */
    public async getSubMenu(id: any, todos:boolean=false) {        
        let listMenu = [];
            let sql = 'SELECT * FROM adm.tbl_menu WHERE children_of = ' + id + ' AND deleted_at IS NULL ORDER BY orden';
            var res = await this.connection.pool.query(sql, "").then(res => {
                let menus = res.rows;
                var data = null;
                menus.forEach(async item => {
                    if (item.badge_variant != null) {
                        if(todos){
                            data = {
                                id: item.id,title:item.title,badge_variant:item.badge_variant,children_of:item.children_of,created_at:item.created_at,es_titulo:item.es_titulo,
                                name: item.name, url: item.url, icon: item.icon,badge_text:item.badge_text,orden:item.orden,
                                badge: { variant: item.badge_variant, text: item.badge_text }
                            };
                        }else{
                            data = {
                                name: item.name, url: item.url, icon: item.icon,
                                badge: { variant: item.badge_variant, text: item.badge_text }
                            };
                        }
                        listMenu.push(data);
                    } else {
                        if(todos){
                            data = {
                                id: item.id,title:item.title,badge_variant:item.badge_variant,children_of:item.children_of,created_at:item.created_at,es_titulo:item.es_titulo,
                                name: item.name, url: item.url, icon: item.icon,badge_text:item.badge_text,orden:item.orden,
                                badge: { variant: item.badge_variant, text: item.badge_text }
                            };
                        }else{
                            data = { name: item.name, url: item.url, icon: item.icon };
                        }
                        listMenu.push(data);
                    }
                });              
            }).catch(e => console.error(e.stack)); 
        return listMenu;
    }

    /**
     * [async description]
     * Metodo para obtener el menu completo que no sean hijos
     * @return  {[type]}  [return description]
     */
    public async getMenu(todos:boolean=false, padres=false) {
        try {            
            let sql = '';
            let listMenu = [];            
            sql = 'SELECT * FROM adm.tbl_menu  WHERE children_of = 0 AND deleted_at IS NULL ORDER BY orden';
            var res = await this.connection.pool.query(sql, "").then(res => {
                let menus = res.rows;
                var data = null;
                menus.forEach(item => {
                    if (item.es_titulo == 0) {
                        if (item.badge_variant != null) {
                            if(todos){
                                data = {
                                    id: item.id,title:item.title,badge_variant:item.badge_variant,children_of:item.children_of,created_at:item.created_at,es_titulo:item.es_titulo,
                                    name: item.name, url: item.url, icon: item.icon,badge_text:item.badge_text,orden:item.orden,
                                    badge: { variant: item.badge_variant, text: item.badge_text }
                                };
                            }else{
                                data = {
                                    id: item.id,
                                    name: item.name, url: item.url, icon: item.icon,
                                    badge: { variant: item.badge_variant, text: item.badge_text }
                                }
                            }
                            listMenu.push(data);
                        } else {
                            if(todos){
                                data = {
                                    id: item.id,title:item.title,badge_variant:item.badge_variant,children_of:item.children_of,created_at:item.created_at,es_titulo:item.es_titulo,
                                    name: item.name, url: item.url, icon: item.icon,badge_text:item.badge_text,orden:item.orden,
                                    badge: { variant: item.badge_variant, text: item.badge_text }
                                };
                            }else{                                
                                data = { id: item.id, name: item.name, url: item.url, icon: item.icon };
                            }
                            listMenu.push(data);
                        }
                    } else { // Si es un titulo
                        if(padres == false){
                            if(todos){
                                data = {
                                    id: item.id,title:item.title,badge_variant:item.badge_variant,children_of:item.children_of,created_at:item.created_at,es_titulo:item.es_titulo,
                                    name: item.name, url: item.url, icon: item.icon,badge_text:item.badge_text,orden:item.orden,
                                    badge: { variant: item.badge_variant, text: item.badge_text }
                                };
                            }else{                            
                                data = { id: item.id, title: item.title, name: item.name };
                            }
                            listMenu.push(data);
                        }
                    }
                });
                return listMenu;
            }).catch(e => console.error(e.stack));
            // Buscamos los submenus
            if(padres == false){
                await Promise.all(res.map(async (element) => {
                    const data =  await this.getSubMenu(element.id, todos);    
                    if(data.length > 0){
                        element['children'] = data;
                    }                
                }));  
            }             
            return res;
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${MenuDAO.name} -> ${this.getMenu.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async update(menu: Menu, id:number) {
        try {
            this.connection.pool.query('UPDATE adm.tbl_menu SET title = $2, name = $3, url = $4, icon = $5, badge_variant = $6, badge_text = $7, children_of = $8, es_titulo = $9, orden = $10   WHERE id = $1', [id, menu.title,menu.title, menu.url, menu.icon, menu.badge_variant, menu.badge_text,menu.children_of,menu.es_titulo,menu.orden], (error, results) => {
                if (error) {
                    throw error
                }
                return results;
            });
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${MenuDAO.name} -> ${this.update.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async delete(id: number) {
        try {
            this.connection.pool.query('UPDATE adm.tbl_menu SET deleted_at=CURRENT_TIMESTAMP WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                return results;
            });
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${MenuDAO.name} -> ${this.delete.name}: ${error}`)
            throw new Error(error)
        }
    }

    public async show(id: number) {
        var menu;
        try {
            let sql = 'SELECT title, url, icon, badge_variant, badge_text, children_of, es_titulo, orden FROM adm.tbl_menu WHERE id = $1 LIMIT 1';
            let res = await this.connection.pool.query(sql, [id]).then(res => {
                menu = res.rows;
            });            
            return menu;
        } catch (error) {
            this.log.insertLog(LogEnum.ERROR, `${MenuDAO.name} -> ${this.delete.name}: ${error}`)
            throw new Error(error)
        }        
    }
}
