var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'core',

    // Route
    'main',
    'list'
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
    when('/list',{
        template : '<list></list>'
    }).
    otherwise({redirectTo: '/main'});
});

Myapp.controller('Mycontroller', function($scope, $state){
    console.log('Hello Frist controller');
    $scope.state = $state;
    console.log($scope.state);
});