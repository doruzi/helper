import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { ForumCategoryPage } from '../forum-category/forum-category';
import { PostListPage } from '../post-list/post-list';
import { PostEditPage } from '../post-edit/post-edit';
import { PolicyPage } from '../policy/policy';
import { SettingPage } from '../setting/setting';
import { SearchPage } from "../search/search";

interface PanelMenu {
  title: string;
  component: any;
  icon?:string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<PanelMenu> = [
    { title: 'FORUM',     component: PostListPage, icon : 'chatboxes' },
    { title: 'POST',  component: PostEditPage, icon : 'create' },
    { title: 'POLICY',     component: PolicyPage, icon : 'paper' },
    { title: 'SEARCH',   component: SearchPage, icon : 'search' },
    { title: 'SETTING',   component: SettingPage, icon : 'options' }
  ];
  constructor(public navCtrl: NavController) {

  }

  openPage( page ) {
    this.navCtrl.push( page.component );
  }


}
