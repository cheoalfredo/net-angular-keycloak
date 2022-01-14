import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userData: any;
  keys : any;

  constructor(private oauthSvc: OAuthService) { }

  ngOnInit(): void {
    this.userData = jwt_decode<any>(this.oauthSvc.getIdToken());    
    this.keys = Object.keys(this.userData);
  }
}
