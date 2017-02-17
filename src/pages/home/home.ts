import { ResultsPage } from './../results/results';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public zipCode:string;

  constructor(public navCtrl: NavController) {
  }


  public getResults() {
    let data = {
      zipCode: this.zipCode
    }
    this.navCtrl.push(ResultsPage,data);
  }

}
