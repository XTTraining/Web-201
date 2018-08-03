import 'babel-polyfill';
import "isomorphic-fetch";

export const getApiResponse = async (apiUrl) => {
        const response = await fetch(apiUrl);
        return response.json();
};

export const getPostAuthenticationResponse = (apiUrl, data) => {
    let outPut = {
        status: 400,
        userInformation: {

        }
    };
    console.log(`Route : ${apiUrl} data: ${data}`);
    return fetch(apiUrl, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            status = response.status;
            return response.json();
        })
        .then(data => {
            if (status === 200 && data.status === "success") {
                outPut.status = status;
                outPut.userInformation = data;
                return outPut;
            }
            else {
                outPut.status = status;
                outPut.userInformation = data;
                return outPut;
            }
        });
};