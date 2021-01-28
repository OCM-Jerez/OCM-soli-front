import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGestion, Gestion } from 'app/shared/model/gestion.model';
import { GestionService } from './gestion.service';
import { GestionComponent } from './gestion.component';
import { GestionDetailComponent } from './gestion-detail.component';
import { GestionUpdateComponent } from './gestion-update.component';

@Injectable({ providedIn: 'root' })
export class GestionResolve implements Resolve<IGestion> {
  constructor(private service: GestionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGestion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gestion: HttpResponse<Gestion>) => {
          if (gestion.body) {
            return of(gestion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gestion());
  }
}

export const gestionRoute: Routes = [
  {
    path: '',
    component: GestionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ocmSoliServerApp.gestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GestionDetailComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ocmSoliServerApp.gestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GestionUpdateComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ocmSoliServerApp.gestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GestionUpdateComponent,
    resolve: {
      gestion: GestionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ocmSoliServerApp.gestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
