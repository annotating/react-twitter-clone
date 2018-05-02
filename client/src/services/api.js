import axios from 'axios';

export function axiosCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios({
            method: method,
            url: path,
            data: data,
            withCredentials: true
        }).then(res => {
            return resolve(res.data);
        }).catch(err => {
            return reject(err.response.data.error);
        });
    });
}