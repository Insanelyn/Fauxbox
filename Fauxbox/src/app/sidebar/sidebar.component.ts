import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../data.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService,) { }
    fileList:FileList;
  ngOnInit() {
  }
  upLoadFile(event) {
    let url = decodeURI(this.router.url);
    if (url === "/") { url = ""; }
    this.fileList = event.target.files;
    const file = this.fileList[0];
    const urlPath = url + '/' + file.name;
    this.dataService.dbx.filesUpload({ path: urlPath, contents: file })
      .then(() => {
        this.dataService.getFiles(url);
      })
      .catch((error) => {
        console.log("error", error)
      });
  }
}
