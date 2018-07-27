var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'core',

    // Route
    'main',
    'list',
    'deposit',
    'verify',
    'master',
    'mlist'
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
    otherwise({redirectTo: '/main'});
});

Myapp.controller('Mycontroller', function($scope, $state){
    $scope.state = $state;
    console.log($scope.state);
});