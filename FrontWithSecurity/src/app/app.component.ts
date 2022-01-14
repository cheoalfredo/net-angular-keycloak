import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  auth: boolean = false
  userName : string = ''

  constructor(private oauthSvc: OAuthService, private router: Router, private client: HttpClient){
    this.oauthSvc.configure(this.authConfig);
    this.oauthSvc.setupAutomaticSilentRefresh();
    const url = "http://localhost:8080/auth/realms/iam/.well-known/openid-configuration";
    this.oauthSvc.loadDiscoveryDocument(url).then(() => {      
      this.oauthSvc.tryLogin({}).then(x => {
        if (this.oauthSvc.hasValidAccessToken()){
          this.auth = true;
          console.log(this.auth);
          const data = jwt_decode<any>(this.oauthSvc.getIdToken());
          this.userName = data["name"];         
          this.router.navigate(['/userinfo']) ;
        }
      });

    });
    
  }

  ngOnInit(): void {
   
  }

  public login() {
    this.oauthSvc.initLoginFlow()
  }
  
  public logoff() {
    this.oauthSvc.logOut();
  }

  hitBackend(): void {
    this.client.get("http://localhost:5000/api/numero").subscribe({
      next: (data) => { alert(data) },
      error: () => {alert("did not work")}
    })
  }

  title = 'FrontWithSecurity';

  authConfig: AuthConfig = {    
    requireHttps: false,
    issuer: 'http://localhost:8080/auth/realms/iam',
    redirectUri: window.location.origin,
    clientId: 'frontend',
    scope: 'basic_app',
    responseType: 'code',   
    disableAtHashCheck: true,
    showDebugInformation: true
  }

  
  
}
