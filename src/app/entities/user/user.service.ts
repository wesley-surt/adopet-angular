import { User } from './user';
import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewUser } from './new-user';
import { ResponseUserExists } from './response-user-exists';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject({});

  constructor(
    private http: HttpClient
  ) {}

  userExists(email: string): Observable<ResponseUserExists> {
    return this.http.post<ResponseUserExists>(`${API}/users/exists`,
    {
      email: email
    });
  };

  register(newUser: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(`${API}/users/register`, JSON.stringify(newUser));
  };
  
  returnUser() {
    return this.userSubject.asObservable();
  }

  saveUser(user: User) {
    this.userSubject.next(user);
  }
}
