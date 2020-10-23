import Api from './api';

const StoreService = {
  show: (google_place_id) => Api.get(`/stores/${google_place_id}`),
  index: (lat, lng) => Api.get('/stores', {params: {latitude: lat, longitude: lng}})
}

export default StoreService;