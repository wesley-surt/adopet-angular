import { District, SimplifiedState, State } from './locality';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';

const API = environment.apiIBGE;

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  private stateSubject = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient
  ) { }

  public updateState(state: SimplifiedState) {
    this.stateSubject.next(state);
  }

  public returnState(): Observable<SimplifiedState> {
    return this.stateSubject.asObservable();
  }
  
  public getStates(): Observable<State[]> {
    return this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .pipe(
      map((c) => c)
    );
  }

  public getCities(state: State): Observable<District[]> {
    return this.http.get<District[]>(`${API}/${state.id}/distritos`)
  }

}
