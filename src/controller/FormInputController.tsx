import { Person } from "../model/Person";
import { registerPerson, SignupResponse } from "../service/PersonService";

export class FormInputController {

    static async signUp(person: Person): Promise<SignupResponse> {
        return registerPerson(person);
    }
}