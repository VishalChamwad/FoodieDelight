import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService{

  getItem<T>(key: string): T{
    let result = null;
    result = localStorage.getItem(key);
    if(result !== null){
      result = JSON.parse(result);
    }
    return result;
  }

  setItem<T>(key: string, value: T){
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getSessionItem<T>(key: string): T {
    let result = null;
    result = sessionStorage.getItem(key);
    if(result !== null){
      result = JSON.parse(result);
    }
    return result;
  }

  setSessionItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
