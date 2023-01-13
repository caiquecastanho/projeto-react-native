import { Login } from "../model/Login";
import { BASE_PATH, genericRequest, Method } from "./GenericService";

const login = async function(email: string, password: string): Promise<LoginResponse>{
    return new Promise(async (resolve, reject)=>{
        const path = BASE_PATH + '/storeProducts/login';
        const response: Response = await genericRequest<Login>(path, Method.POST, {email, password}, new Map<string, string>().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
          ));
        if(response.status === 200){
            const loginResponse: LoginResponse = await response.json();
            resolve(loginResponse);
        }else{
            const error: LoginError = await response.json();
            reject(new Error(error.message));
        }
    });
}

export {login};

export interface LoginResponse {
    token: string;
    userId: string;
    name: string;
    phone: string;
}

export interface LoginError{
    message: string;
}