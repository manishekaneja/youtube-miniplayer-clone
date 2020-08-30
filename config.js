import {GIPHY_API_KEY, GIPHY_ENDPOINT, FLOWER, LION, TREE} from '@env';

const config = {
  gifhy: {
    api_key: GIPHY_API_KEY,
    base_endpoint: GIPHY_ENDPOINT,
    gif_endpoint: `${GIPHY_ENDPOINT}/gifs`,
    gif_endpoint_trending: `${GIPHY_ENDPOINT}/gifs/trending`,
    gif_random_id: `${GIPHY_ENDPOINT}/randomid`,
    gif_endpoint_search: `${GIPHY_ENDPOINT}/gifs/search	`,
  },
  flowerImage: FLOWER,
  lion: LION,
  tree: TREE,
};

Object.freeze(config);
export default config;
