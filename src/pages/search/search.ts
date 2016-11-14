import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostEditPage } from "../post-edit/post-edit";
import { Language } from "../../providers/language";
import { Post } from '../../fireframe2/post';
import 'rxjs/add/operator/debounceTime';



export interface SearchData {
  name: string;
  address: string;
  male: boolean;
  female: boolean;
  age?: {
    lower: number;
    upper: number;
  }
}

export interface AgeSearchRange {
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
  posts = [];

  data: SearchData = {
    name: '',
    address: '',
    male: false,
    female: false
  }

  appTitle: string = "Search Helper";
  text = {
    searchByGender: 'Search by Gender',
    searchByAge: 'Search by Age',
    searchByAddress: 'Search by Address',
    searchByName: 'Search by Name',
    searching: 'Searching',
    male: 'Male',
    female: 'Female',
    between: 'Between',
    and: 'And',
    like: 'like',
    personalInformation: 'Personal Information',
    name: 'Name',
    gender: 'Gender',
    age: 'Age',
    mobile: 'Mobile #',
    address: 'Address',
    more: 'More',
    less: 'Less',
    edit: 'Edit',
  }
  constructor( public navCtrl: NavController,
               private language: Language,
               private post: Post,

  ) {
    if( language.checkCode() ){
      this.appTitle = language.get('titleSearch');
      this.text.searchByGender = language.get('searchByGender');
      this.text.searchByAge = language.get('searchByAge');
      this.text.searchByAddress = language.get('searchByAddress');
      this.text.searchByName = language.get('searchByName');
      this.text.searching = language.get('searching');
      this.text.male = language.get('male');
      this.text.female = language.get('female');
      this.text.between = language.get('between');
      this.text.and = language.get('and');
      this.text.like = language.get('like');
      this.text.personalInformation = language.get('personalInformation');
      this.text.name = language.get('name');
      this.text.gender = language.get('gender');
      this.text.age = language.get('age');
      this.text.mobile = language.get('mobile');
      this.text.address = language.get('address');
      this.text.more = language.get('more');
      this.text.less = language.get('less');
      this.text.edit = language.get('edit');
    }
    this.search( );
  }

  showLoader() {
    this.searching = true;
  }
  hideLoader() {
    this.searching = false;
  }
  search( $event? ) {
    this.posts = [];
    this.showLoader();
    console.log("search()");
    this.post
      .set('numberOfPosts', 5)
      .search( snapValue =>{
      this.onSearchComplete( snapValue );
    }, e =>{
      console.log( e );
    });
  }
  onSearchComplete( res ) {
    console.log('onSearchComplete()');
    this.hideLoader();
    this.displayPosts( res );
  }
  showError(res) {
    console.log('onSearchComplete()', res);
  }

  displayPosts( data ) {
    console.log( 'success', data );
    for( let key of Object.keys(data).reverse() ) {
      this.posts.push ( {key: key, value: data[key]} );
    }
    console.log('displayPosts:: ' , this.posts);
  }

  onSelect(i){
    //console.log( this.moreButton[i] + " " + i );
    this.moreButton[i] = this.moreButton[i] == true ? false : true;
  }

  onClickEdit( post_ID ) {
    this.navCtrl.push( PostEditPage, { post_ID: post_ID });
  }
}
