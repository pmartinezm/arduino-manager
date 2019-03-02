import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqliProvider } from '../../providers/sqli/sqli';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  estado: string;

  constructor(public navCtrl: NavController,
    //private sqli: SqliProvider
  ) {
  }

  public open(page: string) {
    console.log("Opening page " + page);
    this.navCtrl.push(page)
  }

}
