import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { SqliProvider } from '../../providers/sqli/sqli';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';
import { BoardsProvider } from '../../providers/boards/boards';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BtProvider } from '../../providers/bt/bt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  components = 0;
  boards = 0;
  projects = 0;

  btStatus = {
    enabled: "",
    connected: ""
  };

  constructor(public navCtrl: NavController,
    private sqli: SqliProvider,
    private menuCtrl: MenuController,
    private projProv: ProjectsProvider,
    private compProv: ComponentsProvider,
    private boardProv: BoardsProvider,
    private platform: Platform,
    private iab: InAppBrowser,
    private bt: BtProvider
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
        this.bt.isEnabled()
          .then((s) => {
            this.btStatus.enabled = s;
            this.bt.isConnected().then((s) => {
              this.btStatus.connected = s;
            }).catch((s) => {
              this.btStatus.connected = s;
            })
          }).catch((s) => {
            this.btStatus.enabled = s;
          });
      }).catch((e)=>{
        console.log("PLATFORM NOT READY:");
        console.log(e);
      });
  }

  ionViewDidEnter() {
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
