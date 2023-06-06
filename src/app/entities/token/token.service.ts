import { AbstractLocalStorage } from '../localStorage/local-storage-abstract';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService extends AbstractLocalStorage<string> {
/** Tentar criar uma interface ou uma classe abstrata que ajuda a identificar se a string inserida
 * como parâmetro para escrever no localStorage é realmente um token. Isso vai ajudar a evitar erros.
 */
  constructor() {
    super(localStorage);
  };
}
