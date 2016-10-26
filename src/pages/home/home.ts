import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { NavController } from 'ionic-angular';

import { PostListPage } from '../post-list/post-list';
import { PostEditPage } from '../post-edit/post-edit';
import { PolicyPage } from '../policy/policy';
import { SettingPage } from '../setting/setting';
import { SearchPage } from "../search/search";
import { Xapi } from '../../xmodule/providers/xapi';

export interface PanelMenu {
  title: string;
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
    { title: 'HELPERS',     component: PostListPage, icon : 'person' },
    { title: 'SEARCH',   component: SearchPage, icon : 'search' },
    { title: 'POST',  component: PostEditPage, icon : 'create' },
    { title: 'POLICY',     component: PolicyPage, icon : 'paper' },
    { title: 'SETTING',   component: SettingPage, icon : 'options' }
  ];
  lang: 'en' | 'ko' = 'en';
  constructor(public navCtrl: NavController,
    private x: Xapi,
    private http: Http
  ) {
//    x.serverUrl = "http://work.org/wordpress/index.php";
    x.serverUrl = "http://www.philgo.net/index.php";
//    setTimeout( () => navCtrl.push( PostEditPage ), 600 );
//    setTimeout( () => navCtrl.push( PostListPage, {slug: 'housemaid'} ), 1000 );
//    setTimeout( () => navCtrl.push( PostEditPage, {post_ID: 431} ), 1000 );


    http.get( x.serverUrl + '?xapi=load.json&file=helper' )
      .map( e => e.json() )
      .subscribe( x => {
        console.log( x );


        this.appTitle = x.data.title[ this.lang ];
        this.titleCaption = x.data.titleCaption[ this.lang ];
        this.subtitleCaption = x.data.subtitleCaption[ this.lang ];
      });


  }

  openPage( page ) {
    this.navCtrl.push( page.component );
  }


}
