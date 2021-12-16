import BaseService from './BaseService';

class PhotoService extends BaseService {
    getPhotos(params) {
        return this.get('/photos', params)
    }

    getPhoto(id) {
        return this.get('/photos/' + id);
    }

    getRandom(params) {
        return this.get('/photos/random', params);
    }
}

const service = new PhotoService();

export default service;