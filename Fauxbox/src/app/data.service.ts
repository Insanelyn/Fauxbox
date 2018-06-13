import { Injectable } from '@angular/core';
import "isomorphic-fetch";
import {BehaviorSubject, Observable} from 'rxjs';
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  files = [];
  stream = null;
  dbx;
  token;
  constructor(private domSanitizer: DomSanitizer) {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
    const Dropbox = require('dropbox').Dropbox;
    this.stream = new BehaviorSubject(this.files);
    this.dbx = new Dropbox({ accessToken: this.token});
    // Nya instansen som visar DIN dropbox
  }

  getFiles(path): Observable<any> {
    if (path === "/") {
      path = "";
    }
    // Decode for special characters
    this.dbx.filesListFolder({path: decodeURI(path)})
      .then((response) => {
        this.stream.next(response.entries);
        Promise.all(response.entries.map((entry) => {
          if(
            // Promises- waits until everything is loaded
            entry.name.toLowerCase().endsWith('jpg') ||
            entry.name.toLowerCase().endsWith('png') ||
            entry.name.toLowerCase().endsWith('svg')){
              return this.dbx.filesGetThumbnail({ path: entry.path_lower })
                .then((image) =>{
                  entry.thumbnail = URL.createObjectURL(image.fileBlob);
                  return entry; // Creates thumbnail when needed, is it an image if not it returns without
                });
          }else{
              return Promise.resolve(entry);
          }
        }))
          .then((entries) =>{
            this.stream.next(entries);
          });
        // Returns the array the way it should be, with and without thumbnails
      })
      .catch(function(error) {
        console.error(error);
      });
    return this.stream;
  }
  // Runs Dropbox's download function, parameter = path
  downloadFile(file) {
    this.dbx.filesDownload({path: file})
      .then((data) => {
        const bloburl = URL.createObjectURL((<any>data).fileBlob);
        this.domSanitizer.bypassSecurityTrustUrl(bloburl);
        const fileurl = document.createElement('a'); // Creates a-tag
        fileurl.setAttribute('href', bloburl); // what the a-tag should show
        fileurl.setAttribute('download', data.name); // Gives download same name
        fileurl.click();


      })
      .catch((error_message) => {
        console.error(error_message);
      });
  }

}
