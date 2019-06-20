'use strict';

const Joi = require('@hapi/joi');
const Data = require('../data');


exports.post = function () {

    return {
        validate: {
            payload: {
                content: Joi.string().required().error(new Error('Invalid content'))
            }
        },
        handler: async function (request) {

            ++Data.itemId;

            const item = {
                content: request.payload.content,
                status: Data.statuses.active
            };

            Data.items[Data.itemId] = item;

            return { id: Data.itemId, status: item.status, content: item.content };
        }
    };
};
