import { login, LoginResponse } from "../service/LoginService";

export default class LoginController {

    static async login(email: string, password: string): Promise<LoginResponse>{
        return login(email, password);
    }
}