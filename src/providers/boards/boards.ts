import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqliProvider } from '../sqli/sqli';
import { Board } from '../../core/models/board';

/*
  Generated class for the BoardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BoardsProvider {

  constructor(private db: SqliProvider) {
  }

  public getBoards(): Promise<any[]> {
    let sql = `select * from boards`;
    return this.db.send(sql);
  }

  public addBoard(b: Board): Promise<any[]> {
    let sql = `insert into boards (name, description, project) values ('${b.name}', '${b.description}', '${b.project}')`;
    return this.db.send(sql);
  }

  public deleteBoard(id: number): Promise<any[]> {
    let sql = "delete from boards where id = " + id;
    return this.db.send(sql);
  }

  public editBoard(b: Board): Promise<any> {
    let sql = `update boards set name = '${b.name}', description = '${b.description}'`;
    return this.db.send(sql);
  }

  public getForProject(id: number): Promise<any[]> {
    let sql = "select * from boards where project = " + id;
    return this.db.send(sql);
  }

  public deleteForProject(id: number): Promise<any[]> {
    let sql = "update boards set project = -1 where project = " + id;
    return this.db.send(sql);
  }

  public assignProject(id: number, project: number) {
    let sql = `update boards set project = ${project} where id = ${id}`;
    return this.db.send(sql);
  }

  public count() {
    let sql = `select count(*) as count from boards`;
    return this.db.send(sql);
  }

}
