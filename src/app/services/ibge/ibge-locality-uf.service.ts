import { District, State } from './ibge';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first, map } from 'rxjs';
import { environment } from 'src/environment/environment';

const API = environment.apiIBGE;

@Injectable({
  providedIn: 'root'
})
export class IbgeLocalityUfService {

  private stateSubject = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient
  ) { }

  updateState(state: State) {
    this.stateSubject.next(state);
  }

  returnState(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  stateCities(state: State): Observable<District[]> {
    return this.http.get<District[]>(`${API}/${state.id}/distritos`)
  }

  states(): Observable<State[]> {
    return this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .pipe(
      map((c)=>{
        return c;
      })  
    );
  }
}
