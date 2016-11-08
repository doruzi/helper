import { Component } from '@angular/core';
import { Platform, NavController, NavParams, Events, AlertController } from 'ionic-angular';

import { Language } from "../../providers/language";
import { Camera, Transfer } from 'ionic-native';

import { Post } from '../../fireframe2/post';


export interface  PostEdit {
    key : string;
    category: string;
    ID : number;
    post_title: string;
    post_content: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    mobile: string;
    birthday: string;
    address: string;
    gender: 'M' | 'F' | '';
    fid: Array<string>;
}


@Component({
    selector: 'page-post-edit',
    templateUrl: 'post-edit.html'
})
export class PostEditPage {
    data : PostEdit = <PostEdit> {
        category : 'housemaid'
    };

    urlPhoto: string = "x-assets/img/anonymous.gif";
    loader: boolean = false;
    post_ID: number;
    photoId: number = 0;

    browser: boolean = false;
    cordova: boolean = false;

    appTitle: string = "Post Edit";
    text = {
        fillInAllInfo: 'Fill in All Information',
        gender: 'Gender',
        selectGender: 'Select Gender',
        mobile: 'Mobile #',
        address: 'Address',
        more: 'More',
        less: 'Less',
        edit: 'Edit',
        delete: 'Delete',
        password: 'Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        middleName: 'Middle Name',
        birthday: 'Birthday',
        male: 'Male',
        female: 'Female',
        personalTitle: 'personalTitle',
        personalContent: 'personalContent',
        connectingToServer: 'Connecting to server...',
        submitPost: 'Submit Post'
    };

    // cordova plugin file Transfer
    private fileTransfer: Transfer;
    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private events: Events,
                private alertCtrl: AlertController,
                private language: Language,
                private post: Post,
                platform: Platform

    ) {
        if( language.checkCode() ) {
            this.appTitle = language.get('titlePostEdit');
            this.text.fillInAllInfo = language.get('fillInAllInfo');
            this.text.gender = language.get('gender');
            this.text.selectGender = language.get('selectGender');
            this.text.mobile = language.get('mobile');
            this.text.address = language.get('address');
            this.text.more = language.get('more');
            this.text.less = language.get('less');
            this.text.edit = language.get('edit');
            this.text.delete = language.get('delete');
            this.text.password = language.get('password');
            this.text.firstName = language.get('firstName');
            this.text.lastName = language.get('lastName');
            this.text.middleName = language.get('middleName');
            this.text.birthday = language.get('birthday');
            this.text.connectingToServer = language.get('connectingToServer');
            this.text.submitPost = language.get('submitPost');
            this.text.personalTitle = language.get('personalTitle');
            this.text.personalContent = language.get('personalContent');
        }
        if ( platform.is('cordova') ) this.cordova = true;
        else this.browser = true;

        events.subscribe('file-upload-success', x => this.onSuccessFileUpload(x[0]));
        this.post_ID = navParams.get('post_ID');
        if ( this.post_ID ) {

        }
/*
        let date = new Date;
        let stamp;
        for(let i = 0; i < 100; i++) {

          stamp = date.getTime();
          this.post
            .set('uid', stamp )
            .set('address', 'address ' + i)
            .set('birthday', (1988 - i)  + '-11-05')
            .set('category', 'housemaid')
            .set('first_name', 'first_name ' + i)
            .set('gender', 'M')
            .set('last_name', 'last_name ' + i)
            .set('middle_name', 'middle_name ' + i)
            .set('mobile', 'mobile ' + i)
            .set('password', '1111')
            .set('post_content', 'post_content ' + i)
            .set('post_title', 'post_title ' + i)
            .create( () => {
              this.loader = false;
              console.log( 'onclickPost::Success' + i );
            }, e => {
              this.loader = false;
              console.log( 'onclickPost::Failed' + e );
            });


        }

        */
    }


    onClickPost() {
        this.loader = true;
        this.post
            .sets( this.data )
            .create( () => {
                this.loader = false;
                let alert = this.alertCtrl.create({
                    title: 'SUCCESS',
                    subTitle: 'Your post has been posted.',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.pop();
                console.log( 'onclickPost::Success' );
            }, e => {
                this.loader = false;
                console.log( 'onclickPost::Failed' + e );
            });
    }

    onChangeFileBrowser( $event ) {
       // this.postEditService.upload( $event.target.files );
    }


    onClickPhoto() {
        if ( ! this.cordova ) return;


        let confirm = this.alertCtrl.create({
            title: 'PHOTO UPLOAD',
            message: 'Do you want to take photo? or choose photo from gallery?',
            cssClass: 'alert-primary-photo',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => this.onClickCameraButton()
                },
                {
                    text: 'Gallery',
                    handler: () => this.onClickGalleryButton()
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancel clicked');
                    }
                }
            ]
        });
        confirm.present();


    }


    onClickCameraButton() {
       // this.appTakePhoto( Camera.PictureSourceType.CAMERA);
    }

    onClickGalleryButton() {
      //  this.appTakePhoto( Camera.PictureSourceType.PHOTOLIBRARY );
    }

    appTakePhoto( type: number ) {
        let options = {
            sourceType: type,
            destinationType: Camera.DestinationType.NATIVE_URI,
            quality: 100
        };
        Camera.getPicture( options ).then((imageData) => {
            console.log( imageData );
            //this.urlPrimaryPhoto = imageData;
            this.appFileUpload( imageData );
        }, ( message ) => {
            console.log("Error: ", message);
        });
    }


    appFileUpload( filepath : string ) {
        console.log( 'appFileUpload()', filepath );
        this.fileTransfer = new Transfer();
        let options: any;
        options = {
            fileKey: 'file',
            fileName: 'name.jpg',
            headers: {}
        };


    }

    /* @note this method is called on file upload success.
     *
     * @todo let mobile upload to call this method.
     */
    private onSuccessFileUpload( file ) {
        this.urlPhoto = file.url;
        this.data.fid = [file.id];
    }


}

