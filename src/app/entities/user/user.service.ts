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

  public userExists(email: string): Observable<ResponseUserExists> {
    return this.http.post<ResponseUserExists>(`${API}/users/exists`,
    {
      email: email
    });
  };

  public register(newUser: NewUser): Observable<any> {
    return this.http.post<any>(`${API}/users/register`, {
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
      confirmPassword: newUser.confirmPassword
  });
  };

  public returnUser() {
    return this.userSubject.asObservable();
  }

  public saveUser(user: User) {
    this.userSubject.next(user);
  }
}
