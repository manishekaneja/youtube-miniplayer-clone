import config from './config';
import axios from 'axios';

const remoteData = {
  getTrending({limit, random_id, offset}) {
    return axios.get(
      `${config.gifhy.gif_endpoint_trending}?api_key=${config.gifhy.api_key}&limit=${limit}&random_id=${random_id}&offset=${offset}`,
    );
  },
  getRandomId() {
    return axios.get(
      `${config.gifhy.gif_random_id}?api_key=${config.gifhy.api_key}`,
    );
  },
  getSearchResult({random_id, limit, offset, query}) {
    return axios.get(
      `${config.gifhy.gif_endpoint_search}?api_key=${config.gifhy.api_key}&random_id=${random_id}&limit=${limit}&offset=${offset}&q=${query}`,
    );
  },
};

export default remoteData;
