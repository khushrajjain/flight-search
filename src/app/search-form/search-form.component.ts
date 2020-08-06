import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FlightSearchResultService } from '../flight-search-result.service';
import * as data from '../../assets/india-airports.json';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  dir:string =  "oneway";
  cities:any = (data as any).default;
  
  form: FormGroup;

  departure = new FormControl();
  arrival = new FormControl();
  Pass_count = new FormControl('1',
  {validators: [Validators.required, ]
  });
  pickerdep = new FormControl(new Date());
  pickerarr = new FormControl();
 
  filteredOptionsDep: Observable<any>;
  filteredOptionsArr: Observable<any>;

  
  
  constructor(public flightService:FlightSearchResultService) { 
 
  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
   });

   this.filteredOptionsDep = this.departure.valueChanges
      .pipe(
        startWith(''),
        map(city_name => city_name ? this._filteredOptions(city_name) : this.cities.slice())
      );
    
      this.filteredOptionsArr = this.arrival.valueChanges
      .pipe(
        startWith(''),
        map(city_name => city_name ? this._filteredOptions(city_name) : this.cities.slice())
      );

  }
   private _filteredOptions(value: string): any {
    const filterValue = value.toLowerCase();

    return this.cities.filter(cities => cities.city_name.toLowerCase().indexOf(filterValue) === 0);
  }
   
onSubmit(dir:string){
  // console.log(this.departure.value);
  // console.log(this.arrival.value);
  console.log(this.pickerdep.value);
  console.log(this.pickerarr.value);
  // console.log(this.Pass_count.value);
  // console.log(dir);
this.flightService.getSearchParam(
  this.departure.value,
  this.arrival.value,
  this.pickerdep.value,
  this.pickerarr.value,
  this.Pass_count.value,
  dir
  );


}
  

}
