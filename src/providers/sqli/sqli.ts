import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, ToastCmp, ToastController, ToastOptions } from 'ionic-angular';

/*
  Generated class for the SqliProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliProvider {

  db: SQLiteObject;

  constructor(private sqlite: SQLite,
    private platform: Platform,
    private toast: ToastController) {
      this.generateDb()
        .then(() => {
          this.toast.create({
            message: 'Database ok.',
            duration: 1000
          }).present();
        })
        .catch(() => {
          this.toast.create({
            message: 'Database error.',
            duration: 5000
          }).present();
        });
  }

  getDb() {
    return this.sqlite.create({
      name: 'am1.db',
      location: 'default'
    });
  }

  generateDb() {
    return this.getDb()
      .then((db: SQLiteObject) => {
        this.db = db;
        this.createTables();
      });
  }

  public send(sql: string, params?: any[]) {
    return this.db.executeSql(sql, [])
      .then((data) => {
        let lists = [];
        for (let i = 0; i < data.rows.length; i++) {
          lists.push(data.rows.item(i));
        }
        return lists;
      })
  }

  private createTables() {
    this.db.executeSql(`create table if not exists components (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NULL,
      project INTEGER NOT NULL DEFAULT -1
    );`, [])//PRUEBA DE CAMBIO
      .then(() => console.log("Table components created."))
      .catch((e) => {
        console.log("Error creating table:");
        console.log(e);
      });
    this.db.executeSql(`create table if not exists projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        description TEXT NULL
      );`, [])
      .then(() => console.log("Table projects created."))
      .catch((e) => {
        console.log("Error creating table:");
        console.log(e);
      });
    this.db.executeSql(`create table if not exists boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NULL,
      project INTEGER NOT NULL DEFAULT -1
      );`, [])
      .then(() => console.log("Table boards created."))
      .catch((e) => {
        console.log("Error creating table:");
        console.log(e);
      });
  }
}
