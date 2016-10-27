import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { Network } from 'ionic-native';
import { Language } from '../providers/language';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private language: Language) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.checkConnectivity();

    });


  }
  checkConnectivity(){
    Network.onConnect().subscribe(() => {
      this.language.load( code => {});
      console.log('Connection Online');
    });
    Network.onDisconnect().subscribe(() => {
      alert('Connection Offline'  );
    });
  }

}
