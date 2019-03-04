import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
    public bt: BtProvider,
    public alertCtrl: AlertController,
    public toast: ToastController) {
    this.bt.checkEnabled().then(() => {
      this.getPairedDevices();
    }).catch(()=>{
      this.showAlert();
    });
  }

  public getPairedDevices() {
    this.bt.getPaired()
        .then((data) => {
          this.pairedDevices = data;
        });
  }

  public connect(address: string) {
    this.bt.connect(address);
  }

  showAlert() {
    const confirm = this.alertCtrl.create({
      title: 'Bluetooth disabled',
      message: 'Do you want to enable bluetooth?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.bt.enable()
              .then(() => {
                this.toast.create({
                  message: "Bluetooth enabled.",
                  duration: 2000
                }).present();
                this.getPairedDevices();
              }).catch(() => {
                this.toast.create({
                  message: "Bluetooth error.",
                  duration: 3000
                }).present();
              })
          }
        }
      ]
    });
    confirm.present();
  }

}
