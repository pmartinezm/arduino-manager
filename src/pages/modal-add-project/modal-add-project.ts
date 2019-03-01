import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component as Comp } from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private compProv: ComponentsProvider,
    private projProv: ProjectsProvider) {
  }

  name: string;
  description: string = "";
  private addProject() {
    let project = new Project(this.name, this.description);
    this.projProv.addProject(project)
      .then(() => {
        this.navCtrl.pop();
      });
  }
}
