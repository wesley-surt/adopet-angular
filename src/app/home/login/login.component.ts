import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResponseAuthentication } from 'src/app/authentication/response-authentication';
import { TokenService } from 'src/app/entities/token/token.service';
import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Profile } from 'src/app/entities/profile/profile';
import { Subscription } from 'rxjs';

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
    private profileService: ProfileService,
    private authSubscription: Subscription,
    private profileSubscription: Subscription,
  ) {}

  login() {
    try {
      this.authSubscription = this.authenticationService.authenticate(this.email, this.password)
      .subscribe((res) => {
        const authResponse = res.body as ResponseAuthentication;

        this.tokenService.saveToLocalStorage('token', authResponse.token);
        this.profileSubscription = this.profileService.getProfile(authResponse.profileId, authResponse.token)
        .subscribe((profile: Profile) => {

          this.profileService.saveProfile(profile);
          this.router.navigate(['account']);

        });
      });

      this.authSubscription.unsubscribe();
      this.profileSubscription.unsubscribe();

    } catch (err) {
      console.log(err);
    }
  }
}
