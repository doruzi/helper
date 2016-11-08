import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostListPage } from '../pages/post-list/post-list';
import { PostEditPage } from '../pages/post-edit/post-edit';
import { PolicyPage } from '../pages/policy/policy';
import { SettingPage } from '../pages/setting/setting';
import { SearchPage } from '../pages/search/search';
import { AgeCalculator } from "../pipes/age-calculator";

import { HelperHeaderComponent } from "../components/header/header";
import { Language } from '../providers/language';

import { FireModule } from '../fireframe2/fire-module';



@NgModule({
  declarations: [
    MyApp,
    HelperHeaderComponent,
    HomePage,
    PostListPage,
    PostEditPage,
    PolicyPage,
    SettingPage,
    SearchPage,
    AgeCalculator,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FireModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelperHeaderComponent,
    HomePage,
    PostListPage,
    PostEditPage,
    PolicyPage,
    SettingPage,
    SearchPage
  ],
  providers: [ Language ]
})
export class AppModule {}
