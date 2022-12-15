import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '32003639-db0e7b4889ce58836b14df3bc';

export default class PicturesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchQuery() {
    return axios
      .get(
        `${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`
      )
      .then(({ data }) => {
        this.page += 1;
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
