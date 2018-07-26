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
            
            ctrl.verifyinfor = [];
            var url = "list/"
            // Init

            // funciton
            ctrl.onSubmitClicked = function(infor){
                url = url + infor.phone + "/" + infor.name
                daydreamshared.userInfo(infor.name, infor.phone);
                daydreamshared.goToPage(url);
            }

            /*Initialize*/
            ctrl.$onInit = function () {

            };

        }]
});