import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from "../data.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  files = [];
  paths = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(() =>{
      this.dataService.getFiles(this.router.url);
    });
    this.dataService.stream.subscribe((files: any) => {
      console.error(files);
      this.files = files;
      this.files.forEach(function (file) {
        if(file['.tag'] === 'file'){
          if(
              file.name.toLowerCase().endsWith('jpg') ||
              file.name.toLowerCase().endsWith('png') ||
              file.name.toLowerCase().endsWith('svg')){
              file.filetype = 'image';
            }else{
              file.filetype = 'text'
          }
        }
      });
    });
    this.activatedRoute.url.subscribe((path)=> {
      this.paths = this.getPaths()
    })
  }

  formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    let k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  timeStampFix(string){
    let str = string;
    let res = str.split('T').join(' ');
    res = res.split('Z').join(' ');
    return res;
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getPaths() {
    if (!this.router.url || this.router.url === '/') {
      return ['']
    }
    return this.router.url.split('/');
  /*  !url*/
  }
  getPathName(url) {
    if(!url) return 'Home';
    return decodeURI(url);
  }

  getPath(path){
    const index = this.paths.indexOf(path);
    const a = this.paths.slice(0, index+1).reduce((a, b) =>  `${a}/${b}`, '');
    return a;
  }

  fileClicked(item) {
    this.dataService.downloadFile(item);
  }

}
