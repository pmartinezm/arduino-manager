import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddComponentPage } from './modal-add-component';

@NgModule({
  declarations: [
    ModalAddComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddComponentPage),
  ],
})
export class ModalAddComponentPageModule {}
