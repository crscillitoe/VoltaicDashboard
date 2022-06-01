import { Component } from '@angular/core';
import { KovaaksService } from './services/kovaaks.service';
import { SteamService } from './services/steam.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VoltaicDashboard';
  rankColors: Map<string, string> = new Map<string, string>([
    ["Platinum", "#b9efea"],
    ["Diamond", "#e7faff"],
    ["Jade", "#cefdce"],
    ["Master", "#f8c0ed"],
  ]);
  scores: Map<string, any> = new Map<string, any>();
  idMappings: Map<string, any> = new Map<string, any>([
    [
      'VT Pasu Rasp Intermediate',
      {
        id: 29493,
        plat: 750,
        diamond: 850,
        jade: 950,
        master: 1050,
      },
    ],

    [
      'VT Bounceshot Intermediate',
      {
        id: 24955,
        plat: 600,
        diamond: 700,
        jade: 800,
        master: 900,
      },
    ],

    [
      'VT 1w5ts Rasp Intermediate',
      { id: 29494, plat: 1000, diamond: 1100, jade: 1200, master: 1300 },
    ],

    [
      'VT Multiclick 120 Intermediate',
      { id: 24957, plat: 1400, diamond: 1500, jade: 1600, master: 1700 },
    ],

    [
      'VT AngleStrafe Intermediate',
      { id: 25063, plat: 740, diamond: 830, jade: 920, master: 1000 },
    ],
    [
      'VT ArcStrafe Intermediate',
      { id: 29403, plat: 660, diamond: 750, jade: 850, master: 940 },
    ],
    [
      'VT Smoothbot Intermediate',
      { id: 24952, plat: 3000, diamond: 3400, jade: 3800, master: 4200 },
    ],
    [
      'VT PreciseOrb Intermediate',
      { id: 24958, plat: 1700, diamond: 2100, jade: 2500, master: 2900 },
    ],
    [
      'VT Air Varied Intermediate',
      { id: 24963, plat: 2850, diamond: 3150, jade: 3350, master: 3650 },
    ],
    [
      'VT PatStrafe Intermediate',
      { id: 26261, plat: 2260, diamond: 2620, jade: 2800, master: 3050 },
    ],
    [
      'VT AirStrafe Intermediate',
      { id: 29421, plat: 2800, diamond: 3000, jade: 3200, master: 3400 },
    ],
    [
      'VT psalmTS Intermediate',
      { id: 24960, plat: 810, diamond: 880, jade: 950, master: 1020 },
    ],
    [
      'VT skyTS Intermediate',
      { id: 24964, plat: 1030, diamond: 1130, jade: 1220, master: 1300 },
    ],
    [
      'VT evaTS Intermediate',
      { id: 24962, plat: 550, diamond: 600, jade: 650, master: 700 },
    ],
    [
      'VT bounceTS Intermediate',
      { id: 24953, plat: 670, diamond: 710, jade: 750, master: 800 },
    ],
  ]);

  constructor(
    public steamService: SteamService,
    private kovaaksService: KovaaksService
  ) {
    for (const mapping of this.idMappings.keys()) {
      const id = this.idMappings.get(mapping).id;
      this.kovaaksService.getScore(id).subscribe((data: any) => {
        this.scores.set(
          mapping,
          data.top_scores[0].attributes.score
        );
      });
    }
  }

  getScore(name: string) {
    return Math.floor(this.scores.get(name));
  }

  getRank(name: string) {
    let score = this.scores.get(name);
    if (!score) return 'Unranked';
    score = +score;

    const thresholds = this.idMappings.get(name);
    if (score >= thresholds.master) return "Master";
    if (score >= thresholds.jade) return "Jade";
    if (score >= thresholds.diamond) return "Diamond";
    if (score >= thresholds.plat) return "Platinum";

    return "Unranked";
  }

  getNextScore(name: string) {
    const thresholds = this.idMappings.get(name);
    let score = this.scores.get(name);
    if (!score) return thresholds.plat;

    score = +score;
    if (score >= thresholds.master) return thresholds.master;
    if (score >= thresholds.jade) return thresholds.master;
    if (score >= thresholds.diamond) return thresholds.jade;
    if (score >= thresholds.plat) return thresholds.diamond;

    return thresholds.plat;
  }

  getRankColor(rank: string) {
    const color = this.rankColors.get(rank);
    if (!color) return "#000000";

    return color;
  }
}
