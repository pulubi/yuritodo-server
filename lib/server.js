'use strict';

const Hapi = require('@hapi/hapi');
const Config = require('./config');
const Routes = require('./routes');

const server = new Hapi.server(Config.options);

exports.setup = async function () {

    server.bind(server);
    server.route(Routes);

    await server.start();

    console.log('Yuri\'s Todo Webapp Server now running at: ', server.info.uri);
};