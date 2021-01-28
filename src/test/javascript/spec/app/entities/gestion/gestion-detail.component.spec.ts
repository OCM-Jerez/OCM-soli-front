import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { OcmSoliServerTestModule } from '../../../test.module';
import { GestionDetailComponent } from 'app/entities/gestion/gestion-detail.component';
import { Gestion } from 'app/shared/model/gestion.model';

describe('Component Tests', () => {
  describe('Gestion Management Detail Component', () => {
    let comp: GestionDetailComponent;
    let fixture: ComponentFixture<GestionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ gestion: new Gestion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OcmSoliServerTestModule],
        declarations: [GestionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GestionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load gestion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gestion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
