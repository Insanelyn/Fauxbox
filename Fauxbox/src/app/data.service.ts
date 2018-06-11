import { Injectable } from '@angular/core';
import "isomorphic-fetch";
import {BehaviorSubject, Observable} from 'rxjs';


/*const { Dropbox } = require('dropbox');*/

@Injectable({
  providedIn: 'root'
})

export class DataService {
  files = [];
  stream = null;
  dbx;
  token;
  constructor() {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
    const Dropbox = require('dropbox').Dropbox;
    this.stream = new BehaviorSubject(this.files);
    console.log('DATA FILES: ' ,this.stream);
    this.dbx = new Dropbox({ accessToken: this.token});
    console.error('Dbx:', this.token);
  }

  getFiles(path): Observable<any> {
    if (path === "/") {
      path = "";
    }
    this.dbx.filesListFolder({path: path})
      .then((response) => {
        this.stream.next(response.entries);
        console.log(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
    return this.stream;
  }
}


/* let Dropbox = require('dropbox').Dropbox;
  let dbx = new Dropbox({ accessToken: localStorage.getItem('token') });
  dbx.filesListFolder({path: ''})
    .then(function(response) {
      this.stream.next(response.entries);
    })
    .catch(function(error) {
      console.log(error);
    });*/


    /*https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=783ptecvulgyh5q&redirect_uri=http://localhost:4200/list*/
    /*
      const temp = window.location.href;
      const tempRegExp = /access_token=(.*)&token_type/;
      const token = temp.match(tempRegExp)[1];
         let dbx = new Dropbox({ accessToken: token });

      this.dbx.filesListFolder({path: ''}) /

      let test = .display_path.split('/');

      '', 'Folder1', 'Folder2' (pop)

      function getFiles(argForPath)

      // Stream behavioursubject

      constructor(activatedRoute: ActivatedRoute)

     ngOnInit(){
     this.activatedRoute.url.subscribe(() => {
      const currentUrl = this.router.url;
      if(currentUrl.indexOf('&') != -1){
      const params = currentUrl.split('&');
      const authTokenParams = params.split('=');
      const authToken = authTokenParams[1];

      localStorage.setItem('token',authToken);
      this.router.navigate(['/filelist']);
        } else{
          this.router.navigate(['login]);
          }
       });
      }
      getFiles(path){
      const authToken = localStorage.getItem('token');

      const options = {
          'headers': new HttpHeaders({
            'Authorization': authToken
            })
        };
        return this.http.get('/files?path'+path, options);
      }


      ngOnInit(){
      this.activatedRoute.url.subscribe(() => {
      this.dropBoxService.getFiles(this.router.url);
      })
      }
     */

  // #### THIS IS FOR THE DROPBOX API, 'DOCUMENTATION': https://www.dropbox.com/developers/documentation/javascript#tutorial ####

 /* require('isomorphic-fetch'); // or another library of choice.*/

