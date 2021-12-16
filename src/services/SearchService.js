import BaseService from './BaseService';

class SearchService extends BaseService {
    photos(params) {
        return this.get('/search/photos', params);
    }
}

const service = new SearchService();

export default service;