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

  register(newUser: string): Observable<any> {
    // const body = JSON.stringify(newUser);
    return this.http.post<any>(`${API}/users/register`, {
      email: "pri@gmail.com",
      name: "pri",
      password: "123",
      confirmPassword: "123"
  });
  };

//   {
//     "email": "princesa@gmail.com",
//     "name": "princesa",
//     "password": "123",
//     "confirmPassword": "123"
// }

  returnUser() {
    return this.userSubject.asObservable();
  }

  saveUser(user: User) {
    this.userSubject.next(user);
  }
}
