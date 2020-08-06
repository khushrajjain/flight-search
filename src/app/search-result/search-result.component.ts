import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FlightSearchResultService } from '../flight-search-result.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    filtered: Observable<any>;
    flightListSub: Subscription;
    flightList: any[] = [];

    constructor(public flightService: FlightSearchResultService) { }

    ngOnInit(): void {

        this.flightListSub = this.flightService.updateSearchParam().subscribe
            ((flights) => {
                this.flightList = flights;
            })
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    }
}
