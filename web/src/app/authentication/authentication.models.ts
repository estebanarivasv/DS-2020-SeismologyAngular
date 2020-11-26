export class LoginModel {

    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}

export class UserJWT {
    public id: number;
    public email: string;
    public token: string;
    public admin: boolean;
  
    constructor(id: number, email: string, token: string, admin: boolean) {
      this.id = id;
      this.email = email;
      this.token = token;
      this.admin = admin;
    }
  }
  
