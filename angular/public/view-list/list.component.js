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
                name = null,
                phone = null,
                userid = null
            ]

            ctrl.user = [
                name = null,
                phone = null
            ]



            // Init
            var reqlist = function(){
                console.log('Request List');

                console.log($routeParams)
                userInfo.name = $routeParams.userName;
                userInfo.phone = $routeParams.userNumber;

                restService.user.getUser({
                    name : userInfo.name,
                    phone : userInfo.phone
                }).$promise.then(function(response){
                    console.log(response)
                    if(response.length == 1){
                        userInfo.userid = response[0].id;
                        ctrl.user.name = userInfo.name;
                        ctrl.user.phone = userInfo.phone;
                        getlist(userInfo.userid);
                    }else{
                        alert('등록된 내역이 없습니다.');
                    }
                })
            }

            var getlist = function(id){
                restService.products.getProductsList({
                    userid : id
                },{

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