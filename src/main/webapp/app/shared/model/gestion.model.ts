import { Moment } from 'moment';
import { ISolicitud } from 'app/shared/model/solicitud.model';

export interface IGestion {
  id?: number;
  detalle?: string;
  fecha?: Moment;
  observacion?: string;
  documentoContentType?: string;
  documento?: any;
  nombreDeDocumento?: string;
  privado?: boolean;
  solicitudDescripcion?: string;
  solicitud?: ISolicitud;
  solicitudId?: number;
}

export class Gestion implements IGestion {
  constructor(
    public id?: number,
    public detalle?: string,
    public fecha?: Moment,
    public observacion?: string,
    public documentoContentType?: string,
    public documento?: any,
    public nombreDeDocumento?: string,
    public privado?: boolean,
    public solicitudDescripcion?: string,
    public solicitud?: ISolicitud,
    public solicitudId?: number
  ) {
    this.privado = this.privado || false;
  }
}
