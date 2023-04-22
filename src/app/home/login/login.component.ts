import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResponseAuthentication } from 'src/app/authentication/authentication-response';
import { TokenService } from 'src/app/authentication/token/token.service';
import { ProfileService } from 'src/app/authentication/profile/profile.service';
import { Profile } from 'src/app/authentication/profile/profile';

const API = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email!: string;
  public password!: string;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService,
    private profileService: ProfileService
  ) {}

  login() {
    try {
      this.authenticationService.authenticate(this.email, this.password)
      .subscribe((res) => {
        const authResponse = res.body as ResponseAuthentication;

        this.tokenService.saveToLocalStorage('token', authResponse.token);
        this.profileService.getProfile(authResponse.profileId, authResponse.token)
        .subscribe((profile: Profile) => {

          this.profileService.saveProfile(profile);
          this.router.navigate(['account']);

        });
      });

    } catch (err) {
      console.log(err);
    }
  }
}
