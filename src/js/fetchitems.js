import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '32003639-db0e7b4889ce58836b14df3bc';

export default class picturesAPIService {
  constructor() {}
}
const fetchQuery = (value, page) => {
  return axios
    .get(
      `${URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    )
    .then(({ data }) => data);
};
