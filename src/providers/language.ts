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

  lang: 'en' | 'ko' = 'en';
  code;
  constructor(public http: Http,
    private x: Xapi
  ) {
    console.log('Hello Language Provider');
  }

  load( callback ) {
    
    this.http.get( this.x.serverUrl + '?xapi=load.json&file=helper' )
      .map( e => e.json() )
      .subscribe( x => {
        console.log( x );
        this.code = x.data;
        callback( this.code );
      });
  }
  setLanguage( lang ) {
    this.lang = lang;
  }
  get ( code ) {
    return this.code[ code ][ this.lang ];
  }
}
