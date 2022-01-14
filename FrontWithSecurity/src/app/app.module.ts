import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, 
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:5000/api'],
          sendAccessToken: true
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
