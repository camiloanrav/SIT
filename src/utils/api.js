import axios from 'axios';

const DIM2 = 'http://localhost/serpacificows/dimension/all.php';

const PUBS = 'http://localhost/serpacificows/documento/search.php?id=1';

export function getDimension() {
  return axios.get(DIM2);
}

export function getPubs() {
  return axios.get(PUBS);
}