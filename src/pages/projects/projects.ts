import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, ActionSheetController, ToastController } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';
import { Component as Comp } from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';
import { BoardsProvider } from '../../providers/boards/boards';
import { Board } from '../../core/models/board';

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
    public actionCtrl: ActionSheetController,
    public toast: ToastController,
    public boardProv: BoardsProvider) {
    this.updateProjects();
  }

  public updateProjects() {
    this.projects = new Array();
    //Get projects
    this.projProv.getProjects()
      .then((data) => {
        data.forEach(element => {
          let project: Project = element;
          let components = new Array<Comp>();
          let boards = new Array<Board>();
          project.components = components;
          project.boards = boards;

          this.compProv.getForProject(project.id)
            .then((dat) => {
              dat.forEach(element => {
                let component: Comp = element;
                components.push(component);
              });
            });

          this.boardProv.getForProject(project.id)
            .then((dat) => {
              dat.forEach(element => {
                let board: Board = element;
                boards.push(board);
              });
            });

          this.projects.push(project);
        });
      });
  }

  public showModal(name: string) {
    let modal = this.modalCtrl.create(name);
    modal.onDidDismiss(() => (this.updateProjects()));
    modal.present();
  }

  public showActionSheet(id: number) {
    const actionSheet = this.actionCtrl.create({
      title: 'Project actions',
      buttons: [
        {
          text: 'Edit project info',
          role: 'destructive',
          handler: () => {

          }
        }, {
          text: 'Delete project',
          handler: () => {
            this.deleteProject(id);
          }
        }
      ]
    });
    actionSheet.present();
    this.updateProjects();
  }

  public deleteProject(id: number) {
    this.projProv.deleteProject(id)
      .then(() => {
        this.compProv.deleteForProject(id);
        this.toast.create({
          message: "Project deleted",
          duration: 3000
        }).present();
      }).catch(() => {
        this.toast.create({
          message: "Error deleting project",
          duration: 5000
        }).present();
      });
  }
}
