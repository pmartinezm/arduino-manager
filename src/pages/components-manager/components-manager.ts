import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Component as Comp } from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';

/**
 * Generated class for the ComponentsManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-components-manager',
  templateUrl: 'components-manager.html',
})
export class ComponentsManagerPage {

  components: Array<Comp>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private compProv: ComponentsProvider,
    public modalCtrl: ModalController) {
    this.components = new Array();
    this.updateComponents();
  }

  public showModal(name: string) {
    let modal = this.modalCtrl.create(name);
    modal.onDidDismiss(() => (this.updateComponents()));
    modal.present();
  }

  public updateComponents() {
    this.components = new Array();
    this.compProv.getComponents()
      .then((data) => {
        data.forEach(element => {
          let component: Comp = element;
          console.log(component);
          // console.log(component.getComponentUse());
          this.components.push(component);
        });
      });
  }

}
