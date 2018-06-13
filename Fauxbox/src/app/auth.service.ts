import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

 canActivate(): boolean{
    if(localStorage.getItem('token') !== null){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }



login(){
    const authUrl = 'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=783ptecvulgyh5q&redirect_uri=http://localhost:4200/login';
    return window.location.href = authUrl;
  }
  // Navigates user to login

  logout(){
    localStorage.removeItem('token'); // Removes your token but changes remain
    this.router.navigate(['login']);

  }
}
