angular.module('imageUpload',[
    'core',
]).
directive('imageUpload',['$parse', function($parse){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            var model = $parse(attrs.imageUpload);
            var modelSetter = model.assign;

            element.bind('change', function(){
                var size = element[0].files[0].size;
                var file_name = element[0].files[0].name;
                var file_extension = element[0].files[0].type;

                if(size > 4000000){
                    console.log('사이즈 4MB이상');
                    document.getElementById("main-inputImage").value = "";
                    
                }
                else if(file_extension != 'image/jpeg' && file_extension != 'image/png'){
                    console.log('지원하지 않는 확장자');
                    document.getElementById("main-inputImage").value = "";
                }
                else{
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                }
            })
        }
    }
}]);