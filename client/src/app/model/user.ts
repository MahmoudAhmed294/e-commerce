export interface ILogin {
    email: string;
    password: string;
}
export interface IRegister extends ILogin {
    name: string;
}

export interface IUser extends IRegister {
    id: number;
    token: string;
    cartCount: number;
}
