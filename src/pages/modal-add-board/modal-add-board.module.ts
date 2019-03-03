import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddBoardPage } from './modal-add-board';

@NgModule({
  declarations: [
    ModalAddBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddBoardPage),
  ],
})
export class ModalAddBoardPageModule {}
