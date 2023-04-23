import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Profile } from './profile';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { b64_to_utf8 } from '../../utils/encode-decode-base64';
import { AbstractLocalStorage } from '../localStorage/local-storage-abstract';
import { ProfileClass } from './profile-class';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractLocalStorage<Object> {

  private profileSubject = new BehaviorSubject<any>({});

  constructor(
    private httpClient: HttpClient,
  ) {
    super(localStorage);
    if(this.isLoggedInLocalStorage('profile')) {
      this.updateProfile();
    };
  }

  public getProfile(id: string, token: string): Observable<Profile> {
    // const id = this.decodeId(encodedId);

    const headers = new HttpHeaders().append('x-access-token', token);
    return this.httpClient.get<Profile>(`${API}/profile/${id}`,
    {
      headers
    });
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
      profile._id,
      profile.photo,
      profile.name,
      profile.city,
      profile.about,
      profile.telephone
    );
  }

  private updateProfile(): void {
    const profile = JSON.parse(this.getFromLocalStorage('profile'));
    const profileClass = this.createProfileClass(profile)
    this.profileSubject.next(profileClass);
  }
}
