import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from './animals';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { SimplifiedState } from 'src/app/services/locality/locality';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(
    private http: HttpClient,
  ) {}

  public fetchAll(state: SimplifiedState): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API}/animals/search?state=${state.nome}`);
  }

  public fetchOne(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${API}/animals/${id}`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${API}/animals/${id}`);
  }

  public update(animal: Animal): Observable<any> {
    return this.http.put<any>(`${API}/animals/${animal.id}`, {animal});
  }

  public register(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(`${API}/animals/register`, {animal});
  }
}
