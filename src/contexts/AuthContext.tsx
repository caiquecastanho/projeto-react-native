import { createContext } from "react";

/**
 * Contexto de autenticação
 */
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * Tipo do objeto retornado pela api de autenticação
 */
export type AuthContextType = {
    name: string,
    phone: string,
    token: string,
    userId: string,
    isLogged: boolean,
    authContextLogin: (email: string, senha: string) => Promise<void>,
    authContextLogOff: () => void,
}

