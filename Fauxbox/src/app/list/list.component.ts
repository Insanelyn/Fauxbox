import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from "../data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  files = [];
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(() =>{
      this.dataService.getFiles(this.router.url);
    });
    this.dataService.stream.subscribe((files: any) => {
      this.files = files;
      console.error('List:', files)
    });
  }
}
