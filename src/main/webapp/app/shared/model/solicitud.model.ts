import { Moment } from 'moment';

export interface ISolicitud {
  id?: any;
  descripcion?: string;
  fechaSolicitud?: Moment;
  fechaRespuesta?: Moment;
  observacion?: string;
  diasRespuesta?: number;
}

export class Solicitud implements ISolicitud {
  constructor(
    public id?: any,
    public descripcion?: string,
    public fechaSolicitud?: Moment,
    public fechaRespuesta?: Moment,
    public observacion?: string,
    public diasRespuesta?: number
  ) {}
}
