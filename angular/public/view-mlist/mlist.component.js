angular.module('mlist', [
    'ui.bootstrap',
    'core'
]).
component('mlist',{
    templateUrl : 'view-mlist/mlist.template.html',
    controller : [
        '$scope', 
        '$routeParams', 
        'daydreamshared',
        'restService',
        function mlistController($scope, $routeParams, daydreamshared, restService){
            var ctrl = this;
            var mlist_params = [];
            
            ctrl.list_data = [];
            
            // Init
            var initParams = function(){

                mlist_params.id = $routeParams.id;
                mlist_params.userid = $routeParams.userid;

            }
            
            var getProductData = function(userid, listid){
                restService.user.getUserId({
                    userid : userid
                }).$promise.then(function(response){
                    ctrl.list_data.name = response[0].name;
                    ctrl.list_data.phone = response[0].phone;
                });
                
                restService.products.getProductsListId({
                    id : listid
                }).$promise.then(function(response){
                    ctrl.list_data.address = response[0].address;
                    ctrl.list_data.comment = response[0].comment;
                    ctrl.list_data.completeAll = response[0].completeAll;
                    ctrl.list_data.completeEx = response[0].completeEx;
                    ctrl.list_data.contents = response[0].contents;
                    ctrl.list_data.date = response[0].date;
                    ctrl.list_data.deposit = response[0].deposit;
                    ctrl.list_data.exnumber = response[0].exnumber;
                    ctrl.list_data.mname = response[0].mname;
                    ctrl.list_data.mphone = response[0].mphone;
                });
                
                console.log(ctrl.list_data)
            }
            
            // funciton
            
            /*Initialize*/
            ctrl.$onInit = function () {
                initParams();
                getProductData(mlist_params.userid, mlist_params.id);
            };

        }]
});