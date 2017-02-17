import { WinnerPage } from './../winner/winner';
import { ResultsService } from './../../services/results-service';
import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  Input
} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Results page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
/*  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('* => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => *', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]*/
    animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ]
})
export class ResultsPage {
  @Input() isVisible : boolean = true;

  public zipCode;
  public location: string = '';
  public restaurants;
  public pageToken;
  public searching: boolean = true;
  public price: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, private resultsService: ResultsService) { }

  ionViewDidLoad() {
    this.zipCode = this.navParams.get('zipCode');
    this.getPositionZip()
  }

  public getPositionZip() {
    this.resultsService.getPositionZip(this.zipCode)
      .subscribe(
      (results) => {
        this.location = results["0"].formatted_address;
        this.callGoogle(results["0"].geometry.location.lat, results["0"].geometry.location.lng)
      });
  }

  public callGoogle(latitude, longitude) {
    this.resultsService.getPlaces(latitude, longitude)
      .subscribe(
      (results) => {
        console.log(results);
        this.restaurants = results.results;
        this.pageToken = results.next_page_token;
        this.searching = false;
      });
  }

  public removeClicked(index) {
    this.restaurants.splice(index, 1);
  }

    public pickWinner() {
    let winner = this.restaurants[Math.floor(Math.random() * this.restaurants.length)];
    let winnerData = {};
    this.resultsService.getPlaceDetails(winner.place_id)
      .subscribe(
      (results) => {

        winnerData = {
          winnerDetails: results.result,
          iframeUrl: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyANT04afnMcjupy751eK7oR1ZskEyKGdcU&q=place_id:' + results.result.place_id
        }
        this.restaurants = [];
        this.navCtrl.push(WinnerPage, winnerData);
      });
  }

  public loadMoreOptions() {
    this.resultsService.getMoreOptions(this.pageToken)
      .subscribe(
      (response) => {
        this.restaurants = this.restaurants.concat(response.results);
        this.pageToken = response.next_page_token;
      }
      )
  }

}
