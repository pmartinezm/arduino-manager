import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component as Comp} from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';

/**
 * Generated class for the ModalAddComponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-component',
  templateUrl: 'modal-add-component.html',
})
export class ModalAddComponentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private compProv: ComponentsProvider) {
  }

  name: string;
  description: string = "";
  private addComponent() {
    let component = new Comp(this.name, this.description);
    this.compProv.addComponent(component)
      .then(() => {
        this.navCtrl.pop();
      });
  }

}
