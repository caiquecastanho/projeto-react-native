import { Person } from "../model/Person";
import { Method, genericRequest, BASE_PATH } from "./GenericService";

const registerPerson = async (pessoa: Person): Promise<SignupResponse> => {
  const path = BASE_PATH + "/storeProducts/signup";
  return new Promise(async (resolve, reject) => {
    const response: Response = await genericRequest<Person>(
      path,
      Method.PUT,
      pessoa,
      new Map<string, string>().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    );
    if(response.ok){
        const signupResponse: SignupResponse = await response.json();
        resolve(signupResponse);    
    }else{
        const error: SignupResponseError = await response.json();
        reject(new Error(error.message));
    }
  });
};
interface SignupResponse {
  message: string;
  userId: string;
}

interface SignupResponseError {
    data: any[];
    message: string;
}

export { registerPerson };
export type { SignupResponse };
