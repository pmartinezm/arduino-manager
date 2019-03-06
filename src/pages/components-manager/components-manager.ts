import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, ActionSheetController, ViewController } from 'ionic-angular';
import { Component as Comp } from '../../core/models/component';
import { ComponentsProvider } from '../../providers/components/components';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../core/models/project';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private compProv: ComponentsProvider,
    public modalCtrl: ModalController,
    public toast: ToastController,
    public actionCtrl: ActionSheetController,
    public projProv: ProjectsProvider,
    public viewCtrl: ViewController
  ) {
  }

  ionViewWillEnter() {
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
          this.projProv.getProject(component.project)
            .then((projects) => {
              if (projects.length == 0) {
                component.projectName = "No project";
              } else {
                let project: Project = projects[0];
                component.projectName = project.name;
              }
            }).catch((e) => {
              console.log("ERROR:");
              console.log(e);
            })
          this.components.push(component);
        });
      });
  }

  public showActionSheet(id: number) {
    const actionSheet = this.actionCtrl.create({
      title: 'Project actions',
      buttons: [
        {
          text: 'Delete component',
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
            let modal = this.modalCtrl.create("ModalAddToProjectPage", { id: id, type: "component" });
            modal.onDidDismiss(() => {
              this.updateComponents();
            });
            modal.present();
          }
        }
      ]
    });
    actionSheet.present();
    actionSheet.onDidDismiss(() => {
      this.updateComponents();
    });
  }

  public unassingComponent(id: number) {
    this.compProv.assignProject(id, -1)
      .then(() => {
        this.toast.create({
          message: "This component is now available.",
          duration: 3000
        }).present();
      }).catch(() => {
        this.toast.create({
          message: "Error unassigning component.",
          duration: 5000
        }).present();
      });
  }

  public deleteComponent(id: number) {
    this.compProv.deleteComponent(id)
      .then(() => {
        this.compProv.deleteForProject(id);
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
