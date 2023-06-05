import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from './animals';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAnimals(state: string): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(`${API}/animals/search?state=${state}`);
  }
}
