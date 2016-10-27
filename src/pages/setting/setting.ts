import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Language } from "../../providers/language";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  static initialized: boolean = false;
  appTitle: string = "Settings";
  text = {
    selectYourLanguage: 'Select your Language',
    english: 'English',
    korean: 'Korean',
    chinese: 'Chinese',
  };
  constructor(private navCtrl: NavController,
              private language: Language,
  ) {
    this.appTitle = language.get('titleSettings');
    this.text.selectYourLanguage = language.get('selectYourLanguage');
    this.text.english = language.get('english');
    this.text.korean = language.get('korean');
    this.text.chinese = language.get('chinese');
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
    //this.language.setLanguage(ln);
    //Core.set( Core.code.language, ln, () => location.reload() );

  }


}
