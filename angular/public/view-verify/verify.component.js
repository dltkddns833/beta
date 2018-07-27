angular.module('verify', [
    'ui.bootstrap',
    'core'
]).
component('verify',{
    templateUrl : 'view-verify/verify.template.html',
    controller : [
        '$scope',
        '$window',
        '$log', 
        'daydreamshared',
        'restService',
        function verifyController($scope, $window, $log, daydreamshared, restService){
            var ctrl = this;
            
            ctrl.verifyinfor = 0;
            var url = "list/"
            // Init

            // funciton
            ctrl.onSubmitClicked = function(infor){
                restService.user.getUser({
                    name : infor.name,
                    phone : infor.phone
                }).$promise.then(function(response){
                    console.log(response)
                    if(response.length == 1 && response[0].part == 0){
                        ctrl.verifyinfor = response[0].id;

                        url = url + ctrl.verifyinfor;
                        daydreamshared.goToPage(url);

                    }
                    else if(response.length == 1 && response[0].part == 2){
                        $scope.masterLogin = true;
                        console.log($scope.masterLogin);
                        url = "master/"
                        ctrl.verifyinfor = response[0].id;

                        url = url + ctrl.verifyinfor + "/" + response[0].name + "/" + response[0].phone + "/main";
                        daydreamshared.goToPage(url);
                    }else{
                        alert('등록된 내역이 없습니다.');
                    }
                })

            }

            /*Initialize*/
            ctrl.$onInit = function () {

            };

        }]
});