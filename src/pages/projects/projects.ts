import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, ActionSheetController } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';
import { ComponentsProvider } from '../../providers/components/components';

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
    public projProv: ProjectsProvider,
    public compProv: ComponentsProvider,
    public actionCtrl: ActionSheetController) {
    this.updateProjects();
  }

  public updateProjects() {
    this.projects = new Array();
    //Get projects
    this.projProv.getProjects()
      .then((data) => {
        data.forEach(element => {
          let project: Project = element;
          this.projects.push(project);
        });
      });
  }

  public showModal(name: string) {
    let modal = this.modalCtrl.create(name);
    modal.onDidDismiss(() => (this.updateProjects()));
    modal.present();
  }

  public showActionSheet() {
    const actionSheet = this.actionCtrl.create({
      title: 'Project actions',
      buttons: [
        {
          text: 'Edit project info',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Delete project',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
