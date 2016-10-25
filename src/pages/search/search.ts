import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Xapi } from "../../xmodule/providers/xapi";
import { Library as lib } from '../../xmodule/functions/library';
import 'rxjs/add/operator/debounceTime';


interface SearchData {
  name: string;
  address: string;
  male: boolean;
  female: boolean;
  age?: {
    lower: number;
    upper: number;
  }
}

interface AgeSearchRange {
  lower: number;
  upper: number;
}

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  name : string = '';
  address: string = '';
  searchByAge: AgeSearchRange = { lower: 18 , upper: 60 };
  ageRange:  AgeSearchRange = this.searchByAge;
  male: boolean = false;
  female: boolean = false;
  searching: boolean = false;
  moreButton = [];
  posts;

  private data: SearchData = {
    name: '',
    address: '',
    male: false,
    female: false
  }


  constructor( public navCtrl: NavController,
               private x: Xapi

  ) {
    this.search();
  }

  showAgeRange() {
    //console.log(this.searchByAge);
  }

  showLoader() {
    this.searching = true;
  }
  hideLoader() {
    this.searching = false;
  }
  search() {
    this.showLoader();
    console.log("search()");
    console.log("Age " + this.searchByAge.lower + " between " + this.searchByAge.upper  );

    console.log( this.data );

    let meta = [];
    if ( this.data.male || this.data.female ) {
      let item = [];
      item['relation'] = 'OR';
      if ( this.data.male ) {
        let subItem = [];
        subItem['key'] = 'gender';
        subItem['value'] = 'M';
        item.push( subItem );
      }
      if ( this.data.female ) {
        let subItem = [];
        subItem['key'] = 'gender';
        subItem['value'] = 'F';
        item.push( subItem );
      }
      meta.push( item );
    }
    if ( this.data.address ) {
      let item = [];
      item['key'] = 'address';
      item['value'] = this.data.address;
      item['compare'] = 'LIKE';
      meta.push( item );
    }
    if ( this.data.name ) {
      let item = [];
      let first_name = [];
      let middle_name = [];
      let last_name = [];
      item['relation'] = 'OR';

      first_name['value'] = this.data.name;
      first_name['compare'] = 'LIKE';
      first_name['key'] = 'first_name';
      item.push( first_name );

      middle_name['value'] = this.data.name;
      middle_name['compare'] = 'LIKE';
      middle_name['key'] = 'middle_name';
      item.push( middle_name );

      last_name['value'] = this.data.name;
      last_name['compare'] = 'LIKE';
      last_name['key'] = 'last_name';
      item.push( last_name );

      meta.push( item );
    }

    // Date minimum and maximum
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let minAge = (year - this.searchByAge.lower)  + "/" + month + "/" + day;
    let maxAge = (year - this.searchByAge.upper - 1)  + "/" + month + "/" + day;

    // DATE args minimum and maximum
    let item = [];
    item['key'] = 'birthday';
    item['value'] = {maxAge ,  minAge};
    item['type'] = 'date';
    item['compare'] = 'BETWEEN';
    meta.push( item );

    //End of Date args



    let q = ['args'];
    q['args'] = [];
    q['args']['meta_query'] = meta;
    let qs = lib.http_build_query( q );
    console.log(meta);
    console.log( qs );

    this.x.wp_query( qs , res => this.onSearchComplete(res), err => console.log( err ));
  }
  onSearchComplete( res ) {
    console.log('onSearchComplete()');
    this.hideLoader();
    if ( res.success ) this.posts = res.data.posts;
    else this.showError(res);
  }
  showError(res) {

  }

  onSelect(i){
    //console.log( this.moreButton[i] + " " + i );
    this.moreButton[i] = this.moreButton[i] == true ? false : true;
  }
}