'use strict';

const Joi = require('@hapi/joi');
const Data = require('../data');


exports.post = function () {

    return {
        validate: {
            payload: {
                ids: Joi.array().items(
                    Joi.number().required()
                ).required().error(new Error('Invalid ids'))
            }
        },
        handler: async function (request) {

            const ids = request.payload.ids;

            const deleted = [];

            for (let id of ids) {

                if (Data.items[id]) {

                    delete Data.items[id];

                    deleted.push(id);
                }
            }

            return { ids: deleted };
        }
    };
};
