import { Component } from '@angular/core';
import { Platform, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { PostEditService } from '../../xmodule/providers/post-edit-service';
import { Xapi } from "../../xmodule/providers/xapi";
import { Camera, Transfer } from 'ionic-native';

export interface  PostEdit {
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
  post : PostEdit = <PostEdit> {
    category : 'housemaid'
  };

  urlPhoto: string = "x-assets/img/anonymous.gif";
  loader: boolean = false;
  post_ID: number;
  photoId: number = 0;


  browser: boolean = false;
  cordova: boolean = false;

    // cordova plugin file Transfer
  private fileTransfer: Transfer;
  constructor(public navCtrl: NavController,
              private postEditService: PostEditService,
              private navParams: NavParams,
              private events: Events,
              private x: Xapi,
              private alertCtrl: AlertController,
              platform: Platform

  ) {

    if ( platform.is('cordova') ) this.cordova = true;
    else this.browser = true;

    events.subscribe('file-upload-success', x => this.onSuccessFileUpload(x[0]));
    this.post_ID = navParams.get('post_ID');
    if ( this.post_ID ) {
      postEditService.load( this.post_ID, p => {
        console.log(p);
        this.post.ID = this.post_ID ;
        this.post.post_title = p.post_title;
        this.post.post_content = p.post_content;
        this.post.first_name = p.meta.first_name;
        this.post.middle_name = p.meta.middle_name;
        this.post.last_name = p.meta.last_name;
        this.post.gender = p.meta.gender;
        this.post.mobile = p.meta.mobile;
        this.post.address = p.meta.address;
        this.post.birthday = p.meta.birthday;
        if ( p.images ) {
          this.urlPhoto = p.images[Object.keys( p.images ).pop()];
        }
      });
    }
  }


  onClickPost() {
    this.loader = true;
    this.postEditService.submit( this.post, res => {
      this.loader = false;
      console.log("onClickPost::callback(), ", res );
      this.x.alert("SUCCESS", "Your post has been posted.");
      this.navCtrl.pop();
    }, err => {
      this.loader = false;
      console.log("err");
    });
  }

  onChangeFileBrowser( $event ) {
    this.postEditService.upload( $event.target.files );
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
    this.appTakePhoto( Camera.PictureSourceType.CAMERA);
  }

  onClickGalleryButton() {
    this.appTakePhoto( Camera.PictureSourceType.PHOTOLIBRARY );
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

    this.fileTransfer.upload( filepath, this.x.uploadUrl, options)
      .then( res => {
        console.log('success', res );
        let re; // result of json parse
        try {
          re = JSON.parse( res.response );
        }
        catch ( e ) {
          this.x.error("JSON parse error on fileTransfer.uploader()");
          return;
        }

        console.log( re );
        this.onSuccessFileUpload( re.data );

      },
      error => {
        console.log('error', error);
      });
  }

  /* @note this method is called on file upload success.
   *
   * @todo let mobile upload to call this method.
   */
  private onSuccessFileUpload( file ) {
    this.urlPhoto = file.url;
    this.post.fid = [file.id];
  }

}

