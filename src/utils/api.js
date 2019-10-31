import axios from 'axios';

const DIM2 = 'http://localhost/serpacificows/dimension/all.php';

export function getDimension() {
  return axios.get(DIM2);
}