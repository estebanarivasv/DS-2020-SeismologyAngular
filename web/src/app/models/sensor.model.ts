import { UserModel } from './user.model';

export class SensorInterface {
    id_num?: number;
    name: string;
    ip: string;
    port: string;
    status: boolean;
    active: boolean;
    user_id?: number;
    user: UserModel;
}

export class SensorModel implements SensorInterface {
    constructor(
        public id_num: number,
        public name: string,
        public ip: string,
        public port: string,
        public status: boolean,
        public active: boolean,
        public user_id: number,
        public user: UserModel
    ) {

    }
}