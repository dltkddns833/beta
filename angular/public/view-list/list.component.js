angular.module('list', [
    'core',
    'ui.bootstrap'
]).
component('list',{
    templateUrl : 'view-list/list.template.html',
    controller : [
        '$scope', 
        'daydreamshared',
        'restService',
        function listController($scope, daydreamshared, restService){
            var ctrl = this;
            
            ctrl.list = []

            // Init
            var reqlist = function(){
                console.log('Request List');
                restService.products.getProductsList({
                    
                }).$promise.then(function(response){
                    console.log('Mysql Response');
                    console.log(response);
                    ctrl.list = response;
                })
            }

            // funciton
            ctrl.onClickDeleteButton = function(id){
                console.log('Delete List')
                restService.products.deleteProductsList({
                    listId : id
                }).$promise.then(function(response){
                    console.log('Compelete Delete')
                    location.reload();
                })
            }

            /*Initialize*/
            ctrl.$onInit = function () {
                reqlist();
            };

        }]
});