import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SteamService } from './steam.service';

@Injectable({
  providedIn: 'root'
})
export class KovaaksService {
  constructor(private steamService: SteamService, private http: HttpClient) { }

  getScore(scenarioId: number) {
    const postData = {
      leaderboard_id: scenarioId,
      request_type: "friends",
      steam_id: this.steamService.getSteamID()
    }

    let req =  this.http.post<any>("https://game-themeta.com/sa_leaderboard_player_scores_get", postData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.steamService.getAuthToken()}`)
    });


    return req;
  }
}
