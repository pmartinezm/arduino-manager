import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtProvider } from '../../providers/bt/bt';
import { Observable } from 'rxjs/Observable';

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

  ionViewDidLoad() {
  }

  public sendCommand() {
    let bytes = new Array();
    
    for(let i = 0; i < this.command.length; i++) {
      bytes.push(this.command.charCodeAt(i));
    }

    let pack = new Uint8Array(bytes);

    console.log(bytes);
    console.log(pack);

    this.bt.send(bytes);
    this.command = "";
  }

}
