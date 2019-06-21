'use strict';

const Joi = require('@hapi/joi');
const Data = require('../data');


exports.get = function () {

    return {
        handler: async function (request) {

            const ids = Object.keys(Data.items);
            const items = [];
            let page = 1;
            let perPage = 10;

            let status = request.query.status;

            if (!isNaN(request.query.page)) {
                page = parseInt(request.query.page);
            }

            if (!isNaN(request.query.perPage)) {
                perPage = parseInt(request.query.perPage);
            }

            const start = (page * perPage) - perPage;
            const max = (page * perPage) - 1;

            if (start > ids.length - 1) {

                return { items: [] };
            }

            if (status) {
                status = status.toLowerCase();
            }

            for (let i = start; i <= max && i < ids.length; i++) {

                if (Data.items.hasOwnProperty(ids[i])) {

                    if (status === Data.statuses.active || status === Data.statuses.completed) {
                        if (status === Data.items[ids[i]].status) {
                            items.push({id: ids[i], task: Data.items[ids[i]].task, status: Data.items[ids[i]].status});
                        }
                    }
                    else if (status !== Data.statuses.active || status !== Data.statuses.completed) {
                        items.push({id: ids[i], task: Data.items[ids[i]].task, status: Data.items[ids[i]].status});
                    }
                }
            }

            return { items };
        }
    };
};
