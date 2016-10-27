import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { PostListPage } from '../post-list/post-list';
import { PostEditPage } from '../post-edit/post-edit';
import { PolicyPage } from '../policy/policy';
import { SettingPage } from '../setting/setting';
import { SearchPage } from "../search/search";
import { Xapi } from '../../xmodule/providers/xapi';
import { Language } from '../../providers/language';


export interface PanelMenu {
  title: string;
  text: string;
  component: any;
  icon?:string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appTitle: string = "Helper App";
  titleCaption: string = "House Helpers";
  subtitleCaption: string = "Easy Fast Convinient";
  pages: Array<PanelMenu> = [
    { title: 'HELPERS', text: "Helpers",    component: PostListPage, icon : 'people' },
    { title: 'SEARCH',  text: "Search",  component: SearchPage, icon : 'search' },
    { title: 'POST',    text: "Post", component: PostEditPage, icon : 'create' },
    { title: 'POLICY',  text: "Policy",   component: PolicyPage, icon : 'paper' },
    { title: 'SETTING', text: "Setting",  component: SettingPage, icon : 'options' }
  ];

  constructor(public navCtrl: NavController,
              private x: Xapi,
              private language: Language,
              private platform: Platform
  ) {
//    x.serverUrl = "http://work.org/wordpress/index.php";
    x.serverUrl = "http://www.philgo.net/index.php";
//    setTimeout( () => navCtrl.push( PostEditPage ), 600 );
//    setTimeout( () => navCtrl.push( PostListPage, {slug: 'housemaid'} ), 1000 );
//    setTimeout( () => navCtrl.push( PostEditPage, {post_ID: 431} ), 1000 );


    this.language.setLanguage('en');

    platform.ready().then( x => {
      //
    });


      this.language.load( code => {
        this.appTitle = this.language.get( 'title' );
        this.titleCaption = this.language.get( 'titleCaption' );
        this.subtitleCaption = this.language.get( 'subtitleCaption' );
        this.pages.filter( e => e.title == 'HELPERS' ).pop().text = this.language.get( 'menuHelpers' );
        this.pages.filter( e => e.title == 'SEARCH' ).pop().text = this.language.get( 'menuSearch' );
        this.pages.filter( e => e.title == 'POST' ).pop().text = this.language.get( 'menuPost' );
        this.pages.filter( e => e.title == 'POLICY' ).pop().text = this.language.get( 'menuPolicy' );
        this.pages.filter( e => e.title == 'SETTING' ).pop().text = this.language.get( 'menuSettings' );
      });
      console.log('Connection Online');

  }





  openPage( page ) {
    this.navCtrl.push( page.component );
  }


}
