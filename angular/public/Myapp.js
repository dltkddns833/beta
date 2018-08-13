var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'core',

    //directive
    'imageUpload',

    // Route
    'main',
    'list',
    'deposit',
    'verify',
    'master',
    'mlist',
    'dlist'
]).
config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider.
    // when('/',{
    //     controller : 'Mycontroller',
    //     templateurl : 'index.html',
    // }).
    when('/main',{
        template : '<main></main>'
    }).
    when('/list/:userid',{
        template : '<list></list>'
    }).
    when('/deposit',{
        template : '<deposit></deposit>'
    }).
    when('/verify',{
        template : '<verify></verify>'
    }).
    when('/master/:userid/:masterName/:masterPhone/:masterState',{
        template : '<master></master>'
    }).
    when('/mlist/:userid/:id',{
        template : '<mlist></mlist>'
    }).
    when('/dlist/:userName/:id',{
        template : '<dlist></dlist>'
    }).
    otherwise({redirectTo: '/main'});
});

Myapp.controller('Mycontroller', function($scope, $rootScope, $state){
    $scope.state = $state;
    $scope.alert = [];
    console.log($scope.state);

    $rootScope.onShowAlert = function(msg, type){
        $scope.alert.push({
            type : type,
            msg : msg
        })
    }
});