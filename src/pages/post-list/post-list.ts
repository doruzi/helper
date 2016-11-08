import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PostEditPage } from "../post-edit/post-edit";
import { Language } from "../../providers/language";


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
        private language: Language
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

    }

    displayPosts( data ) {
        console.log( 'success', data );
        for ( let post of data ) {
            if ( post.images ) {
                post.image = post.images[ Object.keys( post.images ).pop() ];
                delete post.images;
            }
            this.posts.push( post );
        }
    }


    doInfinite( infiniteScroll ) {

        this.loadPosts( () => {
            infiniteScroll.complete();
        });

    }


    onClickEdit( post_ID ) {
        this.navCtrl.pop();
        this.navCtrl.push( PostEditPage, { post_ID: post_ID });
    }

    onClickDelete( post_ID, i ) {
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

                    }
                }
            ]
        });
        prompt.present();
    }


    ionViewWillEnter() {
        console.log('PostList::ionViewWillEnter')
    }


}
