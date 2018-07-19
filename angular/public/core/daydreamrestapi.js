'use strict';

angular.module('core.daydreamrestApi', [
    'core',
    'ngRoute'
])
.factory('restService', [
    '$resource',
    function($resource){
        var hello = function(){
            console.log('hello restService')
        }


        return {
            hello: hello 
        };

    }
])