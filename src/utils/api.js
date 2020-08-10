import axios from 'axios';

/* const URL_base = 'http://localhost/serpacificows';
const URL_base_correo = 'http://localhost'; */

/* const URL_base = 'https://serpacifico.uao.edu.co/serpacificows';
const URL_base_correo = 'https://serpacifico.uao.edu.co/'; */

const URL_base = 'https://172.16.3.90/serpacificows';
const URL_base_correo = 'https://172.16.3.90';

/* const URL_base = 'http://45.5.188.65/serpacificows';
const URL_base_correo = 'https://45.5.188.65'; */

/* const URL_base = 'http://127.0.0.1/serpacificows';
const URL_base_correo = 'http://127.0.0.1'; */

export function getData(path) {
  return axios.get(URL_base + path).then(response => {
      return response.data?response.data:null;
  }).catch(error => console.log(error.response));
}

export function postData(path, elements) {
  return axios.post(URL_base + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
    console.log(response.data);
    return response.data?response.data:null;
  }).catch(error => console.log(error.response));
}

export function getData2(path) {
  return axios.get(URL_base + path).then(response => {
    //console.log(response.data);
    return response;
  }).catch(error => {return error.response;});
}

export function postData2(path, elements) {
  return axios.post(URL_base + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
    console.log(response.data);
    return response;
  }).catch(error => {return error.response;});
}

export function postEmail(path, elements) {
  return axios.post(URL_base_correo + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
    return response.status;
  }).catch(error => console.log(error.response));
}
