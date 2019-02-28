import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddProjectPage } from './modal-add-project';

@NgModule({
  declarations: [
    ModalAddProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddProjectPage),
  ],
})
export class ModalAddProjectPageModule {}
