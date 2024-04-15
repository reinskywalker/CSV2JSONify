'use strict';

class setJson {

    validateJson(json) {
        try {
            JSON.parse(json);
        } catch (err) {
            throw Error('Parsed csv has generated an invalid json!!!\n' + err);
        }
    }

}

module.exports = new setJson();