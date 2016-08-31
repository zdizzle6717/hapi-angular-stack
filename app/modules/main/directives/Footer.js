'use strict';

footer.$inject = [];
function footer() {
    return {
        name: 'footer',
        template: require('./templates/footer.html')
    }
}

module.exports = footer;
