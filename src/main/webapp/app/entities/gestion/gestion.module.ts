import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OcmSoliServerSharedModule } from 'app/shared/shared.module';
import { GestionComponent } from './gestion.component';
import { GestionDetailComponent } from './gestion-detail.component';
import { GestionUpdateComponent } from './gestion-update.component';
import { GestionDeleteDialogComponent } from './gestion-delete-dialog.component';
import { gestionRoute } from './gestion.route';

@NgModule({
  imports: [OcmSoliServerSharedModule, RouterModule.forChild(gestionRoute)],
  declarations: [GestionComponent, GestionDetailComponent, GestionUpdateComponent, GestionDeleteDialogComponent],
  entryComponents: [GestionDeleteDialogComponent]
})
export class OcmSoliServerGestionModule {}
