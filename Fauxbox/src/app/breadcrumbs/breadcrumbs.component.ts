import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class UploadComponent implements OnInit {

  paths = [];

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
  this.activatedRoute.url.subscribe((path)=> {
      this.paths = this.getPaths()
    })
  }

  getPaths() {
    if (!this.router.url || this.router.url === '/') {
      return ['']
    }
    return this.router.url.split('/');

  }
  getPathName(url) {
    if(!url) return 'Home';
    return decodeURI(url);
  }

  getPath(path){
    const index = this.paths.indexOf(path);
    const a = this.paths.slice(0, index+1).reduce((a, b) =>  `${a}/${b}`, '');
    return decodeURI(a);
  }


}
