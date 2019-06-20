'use strict';

const Joi = require('@hapi/joi');
const Data = require('../data');


exports.post = function () {

    return {
        validate: {
            payload: {
                items: Joi.array().items(
                    Joi.object({
                        id: Joi.number().required(),
                        status: Joi.string().valid(Data.statuses.active, Data.statuses.completed),
                        content: Joi.string()
                    }).or('status','content').required()
                ).required().error(new Error('Invalid items'))
            }
        },
        handler: async function (request) {

            const items = request.payload.items;
            const changed = [];

            console.log(items);

            for (let item of items) {

                if (Data.items[item.id]) {

                    const change = { id: item.id };
                    const data = Data.items[item.id];

                    let hasChange = false;

                    if (item.status && item.status !== data.status) {
                        Data.items[item.id].status = item.status;
                        change.status = item.status;
                        hasChange = true;
                    }

                    if (item.content && item.content !== data.content) {
                        Data.items[item.id].content = item.content;
                        change.content = item.content;
                        hasChange = true;
                    }

                    if (hasChange) {
                        changed.push(change);
                    }
                }
            }

            return { items: changed };
        }
    };
};
