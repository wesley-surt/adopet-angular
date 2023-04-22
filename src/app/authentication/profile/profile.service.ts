import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Profile } from './profile';
import { environment } from 'src/environment/environment';
import { Observable, tap } from 'rxjs';
import { b64_to_utf8 } from '../../utils/encode-decode-base64';
import { AbstractLocalStorage } from '../localStorage/local-storage-abstract';
import { ProfileClass } from './profile-class';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractLocalStorage<Object> {

  constructor(
    private httpClient: HttpClient,
  ) {
    super(localStorage);
  }

  getProfile(id: string, token: string) {
    // const id = this.decodeId(encodedId);

    const headers = new HttpHeaders().append('x-access-token', token);
    return this.httpClient.get<Profile>(`${API}/profile/${id}`,
    {
      headers
    });
  };

  saveProfile(profile: Profile): void {
    const profileClass = new ProfileClass(
      profile._id,
      profile.photo,
      profile.name,
      profile.city,
      profile.about,
      profile.telephone
    );

    this.saveToLocalStorage('profile', JSON.stringify(profileClass));
  };
}
