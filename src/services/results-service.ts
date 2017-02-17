import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';


@Injectable() export class ResultsService {
    constructor(private http: Http) { }
    public results: any;
    private apiKey: string = '&key=AIzaSyBMOF7wD0ePMimkRwUZVciyfGqft9yTDHY';

    getPlaces(latitude, longitude) {
        let location = latitude + ',' + longitude;
       //return this.http.get('http://localhost:3000/restaurants?location=' + location)
        return this.http.get('https://restaurant-random.herokuapp.com/restaurants?location=' + location)
            .map((response: Response) => {
                const results = response.json();
                return results;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getPositionZip(zipCode) {
        //return this.http.get('http://localhost:3000/zip-lookup?zip=' + zipCode)
        return this.http.get('https://restaurant-random.herokuapp.com/zip-lookup?zip=' + zipCode)
            .map((response: Response) => {
                const results = response.json().results;
                return results;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getPlaceDetails(place_id) {
        //return this.http.get('http://localhost:3000/restaurant-id?placeId=' + place_id)
        return this.http.get('https://restaurant-random.herokuapp.com/restaurant-id?placeId=' + place_id)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


    getMoreOptions(pageToken) {
        //return this.http.get('http://localhost:3000/page-token?pageToken=' + pageToken)
        return this.http.get('https://restaurant-random.herokuapp.com/page-token?pageToken=' + pageToken)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}