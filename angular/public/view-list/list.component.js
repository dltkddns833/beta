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

            var url = 'dlist';
            
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

            // funciton
            ctrl.onClickDeleteButton = function(id){
                restService.products.deleteProductsList({
                    listId : id
                }).$promise.then(function(response){
                    location.reload();
                })
            }

            // ctrl.onClickshowExuser = function(id){
            //     getExuserData(id);
            // }

            ctrl.onClickDetail = function(name, id){
                url = url + '/' + name + '/' + id
                daydreamshared.goToPage(url);
            }

            /*Initialize*/
            ctrl.$onInit = function () {
                reqlist();
            };

        }]
});