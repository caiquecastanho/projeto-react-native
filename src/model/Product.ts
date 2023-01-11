interface Product {
    _id: string,
    name: string,
    price: string,
    favorite: boolean,
    stores: Store[],
    createdDate: string,
    updatedDate: string,
}

interface Store{
    _id: string,
    name: string,
    address: string,
    latitude: string,
    longitude: string
}