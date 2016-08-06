'use strict';

header.$inject = [];
function header() {
    return {
        name: 'header',
        template: require('./templates/header.html')
    }
}

module.exports = header;
