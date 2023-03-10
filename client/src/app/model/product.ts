export interface IProducts {
    id: number;
    name: string;
    category: string;
    price: string;
    img: string;
}

export interface IProductsDetails extends  IProducts {
    quantity:number;
    rating:number
}

