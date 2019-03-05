import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { SqliProvider } from '../../providers/sqli/sqli';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';
import { BoardsProvider } from '../../providers/boards/boards';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  estado: string;
  components = 0;
  boards = 0;
  projects = 0;

  constructor(public navCtrl: NavController,
    private sqli: SqliProvider,
    private menuCtrl: MenuController,
    private projProv: ProjectsProvider,
    private compProv: ComponentsProvider,
    private boardProv: BoardsProvider,
    private platform: Platform,
    private iab: InAppBrowser
  ) {
  }

  private update() {
    this.platform.ready()
      .then(() => {
        this.projProv.count()
          .then((data) => {
            this.projects = data[0]["count"];
          });
          this.boardProv.count()
          .then((data) => {
            this.boards = data[0]["count"];
          });
          this.compProv.count()
          .then((data) => {
            this.components = data[0]["count"];
          });
      });
  }

  ionViewDidEnter() {
    console.log("updating");
    this.update();
  }

  public open(page: string) {
    this.navCtrl.push(page);
    this.menuCtrl.close();
  }

  public openWeb(url: string) {
    this.iab.create(url).show();
  }

  public openMenu() {
    this.menuCtrl.open();
  }

}
