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
  }

  getFiles(path): Observable<any> {
    if (path === "/") {
      path = "";
    }
    this.dbx.filesListFolder({path: decodeURI(path)})
      .then((response) => {
        this.stream.next(response.entries);
        Promise.all(response.entries.map((entry) => {
          if(
            entry.name.toLowerCase().endsWith('jpg') ||
            entry.name.toLowerCase().endsWith('png') ||
            entry.name.toLowerCase().endsWith('svg')){
              return this.dbx.filesGetThumbnail({ path: entry.path_lower })
                .then((image) =>{
                  entry.thumbnail = URL.createObjectURL(image.fileBlob);
                  return entry;
                });
          }else{
              return Promise.resolve(entry);
          }
        }))
          .then((entries) =>{
            this.stream.next(entries);
          });
      })
      .catch(function(error) {
        console.error(error);
      });
    return this.stream;
  }
  downloadFile(file) {
    console.log(file);
    this.dbx.filesDownload({path: file})
      .then((data) => {
        console.log(data);
        const bloburl = URL.createObjectURL((<any>data).fileBlob);
        this.domSanitizer.bypassSecurityTrustUrl(bloburl);
        const fileurl = document.createElement('a');
        fileurl.setAttribute('href', bloburl);
        fileurl.setAttribute('download', data.name);
        fileurl.click();

// this.domSanitizer.bypassSecurityTrustUrl(url);
      })
      .catch((error_message) => {
        console.error(error_message);
      });
  }

}
