import { Moment } from 'moment';
import { ISolicitud } from 'app/shared/model/solicitud.model';

export interface IDocumento {
  id?: number;
  nombreDeDocumento?: string;
  fechaSubida?: Moment;
  documentoContentType?: string;
  documento?: any;
  observacion?: string;
  ruta?: string;
  privado?: boolean;
  solicitudDescripcion?: string;
  solicitudId?: number;
  solicitud?: ISolicitud;
  gestionDetalle?: string;
  gestionId?: number;
}

export class Documento implements IDocumento {
  constructor(
    public id?: number,
    public nombreDeDocumento?: string,
    public fechaSubida?: Moment,
    public documentoContentType?: string,
    public documento?: any,
    public observacion?: string,
    public ruta?: string,
    public privado?: boolean,
    public solicitudDescripcion?: string,
    public solicitudId?: number,
    public solicitud?: ISolicitud,
    public gestionDetalle?: string,
    public gestionId?: number
  ) {
    this.privado = this.privado || false;
  }
}
