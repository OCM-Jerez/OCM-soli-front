import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OcmSoliServerTestModule } from '../../../test.module';
import { GestionUpdateComponent } from 'app/entities/gestion/gestion-update.component';
import { GestionService } from 'app/entities/gestion/gestion.service';
import { Gestion } from 'app/shared/model/gestion.model';

describe('Component Tests', () => {
  describe('Gestion Management Update Component', () => {
    let comp: GestionUpdateComponent;
    let fixture: ComponentFixture<GestionUpdateComponent>;
    let service: GestionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OcmSoliServerTestModule],
        declarations: [GestionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GestionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gestion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gestion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
