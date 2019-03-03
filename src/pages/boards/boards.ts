import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController, ViewController } from 'ionic-angular';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Board } from '../../core/models/board';
import { Project } from '../../core/models/project';
import { BoardsProvider } from '../../providers/boards/boards';

/**
 * Generated class for the BoardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boards',
  templateUrl: 'boards.html',
})
export class BoardsPage {

  boards: Array<Board>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private boardProv: BoardsProvider,
    public modalCtrl: ModalController,
    public toast: ToastController,
    public actionCtrl: ActionSheetController,
    public projProv: ProjectsProvider,
    public viewCtrl: ViewController
  ) {
    this.boards = new Array();
    this.updateBoards();
  }

  public showModal(name: string) {
    let modal = this.modalCtrl.create(name);
    modal.onDidDismiss(() => (this.updateBoards()));
    modal.present();
  }

  public updateBoards() {
    this.boards = new Array();
    this.boardProv.getBoards()
      .then((data) => {
        data.forEach(element => {
          let board: Board = element;
          this.projProv.getProject(board.project)
            .then((projects) => {
              if (projects.length == 0) {
                board.projectName = "No project";
              } else {
                let project: Project = projects[0];
                board.projectName = project.name;
              }
            }).catch((e) => {
              console.log("ERROR:");
              console.log(e);
            })
          this.boards.push(board);
        });
      });
  }

  public showActionSheet(id: number) {
    const actionSheet = this.actionCtrl.create({
      title: 'Board actions',
      buttons: [
        {
          text: 'Edit board info',
          role: 'destructive',
          handler: () => {

          }
        }, {
          text: 'Delete board',
          handler: () => {
            this.deleteComponent(id);
          }
        }, {
          text: 'Usassing project',
          handler: () => {
            this.unassingComponent(id);
          }
        }, {
          text: 'Add to project',
          handler: () => {
            let modal = this.modalCtrl.create("ModalAddToProjectPage", { id: id, type: "board" });
            modal.onDidDismiss(() => {
              this.updateBoards();
            });
            modal.present();
          }
        }
      ]
    });
    actionSheet.present();
    this.updateBoards();
  }

  public unassingComponent(id: number) {
    this.boardProv.assignProject(id, -1)
      .then(() => {
        this.toast.create({
          message: "This board is now available.",
          duration: 3000
        }).present();
      }).catch(() => {
        this.toast.create({
          message: "Error unassigning board.",
          duration: 5000
        }).present();
      });
  }

  public deleteComponent(id: number) {
    this.boardProv.deleteBoard(id)
      .then(() => {
        this.boardProv.deleteForProject(id);
        this.toast.create({
          message: "Component deleted",
          duration: 3000
        }).present();
      }).catch(() => {
        this.toast.create({
          message: "Error deleting component",
          duration: 5000
        }).present();
      });
  }

}
