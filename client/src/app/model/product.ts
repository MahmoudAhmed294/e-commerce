interface IImage {
    url: string;
}

export interface IProducts {
    id: number;
    title: string;
    category: string;
    price: number;
    img: IImage;
}
export interface IProductsDetails extends IProducts {
    quantity: number;
    description: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    images: IImage[];
}

export interface ICart extends IProducts {
    quantity: number;
}
