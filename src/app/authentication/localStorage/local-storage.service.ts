import { Injectable } from '@angular/core';
import { Token } from '../token/token';
import { Profile } from '../profile/profile';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private localStorage: Storage
  ) {};

  saveToLocalStorage(key: string, value: Profile | Token): void {
    this.localStorage.setItem(key, value.toString());
  };

  removeFromLocalStorage(key: string): void {
    this.localStorage.removeItem(key);
  };

  getFromLocalStorage(key: string): string | null {
    return this.localStorage.getItem(key);
  };

  updateLocalStorage(key: string, value: Profile | Token): void {
    this.saveToLocalStorage(key, value);
  };

  isLogged(): boolean {
    return !! this.getFromLocalStorage('profile');
  };
}
