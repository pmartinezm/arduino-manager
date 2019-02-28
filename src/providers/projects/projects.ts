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
  public projects: Array<Project>;

  constructor(private db: SqliProvider,
    private toast: ToastController) {

  }

  public insertProject(name: string, description?:string ) {
    let sql = `insert into projects (name, description) values ('${name}', '${description}')`;
    return this.db.send(sql);
  }

  public getProjects(): any {
    let sql = "select * from projects";
    return this.db.send(sql);
  }

  private message(message: string, duration: number) {
    this.toast.create({
      message: message,
      duration: duration
    }).present();
  }
}
