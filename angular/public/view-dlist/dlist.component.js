angular.module('dlist', [
    'ui.bootstrap',
    'core'
]).
component('dlist',{
    templateUrl : 'view-dlist/dlist.template.html',
    controller : [
        '$scope',
        '$routeParams', 
        'daydreamshared',
        'restService',
        function dlistController($scope, $routeParams, daydreamshared, restService){
            var ctrl = this;
            
            ctrl.route_params= [];
            ctrl.product_data = [];
            ctrl.exuser_data = [];

            // Init
            var getRouteParams =  function(){
                ctrl.route_params.name = $routeParams.userName;
                ctrl.route_params.listid = $routeParams.id;
                console.log(ctrl.route_params)
                getProductData(ctrl.route_params.listid);
            }

            var getProductData = function(id){
                restService.products.getProductsListId({
                    id : id  
                }).$promise.then(function(response){
                    ctrl.product_data = response[0];
                    console.log(ctrl.product_data)
                    getExuserData(id);
                });
            }

            var getExuserData = function(id){
                restService.exuser.getExuserId({
                    listid : id
                }).$promise.then(function(response){
                    ctrl.exuser_data = response;
                })
            }


            // funciton
            
            /*Initialize*/
            ctrl.$onInit = function () {
                getRouteParams();
            };

        }]
});