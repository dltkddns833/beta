angular.module('master', [
    'ui.bootstrap',
    'core'
]).
component('master',{
    templateUrl : 'view-master/master.template.html',
    controller : [
        '$scope',
        '$routeParams',
        'daydreamshared',
        'restService',
        function masterController($scope, $routeParams, daydreamshared, restService){
            var ctrl = this;
            
            var option = [];
            ctrl.masterInfo = []
            ctrl.masterState = "main";

            ctrl.res_list = []
            
            // Init
            var initMaster = function(){
                ctrl.masterInfo.id = $routeParams.userid,
                ctrl.masterInfo.name = $routeParams.masterName,
                ctrl.masterInfo.phone = $routeParams.masterPhone
                
                getRouteParams();

                if(ctrl.masterState == 'main'){
                    restService.products.getProductsListAll({

                    }).$promise.then(function(response){
                        ctrl.res_list = response;
                    })
                }else{
                    getProduct(option);
                }
            }

            var getRouteParams = function(){
                ctrl.masterState = $routeParams.masterState;
                option.deposit = 'N';
                option.completeEx = 'N';
                option.completeAll = 'N';

                if(ctrl.masterState == 'deposit'){
                    option.deposit = 'Y';
                }
                if(ctrl.masterState == 'progress'){
                    option.deposit = 'Y';
                    option.completeEx = 'Y';
                }
                if(ctrl.masterState == 'complete'){
                    option.deposit = 'Y';
                    option.completeEx = 'Y';
                    option.completeAll = 'Y';
                }
            }

            var getProduct = function(op){
                restService.products.getProductsOption({
                    deposit : op.deposit,
                    completeEx : op.completeEx,
                    completeAll : op.completeAll
                }).$promise.then(function(response){
                    console.log(response);
                    ctrl.res_list = response;
                })
            }

            // funciton
           ctrl.onChangeParamsClicked = function(params){
               var url = "master/" + ctrl.masterInfo.id + "/" + ctrl.masterInfo.name + "/" + ctrl.masterInfo.phone + "/"
               $routeParams.masterState = params;
               ctrl.masterState = $routeParams.masterState;
               url = url + ctrl.masterState;
               daydreamshared.goToPage(url);
           }

           ctrl.onListClicked = function(userid, id){
               var url = "mlist/" + userid + "/" + id;
               daydreamshared.goToPage(url);
           }


            /*Initialize*/
            ctrl.$onInit = function () {
                // if(!$scope.masterLogin){
                //     alert('접근 불가능한 페이지입니다.');
                //     daydreamshared.goToPage();
                // }
                initMaster();
            };

        }]
});