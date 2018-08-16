angular.module('deposit', [
    'ui.bootstrap',
    'core'
]).
component('deposit',{
    templateUrl : 'view-deposit/deposit.template.html',
    controller : [
        '$scope', 
        '$rootScope',
        'daydreamshared',
        'restService',
        function depositController($scope, $rootScope, daydreamshared, restService){
            var ctrl = this;
            

            // Init

            // funciton
            ctrl.onTest = function(msg, type){
                var alert ={
                    msg : msg,
                    type : type
                }
                $scope.$emit('showAlert', alert)
            }

            /*Initialize*/
            ctrl.$onInit = function () {

            };

        }]
});