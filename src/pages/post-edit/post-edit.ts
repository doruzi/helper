import { Component } from '@angular/core';
import { Platform, NavController, NavParams, Events, AlertController } from 'ionic-angular';

import { Language } from "../../providers/language";
import { Camera } from 'ionic-native';

import { Post } from '../../fireframe2/post';
import { Data, FILE_UPLOAD } from '../../fireframe2/data';


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
    urlPhoto?: string;
    refPhoto?: string;
}


@Component({
    selector: 'page-post-edit',
    templateUrl: 'post-edit.html'
})
export class PostEditPage {
    data : PostEdit = <PostEdit> {
        category : 'housemaid'
    };

    urlPhoto: string = "assets/img/photo.png";
    loader: boolean = false;
    postKey: string;
    photoId: number = 0;

    result = null;
    progress = null;
    error = null;
    file_progress = null;
    position = 0;


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
    //private fileTransfer: Transfer;
    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private events: Events,
                private alertCtrl: AlertController,
                private language: Language,
                private post: Post,
                platform: Platform,
                private file: Data

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

        this.postKey = navParams.get('postKey');
      console.info('navParams:: ' , this.postKey);

        if ( this.postKey ) {
          console.log("PostEditPage:: post edit key=" + this.postKey);
          this.post
            .set('key', this.postKey)
            .get( snapValue => {
              if( snapValue ) {
                console.info('snapValue:: ', snapValue);
                this.data.key = this.postKey ;
                this.data.post_title = snapValue.post_title;
                this.data.post_content = snapValue.post_content;
                this.data.first_name = snapValue.first_name;
                this.data.middle_name = snapValue.middle_name;
                this.data.last_name = snapValue.last_name;
                this.data.gender = snapValue.gender;
                this.data.mobile = snapValue.mobile;
                this.data.address = snapValue.address;
                this.data.birthday = snapValue.birthday;
                this.data.urlPhoto = snapValue.urlPhoto;
                this.data.refPhoto = snapValue.refPhoto;
                this.urlPhoto = this.data.urlPhoto;
              }else {
                console.log('Key Doesnt Exist');
              }

            },e =>{
              console.info('Post get() fail on key:' + this.postKey + ', Error:' + e);
            });
        }


        this.post.path = 'helper/posts';
        let date = new Date;
        let stamp;
        for(let i = 1; i <= 50; i++) {

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
            })

        }


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


    onFileUploaded( url, ref ) {
        this.file_progress = false;
        this.urlPhoto = url;
        this.data.urlPhoto = url;
        this.data.refPhoto = ref;
    }
    onChangeFile(event) {
        let file = event.target.files[0];
        if ( file === void 0 ) return;
        this.file_progress = true;
        let ref = 'user-primary-photo/' + Date.now() + '/' + file.name;
        this.file.upload( { file: file, ref: ref }, uploaded => {
            this.onFileUploaded( uploaded.url, uploaded.ref );
        },
        e => {
            this.file_progress = false;
            alert(e);
        },
        percent => {
            this.position = percent;
        } );
    }

    onClickDeletePhoto( ref ) {
        this.file.delete( ref, () => {
            this.urlPhoto = null;
            this.data.urlPhoto = null;
            this.data.refPhoto = null;
        }, e => {
            alert("FILE DELETE ERROR: " + e);
        } );
    }

  onClickPhoto() {
    if ( ! this.cordova ) return;
    console.log('onClickPhoto()');
    let confirm = this.alertCtrl.create({
      title: 'PHOTO UPLOAD',
      message: 'Do you want to take photo? or choose photo from gallery?',
      cssClass: 'alert-camera-selection',
      buttons: [
        {
          text: 'Camera',
          handler: () => this.cameraTakePhoto( Camera.PictureSourceType.CAMERA )
        },
        {
          text: 'Gallery',
          handler: () => this.cameraTakePhoto( Camera.PictureSourceType.PHOTOLIBRARY )
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

  cameraTakePhoto( type: number ) {
    console.log('cameraTakePhoto()');
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: type,
      encodingType: Camera.EncodingType.JPEG,
      quality: 100
    };

    Camera.getPicture(options).then((imageData) => {
      this.file_progress = true;
      let ref = 'user-primary-photo/' + Date.now() + '/' + 'primary-photo.jpg';
      let data : FILE_UPLOAD = {
        file : {
          name: 'primary-photo.jpg',
          type: 'image/jpeg'
        },
        ref: ref,
        base64: imageData
      }
      this.file.upload( data, uploaded => {
          this.onFileUploaded( uploaded.url, uploaded.ref );
        },
        e => {
          this.file_progress = true;
          alert( e );
        },
        percent => {

        } );
    }, (err) => { alert(err); });

  }


}

