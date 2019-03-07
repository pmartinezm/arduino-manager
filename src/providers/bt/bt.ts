import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TextEncoder, TextDecoder } from 'text-encoding';

/*
  Generated class for the BtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BtProvider {

  device: Observable<any>;

  constructor(public bt: BluetoothSerial,
    public toast: ToastController) {

  }

  public enable() {
    return this.bt.enable();
  }

  public isEnabled(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bt.isEnabled()
        .then(() => {
          resolve("Bluetooth is enabled");
        }).catch(() => {
          reject("Bluetooth is disabled");
        });
    });
  }

  public isConnected(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bt.isConnected()
        .then(() => {
          resolve("Connected.");
        }).catch(() => {
          reject("Not connected.");
        });
    });
  }

  public getPaired(): Promise<any> {
    return this.bt.list()
      .catch(() => {
        this.toast.create({
          message: "Error getting bluetooth device list.",
          duration: 5000
        }).present();
      });
  }

  public connect(address: string) {
    this.bt.connect(address).subscribe((data) => {
      this.toast.create({ message: "Connected", duration: 2500 }).present();
      console.log("DATA:");
      console.log(data);
    }, () => {
      this.toast.create({ message: "Disconnected", duration: 2500 }).present();
    });
  }

  public send(command: string) {
    return this.bt.write(command);
  }

  public disconnect() {
    this.bt.disconnect();
  }
}
