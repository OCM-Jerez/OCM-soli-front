import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGestion } from 'app/shared/model/gestion.model';
import { LocalStorageService } from 'ngx-webstorage';

type EntityResponseType = HttpResponse<IGestion>;
type EntityArrayResponseType = HttpResponse<IGestion[]>;

@Injectable({ providedIn: 'root' })
export class GestionService {
  public resourceUrl = SERVER_API_URL + 'api/gestions';

  constructor(protected http: HttpClient, private localStorageService: LocalStorageService) {}

  create(gestion: IGestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gestion);
    return this.http
      .post<IGestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gestion: IGestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gestion);
    return this.http
      .put<IGestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGestion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findAllBySolicitud(solicitudId: string): Observable<EntityArrayResponseType> {
    const usuarioId = this.localStorageService.retrieve('idUser');
    return this.http
      .get<IGestion[]>(this.resourceUrl + '/solicitud/' + solicitudId + '/usuario/' + usuarioId, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(gestion: IGestion): IGestion {
    const copy: IGestion = Object.assign({}, gestion, {
      fecha: gestion.fecha && gestion.fecha.isValid() ? gestion.fecha.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((gestion: IGestion) => {
        gestion.fecha = gestion.fecha ? moment(gestion.fecha) : undefined;
      });
    }
    return res;
  }
}
