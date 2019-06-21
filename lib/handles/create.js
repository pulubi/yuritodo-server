'use strict';

const Joi = require('@hapi/joi');
const Data = require('../data');


exports.post = function () {

    return {
        validate: {
            payload: {
                task: Joi.string().required().error(new Error('Invalid task'))
            }
        },
        handler: async function (request) {

            ++Data.itemId;

            const item = {
                task: request.payload.task,
                status: Data.statuses.active
            };

            Data.items[Data.itemId] = item;

            return { id: Data.itemId, status: item.status, task: item.task };
        }
    };
};
