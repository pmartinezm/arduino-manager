import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddToProjectPage } from './modal-add-to-project';

@NgModule({
  declarations: [
    ModalAddToProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddToProjectPage),
  ],
})
export class ModalAddToProjectPageModule {}
