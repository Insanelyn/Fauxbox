import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { RowComponent } from './row/row.component';
import { UploadComponent } from './upload/upload.component';
import { DetailsComponent } from './details/details.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AngularFontAwesomeModule } from "angular-font-awesome";

import {AuthService} from "./auth.service";
import {DataService} from "./data.service";
import {FirebaseService} from "./firebase.service";
import {UploadService} from "./upload.service";
import {Interceptor} from "./interceptor";

const appRoutes: Routes = [
  {path:'', canActivate:[AuthService], component: ListComponent},
  {path:'login', component: LoginComponent},
  {path:'**', canActivate:[AuthService], component: ListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RowComponent,
    UploadComponent,
    DetailsComponent,
    NavComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    DataService,
    FirebaseService,
    UploadService,

    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
