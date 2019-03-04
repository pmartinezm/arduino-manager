import { Injectable } from '@angular/core';
import { Project } from '../../core/models/project';
import { Component } from '../../core/models/component';
import { Board } from '../../core/models/board';
import { ComponentsProvider } from '../components/components';
import { SqliProvider } from '../sqli/sqli';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider {
  constructor(private db: SqliProvider,
    private toast: ToastController) {

  }

  public addProject(p: Project) {
    let sql = `insert into projects (name, description) values ('${p.name}', '${p.description}')`;
    return this.db.send(sql);
  }

  public getProjects(): any {
    let sql = "select * from projects";
    return this.db.send(sql);
  }

  public getProject(id: number) {
    let sql = "select * from projects where id = " + id;
    return this.db.send(sql);
  }

  public deleteProject(id: number) {
    let sql = "delete from projects where id = " + id;
    return this.db.send(sql);
  }

  public editProject(id: number, name: string, description: string) {
    let sql = `update projects set name = '${name}', description = '${description}' where id = ${id}`;
    return this.db.send(sql);
  }

  public count() {
    let sql = `select count(*) as count from projects`;
    return this.db.send(sql);
  }
}
