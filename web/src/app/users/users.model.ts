export class UsersInterface {
    id_num?: number;
    email: string;
    password?: string;
    admin: boolean;
}

export class UsersModel implements UsersInterface {
    constructor(
        public email: string,
        public admin: boolean,
        public id_num?: number,
        public password?: string
    ) {

    }
}