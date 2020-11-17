export class UserInterface {
    id_num?: number;
    email: string;
    password?: string;
    admin: boolean;
}

export class UserModel implements UserInterface {
    constructor(
        public email: string,
        public admin: boolean,
        public id_num?: number,
        public password?: string
    ) {

    }
}