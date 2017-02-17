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
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
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
  private position;

  constructor(public navCtrl: NavController, public navParams: NavParams, private resultsService: ResultsService) { }

  ionViewDidLoad() {
    this.zipCode = this.navParams.get('zipCode');
    this.position = this.navParams.get('location');
    if(this.zipCode) {
      this.getPositionZip();
    } else if (this.position) {
      this.callGoogle(this.position.latitude, this.position.longitude);
    } else {
      console.log('I didnt get any data');
    }
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
        this.restaurants = results.results;
        this.pageToken = results.next_page_token;
        this.searching = false;
      });
  }

  public removeClicked(index) {
    this.restaurants[index].price_level = 6;//This works because I have a filter on the price
    //this.restaurants.splice(index, 1); //I want to use this but it won't show the animation
  }

    public pickWinner() {
      //this is because I am have to use the trick in removeClicked to get the animation to work
      this.restaurants = this.restaurants.filter(restaurant => {
        if(restaurant.price_level <= this.price || !restaurant.price_level) {
          return restaurant;
        }
      });

      let winner = this.restaurants[Math.floor(Math.random() * this.restaurants.length)];
      let winnerData = {};

      if(winner){
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
      } else {
        console.log('there is nothing to see here');
      }
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
