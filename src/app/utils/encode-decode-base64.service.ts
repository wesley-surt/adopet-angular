import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeDecodeBase64Service {

  constructor() { }

  utf8_to_b64 = (str: string) => {
    return window.btoa(encodeURIComponent(str));
  }

  b64_to_utf8 = (str: string) => {
    return decodeURIComponent(window.atob(str));
  }

}
