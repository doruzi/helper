import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Xapi } from '../xmodule/providers/xapi';

/*
 Generated class for the Language provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Language {

  static lang: 'en' | 'ko' = 'ko';
  static code;
  constructor(public http: Http,
              private x: Xapi
  ) {
    console.log('Hello Language Provider');

  }

  load( callback ) {

    if ( Language.code ) callback ( Language.code );
    this.http.get( this.x.serverUrl + '?xapi=load.json&file=helper' )
        .map( e => e.json() )
        .subscribe( x => {
          console.log( x );
          if ( x.success ) {
            Language.code = x.data;
            callback( Language.code );
          }
        }, e => {
          console.log( 'load( callback ) : ' + e );
        });
  }
  setLanguage( lang ) {
    Language.lang = lang;
  }
  get ( code ) {
    if ( typeof Language.code[ code ] != 'undefined' && typeof Language.code[ code ][ Language.lang ] != 'undefined' )
      return Language.code[ code ][ Language.lang ];
    else return code;
  }
  
  checkCode(){
    console.log("checkCode " + Language.code);
    if ( typeof Language.code != 'undefined' && Language.code != 'null' && Language.code != '' ){
      return true;
    }
    else return false;
  }
}
