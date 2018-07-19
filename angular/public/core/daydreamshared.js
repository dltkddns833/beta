'use strict';

angular.module('core.daydreamshared', [
    'core'
])
.factory('daydreamshared', [
    '$rootScope',
    function($rootScope){
        var hello = function(){
            console.log('hello')
        }


        return {
            hello: hello 
        };

    }
])