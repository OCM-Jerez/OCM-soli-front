import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileService } from './profile.service';

@Component({
  // se usa en app>layout>main>main.component.html
  selector: 'jhi-page-ribbon',
  template: `
    <div class="ribbon" *ngIf="ribbonEnv$ | async as ribbonEnv">
      <!--  No veo traducción para global.ribbon. -->
      <a href="" jhiTranslate="global.ribbon.{{ ribbonEnv }}">{{ ribbonEnv }}</a>
    </div>
  `,
  styleUrls: ['page-ribbon.scss']
})
export class PageRibbonComponent implements OnInit {
     // $ es una Naming conventions for observables.
     // https://angular.io/guide/rx-library#naming-conventions-for-observables
  ribbonEnv$?: Observable<string | undefined>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {

    // No entiendo como funciona.
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));

    // ¿Porqué no se puede usar console.log()?
    // eslint-disable-next-line no-console
     console.log(this.ribbonEnv$);
  }
}
