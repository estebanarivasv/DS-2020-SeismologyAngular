import { Moment } from 'moment';
import { SensorsModel } from '../sensors/sensors.model';

export interface SeismsInterface {
    id_num?: number;
    datetime: Moment;
    depth: number;
    magnitude: number;
    latitude: number;
    longitude: number;
    verified: boolean;
    sensor_id?: number;
    sensor: SensorsModel;
}

export class SeismsModel implements SeismsInterface {
    constructor(
        public depth: number,
        public magnitude: number,
        public latitude: number,
        public longitude: number,
        public verified: boolean,
        public sensor: SensorsModel,
        public datetime: Moment,
        public sensor_id?: number,
        public id_num?: number
    ) {

    }
}