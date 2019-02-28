import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  public projects: Array<Project>;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public projProv: ProjectsProvider) {
    this.updateProjects();
  }

  public updateProjects() {
    this.projects = new Array();
    this.projProv.getProjects()
    .then((data)=>{
      data.forEach(element => {
        let project: Project = element;
        this.projects.push(project);
      });
    })
  }

  public showModal(name: string) {
    let modal = this.modalCtrl.create("ModalAddProjectPage");
    modal.onDidDismiss(() => (this.updateProjects()));
    modal.present();
  }
}
