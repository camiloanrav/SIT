import axios from 'axios';

const DIM2 = 'http://11.11.8.46/serpacificows/dimension/all.php';

const PUBS = 'http://11.11.8.46/serpacificows/documento/search.php?id=1';

export function getDimension() {
  return axios.get(DIM2);
}

export function getPubs() {
  return axios.get(PUBS);
}