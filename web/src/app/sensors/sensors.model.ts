import { UsersModel } from '../users/users.model';

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