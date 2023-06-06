import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractLocalStorage } from '../localStorage/local-storage-abstract';
import { ProfileClass } from './profile-class';
import { User } from '../user/user';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractLocalStorage<Object> {

  private profileSubject = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
  ) {
    super(localStorage);
    if(this.isLoggedInLocalStorage('profile')) {
      this.logInWithProfile();
    };
  }

  public getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${API}/profile/${id}`);
  };

  public saveProfile(profile: Profile): void {
    const profileClass = this.createProfileClass(profile);
    this.profileSubject.next(profileClass);
  };

  public returnProfile(): Observable<ProfileClass> {
    return this.profileSubject.asObservable();
  }

  private createProfileClass(profile: Profile): ProfileClass {
    return new ProfileClass(
      profile._id ?? '',
      profile.photo ?? '',
      profile.name ?? '',
      profile.city ?? '',
      profile.about ?? '',
      profile.telephone ?? ''
    );
  }

  private logInWithProfile(): void {
    const profile = JSON.parse(this.getFromLocalStorage('profile'));
    const profileClass = this.createProfileClass(profile)
    this.profileSubject.next(profileClass);
  }

  public update(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${API}/profile/update`, { profile} )
  }

  public register(user: User, profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${API}/profile/register`, {
      email: user.email,
      profile: profile
     })
  }
}
