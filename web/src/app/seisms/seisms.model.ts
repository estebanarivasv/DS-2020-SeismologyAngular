import { Moment } from 'moment';
import { SensorModel } from '../sensors/sensors.model';

export interface SeismInterface {
    id_num?: number;
    datetime: Moment;
    depth: number;
    magnitude: number;
    latitude: number;
    longitude: number;
    verified: boolean;
    sensor_id?: number;
    sensor: SensorModel;
}

export class SeismModel implements SeismInterface {
    constructor(
        public depth: number,
        public magnitude: number,
        public latitude: number,
        public longitude: number,
        public verified: boolean,
        public sensor: SensorModel,
        public datetime: Moment,
        public sensor_id?: number,
        public id_num?: number
    ) {

    }
}