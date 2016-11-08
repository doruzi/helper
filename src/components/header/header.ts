import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { PostEditPage } from '../../pages/post-edit/post-edit';
import { SearchPage } from '../../pages/search/search';

@Component({
  selector: 'helper-header',
  template: `
        <ion-navbar>
            <!--
            <ion-buttons left>
                <button (click)="onClickHome()">
                    <ion-icon name="home"></ion-icon>
                </button>
            </ion-buttons>
            -->

            <ion-title>
                {{ appTitle }}
                {{ subTitle }}
            </ion-title>
            
            <ion-buttons right>
                <button ion-button (click)="onClickPost( )" *ngIf="!hideCreateButton"><ion-icon name="create"></ion-icon></button>
                <button ion-button (click)="onClickSearch( )"><ion-icon name="search"></ion-icon></button>
            </ion-buttons>

        </ion-navbar>
    `
})
export class HelperHeaderComponent {
  @Input() appTitle: string = "AppTitle";
  @Input() hideCreateButton: boolean;

  static initialized: boolean;
  public subTitle: string = '';
  constructor(
      private navCtrl: NavController,
      private events: Events,
  ) {
    this.initialize();
    // console.log('PageController:', PageController.page);
  }
  initialize() {

  }

  onClickPost( ) {
    console.log('HeaderComponent::onClickPost()');
    //PageController.push( 'PostEditPage', this );
    this.navCtrl.push( PostEditPage );
  }

  onClickSearch() {
    console.log('HeaderComponent::onClickSearch()');
    //PageController.push( 'SearchPage', this );
    this.navCtrl.push( SearchPage );
  }

}
