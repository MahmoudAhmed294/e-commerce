export interface ISetAddress {
    UserAddress: string;
    Country: string;
    City: string;
    Phone: string;
}


export interface IAddress extends ISetAddress {
    id: number;
    userAddress: string;
    country: string;
    city: string;
    phone: string;
    isMain: boolean;
}
