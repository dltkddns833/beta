angular.module('imageUpload',[
    'core',
]).
directive('imageUpload',['$parse', function($parse){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            var model = $parse(attrs.imageUpload);
            var modelSetter = model.assign;

            var showAlert = function(msg){
                var alert ={
                    msg : msg,
                    type : 'danger'
                }
                scope.$emit('showAlert', alert)
            }

            element.bind('change', function(){
                var file_data = element[0].files
                var size = [];
                var file_name = [];
                var file_extension = [];
                var req_data = [];
                // var size = element[0].files[0].size;
                // var file_name = element[0].files[0].name;
                // var file_extension = element[0].files[0].type;


                for(var index = 0; index < file_data.length; index++){
                    // size.push(file[index].size)
                    // file_name.push(file[index].name)
                    // file_extension.push(file[index].type)
                    size = file_data[index].size
                    file_name = file_data[index].name
                    file_extension = file_data[index].type
                    if(size > 4000000){
                        showAlert('이미지 사이즈가 4MB 이하만 업로드 가능합니다.');
                    }
                    else if(file_extension != 'image/jpeg' && file_extension != 'image/png'){
                        showAlert('지원하지 않는 확장자 입니다. (jpg, png만 가능)')
                    }
                    else{
                        req_data.push(file_data[index])
                        // scope.$apply(function(){
                            //     modelSetter(scope, element[0].files[0]);
                            // });
                        }
                    }
                    
                    scope.$apply(function(){
                        modelSetter(scope, req_data);
                    });
            })
        }
    }
}]);