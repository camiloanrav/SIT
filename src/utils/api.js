import axios from 'axios';

const URL_base = 'https://serpacifico.uao.edu.co/serpacificows';
const URL_base_correo = 'https://serpacifico.uao.edu.co/';

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
    return response.data?response.data:null;
  }).catch(error => console.log(error.response));
}

export function getData2(path) {
  return axios.get(URL_base + path).then(response => {
    return response;
  }).catch(error => {return error.response;});
}

export function postData2(path, elements) {
  return axios.post(URL_base + path, elements,{
    headers: {
    'content-type': 'application/json'
  }}).then(response => {
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
