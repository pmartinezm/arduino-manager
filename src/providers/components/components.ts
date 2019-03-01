import { Injectable } from '@angular/core';
import { Component } from '../../core/models/component';
import { SQLite } from '@ionic-native/sqlite';
import { SqliProvider } from '../sqli/sqli';

/*
  Generated class for the ComponentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComponentsProvider {

  constructor(private db: SqliProvider) {
  }

  public getComponents() {
    let sql = `select * from components`;
    return this.db.send(sql);
  }

  public addComponent(c: Component){
    let sql = `insert into components (name, description, project) values ('${c.name}', '${c.description}', '${c.project}')`;
    return this.db.send(sql);
  }

  public deleteComponent(id: number) {
    let sql = "delete from components where id = " + id;
    return this.db.send(sql);
  }

  public editComponent(c: Component){
    let sql = `update components set name = '${c.name}', description = '${c.description}'`;
    return this.db.send(sql);
  }

  public getForProject(id: number) {
    let sql = "select * from components where project = " + id;
  }

}
