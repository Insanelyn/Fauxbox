import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import {Router} from "@angular/router";
import {DataService} from "../data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router, private dataService: DataService) { }

  login(){
    this.auth.login(this.credentials)
      .subscribe(() => {
        this.router.navigate(['list'])
      });
  }

  testAPI(){
    this.dataService.testAPI()
  }
  ngOnInit() {

  }

}
