import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../entities/token/token.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenService.isLoggedInLocalStorage('token')) {
      const token = this.tokenService.getFromLocalStorage('token');
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({ headers })
    }
    return next.handle(request);
  }
}