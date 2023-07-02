import { EncodeDecodeBase64Service } from '../../utils/encode-decode-base64.service';
export abstract class AbstractLocalStorage<T> {

  constructor(
    private localStorage: Storage,
  ) {};

  public saveToLocalStorage(key: string, value: T): void {
    const encodedValue = EncodeDecodeBase64Service.utf8_to_b64(`${value}`);
    this.localStorage.setItem(key, encodedValue);
  };

  public removeFromLocalStorage(key: string): void {
    this.localStorage.removeItem(key);
  };

  public getFromLocalStorage(key: string): string {
    const decodeValue = this.localStorage.getItem(key) ?? '';
    return EncodeDecodeBase64Service.b64_to_utf8(decodeValue);
  };

  public updateLocalStorage(key: string, value: T): void {
    this.saveToLocalStorage(key, value);
  };

  public isLoggedInLocalStorage(key: string): boolean {
    return !! this.getFromLocalStorage(`${key}`);
  }
}
