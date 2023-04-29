import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  userExists(email: string): Observable<Object> {
    return this.http.get(`${API}/users/exists`);
  }
}
