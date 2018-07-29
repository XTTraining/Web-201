import 'babel-polyfill';
import "isomorphic-fetch";

export const getApiResponse = (apiUrl) => {
    let outPut = {
        status: 400,
        data: ""
    };
    {
        return fetch(apiUrl)
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(data => {
                if (status===200) {
                    outPut.status = status;
                    outPut.data = data;
                    return outPut;
                }
                else{
                    outPut.status = status;
                    outPut.data = data;
                    return outPut;
                }
            });
    }
};