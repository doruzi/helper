import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PostEditService } from '../../xmodule/providers/post-edit-service';
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html'
})
export class PostEditPage {
  password: string = '';
  post_title: string = '';
  post_content: string = '';
  gender: 'M' | 'F' | '' = '';
  mobile: string = '';
  loader: boolean = false;
  post_ID: number;
  urlPhoto: string = "x-assets/img/anonymous.gif";
  photoId: number = 0;
  constructor(public navCtrl: NavController,
     private postEditService: PostEditService,
     private navParams: NavParams,
     private events: Events

  ) {
    events.subscribe('file-upload-success', x => this.onSuccessFileUpload(x[0]));
    this.post_ID = navParams.get('post_ID');
      if ( this.post_ID ) {
        postEditService.load( this.post_ID, p => {
          console.log(p);
          this.post_title = p.post_title;
          this.post_content = p.post_content;
          this.gender = p.meta.gender;
          this.mobile = p.meta.mobile;
          if ( p.images ) {
            this.urlPhoto = p.images[Object.keys( p.images ).pop()];
          }
        });
      }
  }


  onClickPost() {
    let post = {
      ID: this.post_ID,
      password: this.password,
      category: 'housemaid',
      post_title: this.post_title,
      mobile: this.mobile,
      gender: this.gender,
      fid: [ this.photoId ]
    };

    this.loader = true;
    this.postEditService.submit( post, res => {
      this.loader = false;
      console.log("onClickPost::callback(), ", res );
      // 
    }, err => {
      this.loader = false;
      console.log("err");
    });
  }

  onChangeFileBrowser( $event ) {
      this.postEditService.upload( $event.target.files );
  }

  // Displays image.
  // This method is called on file-upload-success event.
  private onSuccessFileUpload( file ) {
    console.log(file);
    this.photoId = file.id;
    this.urlPhoto = file.url ;
  }
}
