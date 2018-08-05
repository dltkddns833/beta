angular.module('imageUpload',[
    'core',
]).
directive('imageUpload',['$parse', function($parse){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            console.log('directive');
            var model = $parse(attrs.imageUpload);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            })
        }
    }
}]);