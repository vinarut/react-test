import PhotoService from './PhotoService';
import SearchService from './SearchService';

class ApiFacade {
    constructor() {
        this._photo = PhotoService;
        this._search = SearchService;
    }

    photo() {
        return this._photo;
    }

    search() {
        return this._search;
    }
}

const apiFacade = new ApiFacade();

export default apiFacade;