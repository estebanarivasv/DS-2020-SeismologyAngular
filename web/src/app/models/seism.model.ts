import { SensorModel } from './sensor.model';
import { Moment } from 'moment';

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
        public id_num: number,
        public datetime: Moment,
        public depth: number,
        public magnitude: number,
        public latitude: number,
        public longitude: number,
        public verified: boolean,
        public sensor_id: number,
        public sensor: SensorModel
    ) {

    }
}