import React from "react";
import LoginController from "../controller/LoginController";
import { LoginResponse } from "../service/LoginService";
import { AuthContext } from "./AuthContext";

/**
 * Provider que provê o valor do contexto contido no seu state para as telas
 */
export default class AuthContextProvider extends React.Component<any, AuthContextProviderState> {
    constructor(props: any){
        super(props);
        this.state = {name: '', phone: '', isLogged: false, token: '', userId: ''};
    };


    //É necessário que seja passada uma arrow function pois será passado como callback via context provider
    providerLogin = async(email: string, password: string): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try{
                const loginReponse: LoginResponse = await LoginController.login(email, password);
                this.setState({
                        name: loginReponse.name, 
                        phone: loginReponse.phone, 
                        token: loginReponse.token, 
                        isLogged: true, 
                        userId: loginReponse.userId
                });
                console.log(loginReponse);
                resolve();
              }catch(error){
                console.log(error.message);
                reject(new Error('Erro ao efetuar Login'));
              }
        });
    }

    providerLogOff = async(): Promise<void> => {

    }

    render(){
        const {name, phone, token, isLogged, userId} = this.state;
        return (
            // o valor do state do provider é passado como prop para prover as telas
            <AuthContext.Provider value={{
                name, 
                phone, 
                token, 
                isLogged, 
                userId, 
                authContextLogin: this.providerLogin, 
                authContextLogOff: this.providerLogOff}}>
                    {this.props.children}
            </AuthContext.Provider>
        );
    }
}

type AuthContextProviderState = {
    name: string,
    phone: string,
    token: string,
    userId: string,
    isLogged: boolean
}