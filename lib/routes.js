'use strict';

const Config = require('./config');
const Create = require('./handles/create');
const List = require('./handles/list');
const Update = require('./handles/update');
const Delete = require('./handles/delete');


module.exports = [
    { path: Config.paths.hello, method: 'get', options: { handler: async () => { return 'Hello World!' }} },
    { path: Config.paths.create, method: 'post', options: Create.post },
    { path: Config.paths.list, method: 'get', options: List.get },
    { path: Config.paths.update, method: 'post', options: Update.post },
    { path: Config.paths.delete, method: 'post', options: Delete.post }
];
