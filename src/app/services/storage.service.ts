import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  set(key: string, value: any): void {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }
}
