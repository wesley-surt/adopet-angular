import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResponseAuthentication } from 'src/app/authentication/response-authentication';
import { TokenService } from 'src/app/entities/token/token.service';
import { ProfileService } from 'src/app/entities/profile/profile.service';
import { Profile } from 'src/app/entities/profile/profile';
import { UserService } from 'src/app/entities/user/user.service';
import { User } from 'src/app/entities/user/user';
import { IpAddressService } from 'src/app/services/ip-address/ip-address.service';
import { State } from 'src/app/services/locality/locality';
import { LocalityService } from 'src/app/services/locality/locality.service';
import { IP, IPAddress } from 'src/app/services/ip-address/ip';

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
    private userService: UserService,
    private ipAddressService: IpAddressService,
    private localityService: LocalityService
  ) {}

  login() {
    try {
      this.authenticationService.authenticate(this.email, this.password)
      .subscribe((res) => {

        const authResponse = res.body as ResponseAuthentication;
        this.tokenService.saveToLocalStorage('token', authResponse.token);

        switch(authResponse.profileId) {
          case null:
            this.router.navigate(['account']);

            // this.ipAddressService.getIpAddress().subscribe((ip) => {
            //   this.ipAddressService.searchIpAddress(ip).subscribe((ipAddress) => {
            //     this.localityService.updateState(ipAddress.region);
            //   })
            // });
            break;

          default:
            this.profileService.getProfile(authResponse.profileId)
            .subscribe((profile: Profile) => {

              // this.ipAddressService.getIpAddress().subscribe((ip) => {
              //   this.ipAddressService.searchIpAddress(ip).subscribe((ipAddress) => {
              //     this.localityService.updateState(ipAddress.region);
              //   })
              // });

              this.userService.saveUser({ email: this.email } as User);
              this.profileService.saveProfile(profile);
              this.router.navigate(['account']);

          });
            break;
        };
      });

    } catch (err) {
      // Informar o usuário do erro de login.
      console.log(err);
    };
  };
}
