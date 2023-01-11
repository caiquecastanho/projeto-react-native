import { BASE_PATH, doGet, genericRequest, Method } from "./GenericService"

export interface StoreProductsResponse {
    totalItems: number,
    page: number,
    perPage: string,
    products: ItemProduct[],
}
export interface ItemProduct{
    _id: string,
    name: string,
    price: string,
    favorite: boolean
}

const listProducts = async function(perPage: number, page: number, token: string): Promise<StoreProductsResponse>{
    return new Promise(async (resolve, reject)=>{
        const path = BASE_PATH + '/storeProducts/';
        const headers = new Map<string, string>().set('Authorization', `Bearer ${token}`);
        const queryParams = new Map<string, string>().set('page', page.toString()).set('perPage', perPage.toString()).set('orderDirection', 'asc');
        const response: Response = await doGet(path, headers, queryParams, undefined);
        if(response.ok){
            const storeProductsResponse: StoreProductsResponse = await response.json();
            resolve(storeProductsResponse);
        }else{
            reject(new Error('Erro ao listar produtos'));
        }
    });
}

const getProduct = async function (id: string, token: string): Promise<Product> {
    return new Promise(async (resolve, reject) => {
        const path = BASE_PATH + '/storeProducts/product/';
        const headers = new Map<string, string>().set('Authorization', `Bearer ${token}`);
        const response: Response = await doGet(path,headers, undefined, id);
        if(response.ok){
            const {product} = await response.json();
            console.log(product);
            resolve(product);
        }else{
            reject(new Error('Erro ao consultar produto'));
        }
    });
}

const addFavorite = async function(id: string, token: string): Promise<void>{
    return new Promise(async (resolve, reject) => {
        const path = BASE_PATH + '/storeProducts/manageFavorite';
        const headers = new Map<string, string>().set('Authorization', `Bearer ${token}`).set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        const response = await genericRequest<{productID: string}>(path, Method.POST, {productID: id}, headers);
        const json = await response.json();
        if(response.ok){
            resolve(json);
        }else{
            reject(new Error('Erro ao adicionar aos favoritos'));
        }
    });
}

const getFavorites = async function(): Promise<Product[]>{
    return new Promise(async (resolve, reject) => {
        const path = BASE_PATH + '/storeProducts/getFavProducts';
        const headers = new Map<string, string>().set('Authorization', `Bearer ${token}`)
        const response = await doGet(path, headers, undefined, undefined);  
        if(response.ok){
            const {products} = await response.json();
            console.log(products);
            resolve(products);
        }else{
            reject(new Error('Erro ao listar favoritos'));
        }
    });
}

export {listProducts, getProduct, addFavorite, getFavorites};