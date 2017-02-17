import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Winner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-winner',
  templateUrl: 'winner.html'
})
export class WinnerPage {
  public winnerDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinnerPage');
    console.log('detials', this.navParams.get('winnerDetails'));
    this.winnerDetails = this.navParams.get('winnerDetails');
  }

}
