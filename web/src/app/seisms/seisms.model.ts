import { Moment } from 'moment';
import { PaginationModel } from '../pagination.model';
import { SensorsModel } from '../sensors/sensors.model';

// SEISMS REQUEST INTERFACE AND MODEL

export interface SeismsRequestInterface {
    seisms: Array<SeismsModel>;
    pagination: PaginationModel;
}

export class SeismsRequestModel implements SeismsRequestInterface {

    seisms: Array<SeismsModel>;
    pagination: PaginationModel;
}

export interface SeismsInterface {
    id_num?: number;
    datetime: Moment;
    depth: number;
    magnitude: number;
    latitude: string;
    longitude: string;
    verified: boolean;
    sensor_id?: number;
    sensor: SensorsModel;
}

export class SeismsModel implements SeismsInterface {
    constructor(
        public depth: number,
        public magnitude: number,
        public latitude: string,
        public longitude: string,
        public verified: boolean,
        public sensor: SensorsModel,
        public datetime: Moment,
        public sensor_id?: number,
        public id_num?: number
    ) { }
}