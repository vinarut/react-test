class BaseService {
    constructor() {
        this._accessKey = process.env.REACT_APP_ACCESS_KEY;
        this.api = 'https://api.unsplash.com';
    }

    get(uri, params = {}) {
        return fetch(this.api + uri + this._makeQueryParams({
            ...params,
            client_id: this._accessKey,
        })).then(response => response.json())
    }

    _makeQueryParams(params = {}) {
        return '?' + new URLSearchParams(params);
    }
}

export default BaseService;