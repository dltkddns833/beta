angular.module('deposit', [
    'ui.bootstrap',
    'core'
]).
component('deposit',{
    templateUrl : 'view-deposit/deposit.template.html',
    controller : [
        '$scope', 
        'daydreamshared',
        'restService',
        function mainController($scope, daydreamshared, restService){
            var ctrl = this;
            

            // Init

            // funciton
            
            /*Initialize*/
            ctrl.$onInit = function () {

            };

        }]
});