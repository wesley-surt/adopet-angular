import { ResponseAuthentication } from './response-authentication';
import { ProfileService } from '../entities/profile/profile.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { TokenService } from '../entities/token/token.service';
import { response } from 'express';
import { Profile } from '../entities/profile/profile';
import { Router } from '@angular/router';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  authenticate(email: string, password: string): Observable<HttpResponse<Object>> {
    return this.httpClient.post(
      `${API}/users/login`,
      {
        email: email,
        password: password
      },
      {
        observe: 'response'
      }
    )
  }

  checkLogin() {
    return this.tokenService.isLoggedInLocalStorage('token');
  }
}
