import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './new-user';
import { ResponseUserExists } from './response-user-exists';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  userExists(email: string): Observable<ResponseUserExists> {
    return this.http.get<ResponseUserExists>(`${API}/users/exists/${email}`);
  }

  register(newUser: NewUser) {
    return this.http.post<NewUser>(`${API}/users/register`, JSON.stringify(newUser));
  }
}
