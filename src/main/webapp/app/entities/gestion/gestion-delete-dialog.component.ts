import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestion } from 'app/shared/model/gestion.model';
import { GestionService } from './gestion.service';

@Component({
  templateUrl: './gestion-delete-dialog.component.html'
})
export class GestionDeleteDialogComponent {
  gestion?: IGestion;

  constructor(protected gestionService: GestionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gestionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gestionListModification');
      this.activeModal.close();
    });
  }
}
