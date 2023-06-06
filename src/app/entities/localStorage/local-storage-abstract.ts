import { EncodeDecodeBase64Service } from '../../utils/encode-decode-base64.service';
export abstract class AbstractLocalStorage<T> {

  constructor(
    private localStorage: Storage,
  ) {};

  saveToLocalStorage(key: string, value: T): void {
    const encodedValue = EncodeDecodeBase64Service.utf8_to_b64(`${value}`);
    this.localStorage.setItem(key, encodedValue);
  };

  removeFromLocalStorage(key: string): void {
    this.localStorage.removeItem(key);
  };

  getFromLocalStorage(key: string): string {
    const decodeValue = this.localStorage.getItem(key) ?? '';
    return EncodeDecodeBase64Service.b64_to_utf8(decodeValue);
  };

  updateLocalStorage(key: string, value: T): void {
    this.saveToLocalStorage(key, value);
  };

  isLoggedInLocalStorage(key: string): boolean {
    return !! this.getFromLocalStorage(`${key}`);
  }
}
