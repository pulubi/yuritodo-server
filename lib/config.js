'use strict';


exports.defaults = {
    host: 'localhost',
    port: 8080
};

exports.options = {
    host: exports.defaults.host,
    port: exports.defaults.port
};

exports.paths = {
    hello: '/hello',
    create: '/create',
    list: '/list',
    update: '/update',
    delete: '/delete'
};