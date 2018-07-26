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

        var userInfo = function(name, phone){
            $rootScope.name = name;
            $rootScope.phone = phone;
        }

        var goToPage = function(desUrl){
            var url = "http://"+ $window.location.host + "/#!/";
            url = url + desUrl;
            $log.log(url);
            $window.location.href = url;
        }


        return {
            hello: hello,
            goToPage: goToPage,
            userInfo: userInfo
        };

    }
])