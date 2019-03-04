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

  public getComponents(): Promise<any[]> {
    let sql = `select * from components`;
    return this.db.send(sql);
  }

  public addComponent(c: Component): Promise<any[]> {
    let sql = `insert into components (name, description, project) values ('${c.name}', '${c.description}', '${c.project}')`;
    return this.db.send(sql);
  }

  public deleteComponent(id: number): Promise<any[]> {
    let sql = "delete from components where id = " + id;
    return this.db.send(sql);
  }

  public editComponent(c: Component): Promise<any> {
    let sql = `update components set name = '${c.name}', description = '${c.description}'`;
    return this.db.send(sql);
  }

  public getForProject(id: number): Promise<any[]> {
    let sql = "select * from components where project = " + id;
    return this.db.send(sql);
  }

  public deleteForProject(id: number): Promise<any[]> {
    let sql = "update components set project = -1 where project = " + id;
    return this.db.send(sql);
  }

  public assignProject(id: number, project: number) {
    let sql = `update components set project = ${project} where id = ${id}`;
    return this.db.send(sql);
  }

  public count() {
    let sql = `select count(*) as count from components`;
    return this.db.send(sql);
  }

}
