import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';
import { ComponentsProvider } from '../../providers/components/components';

/**
 * Generated class for the ModalAddToProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-add-to-project',
  templateUrl: 'modal-add-to-project.html',
})
export class ModalAddToProjectPage {

  projects: Array<Project>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public projProv: ProjectsProvider,
    public compProv: ComponentsProvider
  ) {
    this.projects = new Array();
    this.projProv.getProjects()
      .then((data) => {
        data.forEach(element => {
          let project: Project = element;
          this.projects.push(project);
        });
      });
  }

  public addToProject(id: number) {
    this.compProv.assignProject(this.navParams.data.id, id)
      .then(() => {
        this.navCtrl.pop();
      }).catch((e) => {
        console.log(e);
      });
  }
}
