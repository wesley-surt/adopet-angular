import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animals } from './animals/animals';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { TokenService } from '../entities/token/token.service';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getAnimals(): Observable<Animals> {
    // const token = this.tokenService.getFromLocalStorage('token');
    // const headers = new HttpHeaders().append('x-access-token', token);
    return this.httpClient.get<Animals>(`${API}/animals`);
  }
}
