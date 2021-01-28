import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DocumentoService } from 'app/entities/documento/documento.service';
import { IDocumento, Documento } from 'app/shared/model/documento.model';

describe('Service Tests', () => {
  describe('Documento Service', () => {
    let injector: TestBed;
    let service: DocumentoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDocumento;
    let expectedResult: IDocumento | IDocumento[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DocumentoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Documento(0, 'AAAAAAA', currentDate, 'image/png', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaSubida: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Documento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaSubida: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaSubida: currentDate
          },
          returnedFromService
        );

        service.create(new Documento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Documento', () => {
        const returnedFromService = Object.assign(
          {
            nombreDeDocumento: 'BBBBBB',
            fechaSubida: currentDate.format(DATE_FORMAT),
            documento: 'BBBBBB',
            observacion: 'BBBBBB',
            ruta: 'BBBBBB',
            privado: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaSubida: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Documento', () => {
        const returnedFromService = Object.assign(
          {
            nombreDeDocumento: 'BBBBBB',
            fechaSubida: currentDate.format(DATE_FORMAT),
            documento: 'BBBBBB',
            observacion: 'BBBBBB',
            ruta: 'BBBBBB',
            privado: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaSubida: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Documento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
