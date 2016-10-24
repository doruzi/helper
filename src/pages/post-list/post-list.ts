import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Xapi } from "../../xmodule/providers/xapi";
import * as xi from "../../xmodule/interfaces/xapi";
import { PostEditPage } from "../post-edit/post-edit";

@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  slug: string;
  page: number = 1;
  posts = [];
  constructor(
      public navCtrl: NavController,
      private navParams: NavParams,
      private x: Xapi
  ) {
    console.log( 'PostListPage::constructor()', navParams.data);
    this.slug = this.navParams.get( 'slug' );


    this.loadPosts();
  }


  loadPosts( finished? ) {
    let arg : xi.PostQuery = xi.postQuery;
        arg.category_name = this.slug;
        arg.paged = this.page ++;
        arg.per_page = 15;
        this.x.get_posts( arg, (res: xi.PostQueryResponse) => {
            if ( res.success ) {
                if ( res.data && res.data.length ) {
                    this.displayPosts( res.data );
                }
                else {
                    console.log('No more posts');
                }
            }
            else {
                if ( res.data ) alert( res.data );
                else alert("Error on post list");
            }
            if ( finished ) finished();
        },
        e => {
            if ( finished ) finished();
        } );
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
    this.navCtrl.push( PostEditPage, { post_ID: post_ID });
  }
  

}
