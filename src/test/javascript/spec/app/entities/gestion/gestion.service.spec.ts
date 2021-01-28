import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { GestionService } from 'app/entities/gestion/gestion.service';
import { IGestion, Gestion } from 'app/shared/model/gestion.model';

describe('Service Tests', () => {
  describe('Gestion Service', () => {
    let injector: TestBed;
    let service: GestionService;
    let httpMock: HttpTestingController;
    let elemDefault: IGestion;
    let expectedResult: IGestion | IGestion[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GestionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Gestion(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'image/png', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Gestion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.create(new Gestion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Gestion', () => {
        const returnedFromService = Object.assign(
          {
            detalle: 'BBBBBB',
            fecha: currentDate.format(DATE_FORMAT),
            observacion: 'BBBBBB',
            documento: 'BBBBBB',
            nombreDeDocumento: 'BBBBBB',
            privado: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Gestion', () => {
        const returnedFromService = Object.assign(
          {
            detalle: 'BBBBBB',
            fecha: currentDate.format(DATE_FORMAT),
            observacion: 'BBBBBB',
            documento: 'BBBBBB',
            nombreDeDocumento: 'BBBBBB',
            privado: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Gestion', () => {
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
