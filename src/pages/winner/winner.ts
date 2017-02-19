import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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
  public iframeUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinnerPage');
    this.winnerDetails = this.navParams.get('winnerDetails');
    this.iframeUrl = this.navParams.get('iframeUrl');
    //this.viewCtrl.setBackButtonText('Cancel');
    this.viewCtrl.showBackButton(false);
    // this.navCtrl.setRoot(HomePage);
  }
  public goBackHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
