import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  private languages = { en: false, ko: false, ch: false };

  static initialized: boolean = false;
  constructor(private navCtrl: NavController,
    ) {

  }
  initialize()/* : boolean*/ {
   /* app.title('setting.title', this);
    if ( SettingPage.initialized ) {
      console.log('SettingPage::constructor() : called again !');
      return true;
    }
    else {
      SettingPage.initialized = true;
      console.log('SettingPage::constructor() : initializing. Do preprocess and save it in static.');
      return false;
    }*/
  }
  translate() {
    

    //this.languages[ Core.language ] = true;

    // Core.db.get( Core.code.language )
    //   .then( (v) => {
    //     if ( v ) this.languages[ v ] = true;
    //   });

  }

  /**
   * @attention README#Coding Guide#Settings
   */
  onClickLanguage( ln: string ) {
    
    //Core.set( Core.code.language, ln, () => location.reload() );
    
  }
}
