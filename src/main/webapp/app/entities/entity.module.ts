import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'solicitud',
        loadChildren: () => import('./solicitud/solicitud.module').then(m => m.OcmSoliServerSolicitudModule)
      },
      {
        path: 'documento',
        loadChildren: () => import('./documento/documento.module').then(m => m.OcmSoliServerDocumentoModule)
      },
      {
        path: 'gestion',
        loadChildren: () => import('./gestion/gestion.module').then(m => m.OcmSoliServerGestionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OcmSoliServerEntityModule {}
