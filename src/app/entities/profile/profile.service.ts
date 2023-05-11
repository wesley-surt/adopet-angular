import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Profile, ProfileToSend } from './profile';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AbstractLocalStorage } from '../localStorage/local-storage-abstract';
import { ProfileClass } from './profile-class';

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

    this.saveToLocalStorage('profile', JSON.stringify(profileClass));
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

  public register(profileToSend: ProfileToSend): Observable<HttpResponse<Profile>> {
    return this.http.post<Profile>(`${API}/profile/register`, {
      profileToSend
    },
    {
      observe: 'response'
    })
  }
}
