import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IGestion, Gestion } from 'app/shared/model/gestion.model';
import { GestionService } from './gestion.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISolicitud } from 'app/shared/model/solicitud.model';
import { SolicitudService } from 'app/entities/solicitud/solicitud.service';

import { LocalStorageService } from 'ngx-webstorage';

type SelectableEntity = ISolicitud | IGestion;

@Component({
  selector: 'jhi-gestion-update',
  templateUrl: './gestion-update.component.html'
})
export class GestionUpdateComponent implements OnInit {
  isSaving = false;
  solicituds: ISolicitud[] = [];
  fechaDp: any;
  solicitud: ISolicitud | null = null;

  editForm = this.fb.group({
    id: [],
    detalle: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    observacion: [],
    documento: [],
    documentoContentType: [],
    nombreDeDocumento: [null, [Validators.required]],
    privado: [],
    solicitudId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected gestionService: GestionService,
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.solicitud = this.localStorage.retrieve('solicitud');
    this.activatedRoute.data.subscribe(({ gestion }) => {
      this.updateForm(gestion);
      this.solicitudService.query().subscribe((res: HttpResponse<ISolicitud[]>) => (this.solicituds = res.body || []));
    });
  }

  updateForm(gestion: IGestion): void {
    this.editForm.patchValue({
      id: gestion.id,
      detalle: gestion.detalle,
      fecha: gestion.fecha,
      observacion: gestion.observacion,
      documento: gestion.documento,
      documentoContentType: gestion.documentoContentType,
      nombreDeDocumento: gestion.nombreDeDocumento,
      privado: gestion.privado,
      solicitudId: gestion.solicitudId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('ocmSoliServerApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gestion = this.createFromForm();
    if (gestion.id !== undefined) {
      this.subscribeToSaveResponse(this.gestionService.update(gestion));
    } else {
      this.subscribeToSaveResponse(this.gestionService.create(gestion));
    }
  }

  private createFromForm(): IGestion {
    return {
      ...new Gestion(),
      id: this.editForm.get(['id'])!.value,
      detalle: this.editForm.get(['detalle'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      observacion: this.editForm.get(['observacion'])!.value,
      documentoContentType: this.editForm.get(['documentoContentType'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      nombreDeDocumento: this.editForm.get(['nombreDeDocumento'])!.value,
      privado: this.editForm.get(['privado'])!.value,
      solicitudId: this.solicitud?.id
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
