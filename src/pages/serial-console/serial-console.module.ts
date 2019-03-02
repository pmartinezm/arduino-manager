import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerialConsolePage } from './serial-console';

@NgModule({
  declarations: [
    SerialConsolePage,
  ],
  imports: [
    IonicPageModule.forChild(SerialConsolePage),
  ],
})
export class SerialConsolePageModule {}
