import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Component as Comp} from '../../core/models/component';
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
    private compProv: ComponentsProvider) {
    this.updateComponents();
  }

  public updateComponents(){
    this.components = this.compProv.getComponents();
  }

}
