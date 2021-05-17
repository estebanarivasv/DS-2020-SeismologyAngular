import { PaginationModel } from '../pagination.model';
import { UsersModel } from '../users/users.model';


// SENSORS REQUEST INTERFACE AND MODEL

export interface SensorsRequestInterface {
    sensors: Array<SensorsModel>;
    pagination: PaginationModel;
}

export class SensorsRequestModel implements SensorsRequestInterface {
    sensors: Array<SensorsModel>;
    pagination: PaginationModel;
}

// SENSORS MODEL

export class SensorsInterface {
    id_num?: number;
    name: string;
    ip: string;
    port: string;
    status: boolean;
    active: boolean;
    user_id?: number;
    user: UsersModel;
}

export class SensorsModel implements SensorsInterface {
    constructor(
        public name: string,
        public ip: string,
        public port: string,
        public status: boolean,
        public active: boolean,
        public user: UsersModel,
        public id_num?: number,
        public user_id?: number
    ) {

    }
}