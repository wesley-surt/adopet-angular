import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiIPInfo, IP, IPAddress, IPTest } from './ip';

const apiIP = environment.api_IP;
const ipInfo = environment.api_IPINFO;
const apiIpIpify = environment.api_IPIFY;
const tokenIpInfo = environment.token_IPINFO;

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  ipAddressTest!: IP;

  constructor(
    private http: HttpClient
  ) { }

  getIpTest(): Observable<IPTest> {
    return this.http.get<IPTest>(apiIpIpify);
  }

  getIpAddress(ip: IPTest): Observable<ApiIPInfo> {
    return this.http.get<ApiIPInfo>(`${ipInfo}/${ip.ip}?token=${tokenIpInfo}`);
  }
}
