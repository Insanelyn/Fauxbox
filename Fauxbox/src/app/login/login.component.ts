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
    //http://localhost:4200/login#access_token=CrNuQALkjhAAAAAAAAAAObiCDbWiIauBrH-c0KRx4Lu4Molxvvi-pr1siUTVGN98&token_type=bearer&uid=1178068784&account_id=dbid%3AAADbloCBHnwZvy_ptnI7lZn1ZkyK7MSMTFc
        this.activatedRoute.url.subscribe(() => {
          const currentUrl = this.router.url;
          if(currentUrl.indexOf('&') !== -1){
            const params = currentUrl.split('&');
            const authTokenParams = params[0].split('=');
            const authToken = authTokenParams[1];
            localStorage.setItem('token', authToken);
            this.router.navigate(['']);
          } else{
            this.router.navigate(['login']);
          }
    });
  }

  login(){
   this.authService.login();
  }
  logout(){

  }

}
