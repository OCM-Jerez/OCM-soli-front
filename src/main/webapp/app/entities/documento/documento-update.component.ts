import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDocumento, Documento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISolicitud } from 'app/shared/model/solicitud.model';
import { SolicitudService } from 'app/entities/solicitud/solicitud.service';
// import { IGestion } from 'app/shared/model/gestion.model';
// import { GestionService } from 'app/entities/gestion/gestion.service';
import { LocalStorageService } from 'ngx-webstorage';

// type SelectableEntity = ISolicitud | IGestion;
type SelectableEntity = ISolicitud;

@Component({
  selector: 'jhi-documento-update',
  templateUrl: './documento-update.component.html'
})
export class DocumentoUpdateComponent implements OnInit {
  isSaving = false;
  solicituds: ISolicitud[] = [];
  // gestions: IGestion[] = [];
  fechaSubidaDp: any;
  solicitud: ISolicitud | null = null;

  editForm = this.fb.group({
    id: [],
    nombreDeDocumento: [null, [Validators.required]],
    fechaSubida: [null, [Validators.required]],
    documento: [],
    documentoContentType: [],
    observacion: [],
    ruta: [],
    privado: [],
    solicitudId: []
    // gestionId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected documentoService: DocumentoService,
    protected solicitudService: SolicitudService,
    // protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.solicitud = this.localStorage.retrieve('solicitud');
    this.activatedRoute.data.subscribe(({ documento }) => {
      this.updateForm(documento);
      this.solicitudService.query().subscribe((res: HttpResponse<ISolicitud[]>) => (this.solicituds = res.body || []));
      // this.gestionService.query().subscribe((res: HttpResponse<IGestion[]>) => (this.gestions = res.body || []));
    });
  }

  updateForm(documento: IDocumento): void {
    this.editForm.patchValue({
      id: documento.id,
      nombreDeDocumento: documento.nombreDeDocumento,
      fechaSubida: documento.fechaSubida,
      documento: documento.documento,
      documentoContentType: documento.documentoContentType,
      observacion: documento.observacion,
      ruta: documento.ruta,
      privado: documento.privado,
      solicitudId: documento.solicitudId
      // gestionId: documento.gestionId
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
    const documento = this.createFromForm();
    if (documento.id !== undefined) {
      this.subscribeToSaveResponse(this.documentoService.update(documento));
    } else {
      this.subscribeToSaveResponse(this.documentoService.create(documento));
    }
  }

  private createFromForm(): IDocumento {
    return {
      ...new Documento(),
      id: this.editForm.get(['id'])!.value,
      nombreDeDocumento: this.editForm.get(['nombreDeDocumento'])!.value,
      fechaSubida: this.editForm.get(['fechaSubida'])!.value,
      documentoContentType: this.editForm.get(['documentoContentType'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      observacion: this.editForm.get(['observacion'])!.value,
      ruta: this.editForm.get(['ruta'])!.value,
      privado: this.editForm.get(['privado'])!.value,
      solicitudId: this.solicitud?.id
      // gestionId: this.editForm.get(['gestionId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumento>>): void {
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
