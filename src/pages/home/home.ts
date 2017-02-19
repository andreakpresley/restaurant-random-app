import { ResultsPage } from './../results/results';
import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public zipCode: string;
  public location;

  constructor(public navCtrl: NavController) {
  }


  public getResults() {
    let data = {
      zipCode: this.zipCode
    }
    this.navCtrl.push(ResultsPage, data);
  }

  public getPosition() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.errorCallBack);
    // }
    Geolocation.getCurrentPosition().then((position) => {
 
      this.location = position.coords;
    let data = {location: this.location}
    this.navCtrl.push(ResultsPage, data)
    }, (err) => {
      console.log(err);
    });
  }

  private errorCallBack() {
    console.log('Blocked')
  }

  public setPosition(position) {
    this.location = position.coords;
    let data = {location: this.location}
    this.navCtrl.push(ResultsPage, data)
  }
}
