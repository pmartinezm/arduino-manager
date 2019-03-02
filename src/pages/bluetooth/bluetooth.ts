import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtProvider } from '../../providers/bt/bt';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  enabled = false;
  pairedDevices: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bt: BtProvider) {
    this.bt.checkEnabled().then(() => {
      this.bt.getPaired()
        .then((data) => {
          this.pairedDevices = data;
        });
    });
  }

  public connect(address: string) {
    this.bt.connect(address);
  }

}
