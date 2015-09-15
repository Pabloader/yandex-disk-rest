var should = require('should');
var YandexDisk = require('..');

var accessToken = process.env.YANDEX_DISK_OAUTH_TOKEN;

var disk;
beforeEach(function () {
    disk = new YandexDisk(accessToken);
});

describe('YandexDisk', function () {
    describe('.write', function () {
        it('should write a file', function (done) {
            disk.write('file.txt', 'contents', done);
        });
    })
});
