import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PostEditService } from '../../xmodule/providers/post-edit-service';

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
        this.post.ID = this.post_ID ;
        this.post.post_title = p.post_title;
        this.post.post_content = p.post_content;
        this.post.first_name = p.meta.first_name;
        this.post.middle_name = p.meta.middle_name;
        this.post.last_name = p.meta.last_name;
        this.post.gender = p.meta.gender;
        this.post.mobile = p.meta.mobile;
        this.post.address = p.meta.address;
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
    this.post.fid = [file.id];
    this.urlPhoto = file.url ;
  }
}
