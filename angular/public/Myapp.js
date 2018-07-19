var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ui.bootstrap',
    'main',
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
    otherwise({redirectTo: '/main'});
});

Myapp.controller('Mycontroller', function($scope, $state){
    console.log('Hello Frist controller');
    $scope.state = $state;
    console.lot($scope.state);
});