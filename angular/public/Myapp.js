var Myapp = angular.module('Myapp',[   
    'ngRoute',
    'ngResource',
    'ngAnimate',
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
    // Alert
    $scope.alerts = [];
    $scope.show_alert = false
    $scope.$on('showAlert', function(event, data){
        $scope.show_alert = true;
        $scope.alerts.push({
            msg : data.msg,
            type : data.type
        })
    });
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
});