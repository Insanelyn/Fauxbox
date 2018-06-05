import { Injectable } from '@angular/core';
import "isomorphic-fetch";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  hardToken = 'CrNuQALkjhAAAAAAAAAAF5rzM-aE2myye61abkEIJWYkLPtZuYFA887kA2-fHdja';

  constructor() {
    let Dropbox = require('dropbox').Dropbox;
    let dbx = new Dropbox({ accessToken: this.hardToken });
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  testAPI(){
    /*https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=783ptecvulgyh5q&redirect_uri=http://localhost:4200*/

    let token;
    let url = 'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=783ptecvulgyh5q&redirect_uri=http://localhost:4200/list';
    window.location.href = url;
  }

  // #### THIS IS FOR THE DROPBOX API, 'DOCUMENTATION': https://www.dropbox.com/developers/documentation/javascript#tutorial ####

 /* require('isomorphic-fetch'); // or another library of choice.*/

}
