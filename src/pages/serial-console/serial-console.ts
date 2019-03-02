import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtProvider } from '../../providers/bt/bt';

/**
 * Generated class for the SerialConsolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serial-console',
  templateUrl: 'serial-console.html',
})
export class SerialConsolePage {
  command: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bt: BtProvider) {
  }

  public sendCommand() {
    this.bt.send(this.command);
    this.command = "";
  }

}
