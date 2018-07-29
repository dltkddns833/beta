angular.module('list', [
    'core',
    'ui.bootstrap'
]).
component('list',{
    templateUrl : 'view-list/list.template.html',
    controller : [
        '$scope',
        '$routeParams', 
        'daydreamshared',
        'restService',
        function listController($scope, $routeParams, daydreamshared, restService){
            var ctrl = this;
            
            var userInfo = [
                userid = null
            ]

            ctrl.user = [
                name = null,
                phone = null
            ]

            ctrl.exuser_data = [];



            // Init
            var reqlist = function(){
                userInfo.userid = $routeParams.userid;

                restService.user.getUserId({
                    userid : userInfo.userid
                }).$promise.then(function(response){
                    console.log(response);
                    ctrl.user.name = response[0].name;
                    ctrl.user.phone = response[0].phone;
                })
                getlist(userInfo.userid);
            }

            var getlist = function(id){
                restService.products.getProductsList({
                    userid : id
                },{

                }).$promise.then(function(response){
                    ctrl.list = response;
                })
            }

            var getExuserData = function(id){
                restService.exuser.getExuserId({
                    listid : id
                }).$promise.then(function(response){
                    ctrl.exuser_data = response;
                    console.log(ctrl.exuser_data)
                })
            }

            // funciton
            ctrl.onClickDeleteButton = function(id){
                restService.products.deleteProductsList({
                    listId : id
                }).$promise.then(function(response){
                    location.reload();
                })
            }

            ctrl.onClickshowExuser = function(id){
                getExuserData(id);
            }

            /*Initialize*/
            ctrl.$onInit = function () {
                reqlist();
            };

        }]
});