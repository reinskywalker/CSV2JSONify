'use strict';

class SetStrings {
    trimPropertyName(value) {
        return value.replace(/\s/g, '');
    }

    getValueFormatByType(value) {
        if (!value || value === '') {
            return '';
        }

        if (!isNaN(value)) {
            return Number(value);
        }

        const lowerCaseValue = value.toLowerCase();
        if (lowerCaseValue === 'true' || lowerCaseValue === 'false') {
            return JSON.parse(lowerCaseValue);
        }

        return String(value);
    }

    hasContent(values) {
        return values.some(value => !!value);
    }
}

module.exports = new SetStrings();
