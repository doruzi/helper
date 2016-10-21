import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
/*
 import { LoginPage } from '../pages/login/login';
 import { RegisterPage } from '../pages/register/register';
 import { PasswordPage } from '../pages/password/password';
 import { ResignPage } from '../pages/resign/resign';
 */
import { ForumCategoryPage } from '../pages/forum-category/forum-category';
import { PostListPage } from '../pages/post-list/post-list';
import { PostEditPage } from '../pages/post-edit/post-edit';
import { PolicyPage } from '../pages/policy/policy';
import { SettingPage } from '../pages/setting/setting';
import { SearchPage } from '../pages/search/search';


import { XModule } from '../xmodule/modules/core';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    /*LoginPage,
     RegisterPage,
     PasswordPage,
     ResignPage,*/
    ForumCategoryPage,
    PostListPage,
    PostEditPage,
    PolicyPage,
    SettingPage,
    SearchPage
  ],
  imports: [
    XModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    /*LoginPage,
     RegisterPage,
     PasswordPage,
     ResignPage,*/
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
