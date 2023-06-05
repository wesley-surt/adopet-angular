import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IP, IPAddress } from './ip';
import { LocalityService } from '../locality/locality.service';

const ipIfy = environment.api_IPIFY;
const ipInfo = environment.api_IPINFO;
const tokenIpInfo = environment.token_IPINFO;

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  ipAddressTest!: IP;

  constructor(
    private http: HttpClient,
    private localityService: LocalityService
  ) { }

  getIpAddress(): Observable<IP> {
    return this.http.get<IP>(ipIfy);
  }

  searchIpAddress(ip: IP): Observable<IPAddress> {
    return this.http.get<IPAddress>(`${ipInfo}/${ip.ip}?token=${tokenIpInfo}`);
  }
}
