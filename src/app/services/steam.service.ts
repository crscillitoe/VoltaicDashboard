import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  private token: string = "";
  private id: string = "";

  private TOKEN_LOCALSTORAGE_KEY = "token";
  private ID_LOCALSTORAGE_KEY = "id";

  constructor() {
    const storedToken = localStorage.getItem(this.TOKEN_LOCALSTORAGE_KEY);
    if (storedToken) {
      this.token = storedToken;
    }

    const storedID = localStorage.getItem(this.ID_LOCALSTORAGE_KEY);
    if (storedID) {
      this.id = storedID;
    }
  }

  readyToRumble(): boolean {
    return !!this.token && !!this.id;
  }

  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem(this.TOKEN_LOCALSTORAGE_KEY, token)
  }

  setSteamID(id: string) {
    this.id = id;
    localStorage.setItem(this.ID_LOCALSTORAGE_KEY, id);
  }

  getAuthToken(): string {
    return this.token;
  }

  getSteamID(): string {
    return this.id;
  }
}
