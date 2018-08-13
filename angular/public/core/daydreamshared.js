'use strict';

angular.module('core.daydreamshared', [
    'core'
])
.factory('daydreamshared', [
    '$rootScope',
    '$window',
    '$log',
    function($rootScope, $window, $log){
        var hello = function(){
            console.log('hello shared')
        }

        var goToPage = function(desUrl){
            var url = "http://"+ $window.location.host + "/#!/";
            url = url + desUrl;
            $log.log(url);
            $window.location.href = url;
        }

        var showAlert = function(msg, type){
            $rootScope.type = type;
            $rootScope.msg = msg;
            console.log($rootScope)
            $rootScope.onShowAlert(msg, type)
        }


        return {
            hello: hello,
            goToPage: goToPage,
            showAlert: showAlert
        };

    }
])