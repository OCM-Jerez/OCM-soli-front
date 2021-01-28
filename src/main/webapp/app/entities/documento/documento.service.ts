import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumento } from 'app/shared/model/documento.model';
import { LocalStorageService } from 'ngx-webstorage';

type EntityResponseType = HttpResponse<IDocumento>;
type EntityArrayResponseType = HttpResponse<IDocumento[]>;

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  public resourceUrl = SERVER_API_URL + 'api/documentos';

  constructor(protected http: HttpClient, private localStorageService: LocalStorageService) {}

  create(documento: IDocumento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documento);
    return this.http
      .post<IDocumento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(documento: IDocumento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documento);
    return this.http
      .put<IDocumento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocumento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDocumento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findAllBySolicitud(solicitudId: string): Observable<EntityArrayResponseType> {
    const usuarioId = this.localStorageService.retrieve('idUser');
    return this.http
      .get<IDocumento[]>(this.resourceUrl + '/solicitud/' + solicitudId + '/usuario/' + usuarioId, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(documento: IDocumento): IDocumento {
    const copy: IDocumento = Object.assign({}, documento, {
      fechaSubida: documento.fechaSubida && documento.fechaSubida.isValid() ? documento.fechaSubida.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaSubida = res.body.fechaSubida ? moment(res.body.fechaSubida) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((documento: IDocumento) => {
        documento.fechaSubida = documento.fechaSubida ? moment(documento.fechaSubida) : undefined;
      });
    }
    return res;
  }
}
