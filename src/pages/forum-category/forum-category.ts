import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostListPage } from '../post-list/post-list';
/*
 Generated class for the ForumCategory page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-forum-category',
  templateUrl: 'forum-category.html'
})
export class ForumCategoryPage {

  constructor(
    public navCtrl: NavController,
  ) {

  }

  ionViewDidLoad() {
    console.log('Hello ForumCategory Page');
    // @test
    this.navCtrl.push( PostListPage, { slug: 'housemaid' });
  }

  onOpen( slug ) {
    console.log("ForumCategoryPage::onOpen()", slug);
    this.navCtrl.push ( PostListPage, { slug: slug });
  }
}
