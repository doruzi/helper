import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PostEditPage } from "../post-edit/post-edit";
import { Language } from "../../providers/language";
import { Post } from '../../fireframe2/post';
import * as _ from 'lodash';

@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  appTitle: string = "Helper List";
  slug: string;
  posts = [];
  moreButton = [];
  lastDisplayedKey: string = '';
  noMorePost: boolean = false;
  text = {
    personalInformation: 'Personal Information',
    name: 'Name',
    gender: 'Gender',
    age: 'Age',
    mobile: 'Mobile #',
    address: 'Address',
    more: 'More',
    less: 'Less',
    edit: 'Edit',
    delete: 'Delete',
  };
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private language: Language,
    private post: Post,
  ) {
    console.log( 'PostListPage::constructor()', navParams.data);
    this.slug = this.navParams.get( 'slug' );


    if( language.checkCode() ) {
      this.appTitle = language.get('titlePostList');
      this.text.personalInformation = language.get('personalInformation');
      this.text.name = language.get('name');
      this.text.gender = language.get('gender');
      this.text.age = language.get('age');
      this.text.mobile = language.get('mobile');
      this.text.address = language.get('address');
      this.text.more = language.get('more');
      this.text.less = language.get('less');
      this.text.edit = language.get('edit');
      this.text.delete = language.get('delete');
    }

    this.post.pagination_key = '';
    this.loadPosts();
  }


  loadPosts( infinite? ) {
      this.post
        .nextPage( data => {
          console.log('loadPoss: ', data);
          if ( infinite ) infinite.complete();
          if ( ! _.isEmpty(data) ) this.displayPosts( data );
          else {
            this.noMorePost = true;
            infinite.enable( false );
          }
        },
        e => {
          if ( infinite ) infinite.complete();
          console.log("fetch failed: ", e);
        });
  }
  displayPosts( data ) {
      for( let key of Object.keys(data).reverse() ) {
        this.posts.push ( {key: key, value: data[key]} );
      }
  }

  doInfinite( infiniteScroll ) {

    this.loadPosts( infiniteScroll );

  }


  onClickEdit( key ) {
    console.info('onClickEdit:: key' + key);
    this.navCtrl.pop();
    this.navCtrl.push( PostEditPage, { postKey: key });
  }

  onClickDelete( postKey, i ) {
    let prompt = this.alertCtrl.create({
      title: 'Delete',
      message: "Enter password of the post",
      inputs: [
        {
          name: 'password',
          placeholder: 'Input password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            console.log('Delete clicked');
            this.post
              .set('key', postKey )
              .delete( () => {
                this.promptAlert( 'SUCCESS', 'Your post has been deleted.' );
                this.posts.splice( i , 1 );
              }, e => {
                console.info('Delete Post:: with key ' + postKey );
              });
          }
        }
      ]
    });
    prompt.present();
  }

  promptAlert( title, message ) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewWillEnter() {
    console.log('PostList::ionViewWillEnter')
  }


}
