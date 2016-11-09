import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PostListPage } from '../post-list/post-list';
import { PostEditPage } from '../post-edit/post-edit';
import { PolicyPage } from '../policy/policy';
import { SettingPage } from '../setting/setting';
import { SearchPage } from "../search/search";
import { Language } from '../../providers/language';
import { Post } from '../../fireframe2/post';
import { Category } from '../../fireframe2/category';

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
  subtitleCaption: string = "Easy Fast Convenient";
  pages: Array<PanelMenu> = [
    { title: 'HELPERS', text: "Helpers",    component: PostListPage, icon : 'people' },
    { title: 'SEARCH',  text: "Search",  component: SearchPage, icon : 'search' },
    { title: 'POST',    text: "Post", component: PostEditPage, icon : 'create' },
    { title: 'POLICY',  text: "Policy",   component: PolicyPage, icon : 'paper' },
    { title: 'SETTING', text: "Setting",  component: SettingPage, icon : 'options' }
  ];

  constructor(public navCtrl: NavController,
              private language: Language,
              private post: Post,
              private category: Category
  ) {

    this.category.path = 'category-helper'
    this.post.path = 'post-helper';

    this.category
      .set('key',         'housemaid')
      .set('name',        'Housemaid')
      .set('description', 'This is the category for house helper..')
      .create( () => {},
        e =>
          console.log(e)
      );

//    x.serverUrl = "http://work.org/wordpress/index.php";
//    x.serverUrl = "http://www.philgo.net/index.php";
//    navCtrl.push( PostEditPage );
    navCtrl.push( PostListPage );
//    setTimeout( () => navCtrl.push( PostEditPage, {post_ID: 431} ), 1000 );


    this.language.setLanguage('en');

    if( language.checkCode ){
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
    }
  }





  openPage( page ) {
    this.navCtrl.push( page.component );
  }


}
