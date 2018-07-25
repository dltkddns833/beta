var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'core',

    // Route
    'main',
    'list',
    'deposit'
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
    when('/deposit',{
        template : '<deposit></deposit>'
    }).
    otherwise({redirectTo: '/main'});
});

Myapp.controller('Mycontroller', function($scope, $state){
    console.log('Hello Frist controller');
    $scope.state = $state;
    console.log($scope.state);
});