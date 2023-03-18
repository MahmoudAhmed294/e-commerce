interface IImage {
    url: string;
    isMain: boolean;
}

export interface IProducts {
    id: number;
    name: string;
    category: string;
    price: string;
    img: IImage;
}
export interface IProductsDetails extends IProducts {
    quantity: number;
    rating: number;
    images: IImage[];
}
