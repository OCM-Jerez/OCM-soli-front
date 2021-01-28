import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { JhiDataUtils } from 'ng-jhipster';

// Interfaces
import { IDocumento } from '../../shared/model/documento.model';
import { ISolicitud } from 'app/shared/model/solicitud.model';
import { IGestion } from 'app/shared/model/gestion.model';

// Services
import { DocumentoService } from '../documento/documento.service';
import { GestionService } from '../gestion/gestion.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-solicitud-detail',
  templateUrl: './solicitud-detail.component.html'
})
export class SolicitudDetailComponent implements OnInit {
  solicitud: ISolicitud | null = null;
  documentos?: IDocumento[] | any;
  gestions: IGestion[] | any;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected documentoService: DocumentoService,
    protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));

    // Calculo días trancurridos desde la solicitud.
    if (typeof this.solicitud!.fechaRespuesta === 'undefined') {
      const date = moment();
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    } else {
      const date = moment(this.solicitud!.fechaRespuesta);
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    }

    // Relación con documentos
    if (this.solicitud?.id) {
      this.documentoService.findAllBySolicitud(this.solicitud.id).subscribe(response => {
        this.documentos = response.body;
      });
    }

    // Relación con gestiones
    if (this.solicitud?.id) {
      this.gestionService.findAllBySolicitud(this.solicitud.id).subscribe(response => {
        this.gestions = response.body;
      });
    }
  }

  crearDocumento(): void {
    this.localStorage.store('solicitud', this.solicitud);
    this.router.navigate(['/documento/new']);
  }

  crearGestion(): void {
    this.localStorage.store('solicitud', this.solicitud);
    this.router.navigate(['/gestion/new']);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  trackId(index: number, item: IDocumento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
