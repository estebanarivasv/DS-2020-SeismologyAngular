export class UserInterface {
    id_num?: number;
    email: string;
    password?: string;
    admin: boolean;
}

export class UserModel implements UserInterface {
    constructor(
        public id_num?: number,
        public email: string,
        public password?: string,
        public admin: boolean
    ) {

    }