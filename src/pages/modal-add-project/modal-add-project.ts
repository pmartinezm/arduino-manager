import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component as Comp } from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';

/**
 * Generated class for the ModalAddProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-project',
  templateUrl: 'modal-add-project.html',
})
export class ModalAddProjectPage {

  components: Array<Comp>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private compProv: ComponentsProvider,
    private projProv: ProjectsProvider) {
      this.components = new Array();
      //this.updateComponents();
  }

  name: string;
  description: string;
  private addProject() {
    this.projProv.insertProject(this.name, this.description);
  }

  private updateComponents() {
    this.components = this.compProv.getComponents();
  }
}
