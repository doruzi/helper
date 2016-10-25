import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ForumCategoryPage } from '../pages/forum-category/forum-category';
import { PostListPage } from '../pages/post-list/post-list';
import { PostEditPage } from '../pages/post-edit/post-edit';
import { PolicyPage } from '../pages/policy/policy';
import { SettingPage } from '../pages/setting/setting';
import { SearchPage } from '../pages/search/search';
import {AgeCalculator} from "../pipes/age-calculator";

import { XModule } from '../xmodule/modules/core';
import {HelperHeaderComponent} from "../components/header/header";


@NgModule({
  declarations: [
    MyApp,
    HelperHeaderComponent,
    HomePage,
    ForumCategoryPage,
    PostListPage,
    PostEditPage,
    PolicyPage,
    SettingPage,
    SearchPage,
    AgeCalculator
  ],
  imports: [
    XModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelperHeaderComponent,
    HomePage,
    ForumCategoryPage,
    PostListPage,
    PostEditPage,
    PolicyPage,
    SettingPage,
    SearchPage
  ],
  providers: [ ]
})
export class AppModule {}
