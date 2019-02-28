import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsManagerPage } from './components-manager';

@NgModule({
  declarations: [
    ComponentsManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ComponentsManagerPage),
  ],
})
export class ComponentsManagerPageModule {}
