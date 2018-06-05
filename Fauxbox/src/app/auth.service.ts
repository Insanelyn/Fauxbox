import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
/*import {CanActivate} from "@angular/router";*/
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService/* implements CanActivate*/{

  private user =  null;

  constructor(private http: HttpClient, private router: Router) { }

 /* canActivate(): boolean{
    if(this.user !== null){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }*/

  login(credentials){
    const ob = this.http.post('/login', credentials);
    ob.subscribe((res: any)=> {
      if (res.token) {
        this.user = {id: 1}
      }
    });
    return ob;
  }

  logout(){
    this.user = null;
    this.router.navigate(['login']);
  }



  auth(){

  }
}
