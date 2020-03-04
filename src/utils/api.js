import axios from 'axios';

const URL_base = 'https://7b34368f.ngrok.io/serpacificows';
const URL_base_correo = 'http://7b34368f.ngrok.io';

export function getData(path) {
  return axios.get(URL_base + path).then(response => {
      return response.data;
  }).catch(error => console.log(error.response));
}

export function postData(path, elements) {
  return axios.post(URL_base + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
    return response.data;
  }).catch(error => console.log(error.response));
}

export function postEmail(path, elements) {
  return axios.post(URL_base_correo + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
    return response.status;
  }).catch(error => console.log(error.response));
}
