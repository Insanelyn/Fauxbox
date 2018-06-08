import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //http://localhost:4200/login#access_token=CrNuQALkjhAAAAAAAAAAObiCDbWiIauBrH-c0KRx4Lu4Molxvvi-pr1siUTVGN98&token_type=bearer&uid=1178068784&account_id=dbid%3AAADbloCBHnwZvy_ptnI7lZn1ZkyK7MSMTFc
        this.activatedRoute.url.subscribe(() => {
          const currentUrl = this.router.url;
          if(currentUrl.indexOf('&') != -1){
            const params = currentUrl.split('&');
            const authTokenParams = params[0].split('=');
            const authToken = authTokenParams[1];
            localStorage.setItem('token', authToken);
            this.router.navigate(['list']);
          } else{
            this.router.navigate(['login']);
          }
    });
  }

  login(){
    this.auth.login()
  }
  logout(){

  }

}
