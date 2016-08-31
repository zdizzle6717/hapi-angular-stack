'use strict';

deleteRecordModal.$inject = ['DirectorService', 'MovieService'];
function deleteRecordModal(DirectorService, MovieService) {
    return {
        name: 'deleteRecordModal',
        template: require('./templates/deleteRecordModal.html'),
        transclude: true,
        scope: {
            delete: '&?'
        },
        link: function link(scope, elem, attrs) {
            scope.show = false;
            scope.deleteRecord = deleteRecord;
            scope.closeModal = closeModal;
            scope.deleteRecord = deleteRecord;

            ////////////////////

            let listener = scope.$on('show:modal', function(event, args) {
                scope.id = args.id;
                scope.index = args.index;
                scope.identifier = args.identifier;
                scope.show = args.toggle === true ? true : false;
            });

            scope.$on('$destroy', listener);

            function deleteRecord(id, index) {
                scope.delete({
                    id: id,
                    index: index
                });
                scope.show = false;
            }

            function closeModal() {
                scope.show = false;
            }

        }
    };
}

module.exports = deleteRecordModal;
