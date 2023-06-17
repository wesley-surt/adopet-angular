import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IP, IPAddress } from './ip';

const apiIP = environment.api_IP;
const ipInfo = environment.api_IPINFO;
const tokenIpInfo = environment.token_IPINFO;

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  ipAddressTest!: IP;

  constructor(
    private http: HttpClient
  ) { }

  getIpAddress(): Observable<IP> {
    return this.http.get<IP>(apiIP);
  }
}
