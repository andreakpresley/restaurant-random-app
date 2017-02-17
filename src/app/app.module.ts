import { RepeatPipe } from './../pipes/repeat';
import { SafePipe } from './../pipes/safeUrl';
import { WinnerPage } from './../pages/winner/winner';
import { ResultsPage } from './../pages/results/results';
import { ResultsService } from './../services/results-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultsPage,
    WinnerPage,
    SafePipe,
    RepeatPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultsPage,
    WinnerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ResultsService]
})
export class AppModule {}
