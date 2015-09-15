var Client = require('./rest_client');
var extend = require('extend');
var normalize = require('path').posix.normalize;

var ROOT = 'app:/';

function YandexDisk(accessToken) {
    if (this === undefined)
        return new YandexDisk(accessToken);
    this.client = new Client(accessToken);
}

YandexDisk.prototype.read = function resource(path, callback) {
    path = ROOT + normalize(path);
    var self = this;
    this.client.get('resources/download', {path: path}, function (err, data) {
        if (err) return callback(err);
        self.client.request({
            uri: data.href,
            method: data.method
        }, function (err, http, data) {
            callback(err, data);
        });
    });
};

YandexDisk.prototype.write = function resource(path, body, callback) {
    if (path[0] === '/')
        path = path.slice(1);
    path = ROOT + normalize(path);
    var self = this;
    this.client.get('resources/upload', {path: path}, function (err, data) {
        if (err) return (typeof callback === 'function' && callback(err));
        self.client.request({
            uri: data.href,
            method: data.method,
            body: body
        }, function (err, http, data) {
            if (typeof callback === 'function')
                callback(err, data);
        });
    });
};

YandexDisk.prototype.writeLink = function writeLink(path, link, callback) {
    if (path[0] === '/')
        path = path.slice(1);
    path = ROOT + normalize(path);
    this.client.post('resources/upload', {path: path, url: link}, callback);
};

module.exports = YandexDisk;
