import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
        this.activatedRoute.url.subscribe(() => {
          const currentUrl = this.router.url;
          if(currentUrl.indexOf('&') !== -1){
            const params = currentUrl.split('&');
            const authTokenParams = params[0].split('=');
            const authToken = authTokenParams[1];
            localStorage.setItem('token', authToken);
            if(localStorage.getItem('token') === 'The+user+chose+not+to+give+your+app+access+to+their+Dropbox+account.'){
              localStorage.clear();
            }
            this.router.navigate(['']);
          } else{
            this.router.navigate(['login']);
          }
    });
  }

  login(){
   this.authService.login();
  }
}
