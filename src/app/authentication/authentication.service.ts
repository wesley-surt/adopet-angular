import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../entities/token/token.service';
import { environment } from 'src/environment/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  authenticate(email: string, password: string): Observable<HttpResponse<Object>> {
    return this.httpClient.post(`${API}/users/login`,
      {
        email: email,
        password: password
      },
      { observe: 'response' }
    )
  }

  checkLogin() {
    return this.tokenService.isLoggedInLocalStorage('token');
  }
}
