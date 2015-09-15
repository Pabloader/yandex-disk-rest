var request = require('request');

var API_URL = 'https://cloud-api.yandex.net/v1/disk/';

function Client(accessToken) {
    if (this === undefined)
        return new Client(accessToken);
    this.request = request.defaults({headers: {'Authorization': 'OAuth ' + accessToken}});
}

Client.prototype.get = function (method, params, callback) {
    if (typeof callback === 'undefined' && typeof params === 'function') {
        callback = params;
        params = {};
    }
    this.doRequest('GET', method, params, callback);
};

Client.prototype.post = function (method, params, callback) {
    if (typeof callback === 'undefined' && typeof params === 'function') {
        callback = params;
        params = {};
    }
    this.doRequest('POST', method, params, callback);
};

Client.prototype.put = function (method, params, callback) {
    if (typeof callback === 'undefined' && typeof params === 'function') {
        callback = params;
        params = {};
    }
    this.doRequest('PUT', method, params, callback);
};

Client.prototype['delete'] = function (method, params, callback) {
    if (typeof callback === 'undefined' && typeof params === 'function') {
        callback = params;
        params = {};
    }
    this.doRequest('delete', method, params, callback);
};

Client.prototype.doRequest = function (method, uri, data, callback) {
    var options = {
        method: method,
        uri: API_URL + uri
    };
    if (method.toLowerCase() === 'get') {
        options.qs = data;
    } else {
        if (typeof data === string || data instanceof Buffer) {
            options.body = data;
        } else if (typeof data === 'object') {
            options.form = data;
        }
    }
    this.request(options, function (err, http, body) {
        if (err) return callback(err);
        var json = JSON.parse(body);
        if (json.error) return callback(json);
        callback(null, json);
    });
};

module.exports = Client;
