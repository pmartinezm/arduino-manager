import { Injectable } from '@angular/core';
import { Component } from '../../core/models/component';
import { SQLite } from '@ionic-native/sqlite';

/*
  Generated class for the ComponentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComponentsProvider {
  public components: Array<Component>;

  constructor(private slite: SQLite) {
    this.components = new Array();
    
  }

  public addComponent(comp: Component) {
    let query = "insert into "
  }

  public getComponents(): Array<Component> {
    return this.components;
  }

}
