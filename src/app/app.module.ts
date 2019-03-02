import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectsProvider } from '../providers/projects/projects';
import { ComponentsProvider } from '../providers/components/components';
import { SqliProvider } from '../providers/sqli/sqli';
import { SQLite } from '@ionic-native/sqlite';
import { BtProvider } from '../providers/bt/bt';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProjectsProvider,
    ComponentsProvider,
    SqliProvider,
    SQLite,
    BtProvider,
    BluetoothSerial
  ]
})
export class AppModule { }
