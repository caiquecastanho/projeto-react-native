async function genericRequest<Input>(uri: string, method: Method, input: Input | undefined, headers: Map<string, string> | undefined): Promise<Response> {
    let bodyType: BodyType | undefined;
    const myHeaders = new Headers();
    if(headers){
        for(let [key, value] of headers){
            myHeaders.append(key, value);
            if(key === 'Content-Type' && value === 'application/x-www-form-urlencoded'){
                bodyType = BodyType.FORM;
            }
        }
    }
    const myBody = BodyType.FORM ? getFormBody(input) : JSON.stringify(input);
    const request = new Request(uri, 
        {
            method: method, 
            body: myBody, 
            headers: myHeaders
        });
    const response: Response = await fetch(request);
    return response;
}

async function doGet(path: string, headers: Map<string, string>, params: Map<string, string> | undefined, pathParam: string | undefined): Promise<Response> {
    const myHeaders = new Headers();
    if(headers){
        for(let [key, value] of headers){
            myHeaders.append(key, value);
        }
    }
    //concatena os query parameters
    if(params){
        path = path + '?';
        for(let [key, value] of params){
            path = path + `${key}=${value}&`
        }
        //remove o ultimo &
        path = path.substring(0, path.length-1);
    }

    //concatena o path param
    if(pathParam){
        path = path + pathParam;
    }

    const request = new Request(path, {method: Method.GET, headers: myHeaders});
    const reponse: Response = await fetch(request);
    return reponse;
}

function getFormBody<Input>(input: any): string{
    var formBody = [];
    for (var property in input) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(input[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}

type Header = {
    [key: string]: string
}

enum BodyType {
    JSON, FORM
}

enum Method {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
}

const BASE_PATH: string = 'https://fiap-reactjs-presencial.herokuapp.com';

export { genericRequest , doGet, Method, BASE_PATH };
export type { Header };

// https://www.benjaminbergstein.com/engineering/typescript-generics/