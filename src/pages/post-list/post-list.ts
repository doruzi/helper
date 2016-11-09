import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PostEditPage } from "../post-edit/post-edit";
import { Language } from "../../providers/language";
import { Post } from '../../fireframe2/post';

@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  appTitle: string = "Helper List";
  slug: string;
  page: number = 1;
  posts = [];
  moreButton = [];
  lastDisplayedKey: string = '';
  endPost: boolean = false;
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


    this.loadPosts();
  }


  loadPosts( finished? ) {
    this.post
      .set('lastKey', this.lastDisplayedKey )
      .set('limitToLast', '11' )
      .fetch( snapshot =>{
        if(snapshot) this.displayPosts( snapshot );
        if ( finished ) finished();
      }, e=>{
        if ( finished ) finished();
        console.info(e);
      })
  }

  displayPosts( data ) {

    // if( this.lastDisplayedKey == Object.keys(data).shift() ) return;

    // save last key
    this.lastDisplayedKey = Object.keys(data).shift();
    console.log('displayPosts data:: ', data);

    let temp = [];
    //reversing retrieve data
    for ( let key in data ) {
      temp.unshift( {'key': key , 'value': data[key]});
    }

    console.log('temp:: ', temp);
    //adding arranged data to posts container
    for ( let key in temp ) {
      this.posts.push(temp[key]);
    }

    //check if it reached the end post
    if(Object.keys(temp).length <= 10 ){
      let alert = this.alertCtrl.create({
        title: 'No More Post',
        subTitle: 'No More Post to Display...',
        buttons: ['OK']
      });
      alert.present();
      if(this.endPost) this.posts.pop();
      this.endPost = true;
    }
    else {
      this.posts.pop();
    }

    console.log('posts:: ', this.posts);

  }

  doInfinite( infiniteScroll ) {

    this.loadPosts( () => {
      infiniteScroll.complete();
    });

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
