angular.module('main', [
    'ui.bootstrap',
    'ui.router',
    'core'
]).
component('main',{
    templateUrl : 'view-main/main.template.html',
    controller : [
        '$scope', 
        'daydreamshared',
        'restService',
        '$http',
        '$window',
        function mainController($scope, daydreamshared, restService, $http, $window){
            var ctrl = this;
            
            ctrl.boinfor = [];
            ctrl.imageurl = "http://"+ $window.location.host + "/image/";
            ctrl.imagename = [];

            // Init
            var url = "deposit"
            var setTime;
            var isupload = false;

            var putUser = function(req_body){
                restService.user.getUser({
                    name : req_body.name,
                    phone : req_body.phone
                }).$promise.then(function(response){
                    // 가입되어 있는 회원이 존재
                    if(response.length == 1){
                        req_body.userid = response[0].id;
                        putProduct(req_body);
                    }

                    // 신규 가입
                    if(response.length == 0){
                        restService.user.putUser({
                        },{
                            name : req_body.name,
                            phone : req_body.phone

                        }).$promise.then(function(response){
                            console.log('신규가입')
                            console.log(response);
                            restService.user.getUser({
                                name : req_body.name,
                                phone : req_body.phone
                            }).$promise.then(function(response){
                                req_body.userid = response[0].id;
                                putProduct(req_body);
                            })
                        })
                    }else{
                        console.log('Error Main Component User API');
                    }
                    sendMail(req_body);
                })
            }

            var putProduct = function(req_body){
                restService.products.postProductsList({
                }, {
                    userid : req_body.userid,
                    mname : req_body.mname,
                    mphone : req_body.mphone,
                    address : req_body.address,
                    exnumber : req_body.exnumber,
                    contents : req_body.contents,
                    comment : req_body.comment

                }).$promise.then(function(response){
                    console.log('Sucess POST Products in Client');
                    console.log(response);
                    ctrl.boinfor = null
                    alert('Sucess');
                    
                    daydreamshared.goToPage(url);

                })
            }

            var sendMail = function(req_body){
                restService.mail.sendMail({
                    name : req_body.name,
                    phone : req_body.phone,
                    img1 : ctrl.imagename[0],
                    img2 : ctrl.imagename[1],
                    img3 : ctrl.imagename[2],
                    img4 : ctrl.imagename[3]
                }).$promise.then(function(response){
                    console.log('Success Send Mail');
                    console.log(response);
                })
            }

            var sendImage = function(image_file){
                var file = image_file;
                var uploadUrl = "/api/v0.1.1/mail/sendImage";
                var fd = new FormData();
                fd.append('imagefile', file);
                
        
                $http.post(uploadUrl,fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                    ctrl.imagename.push($scope.imagefile.name);
                    document.getElementById("main-inputImage").value = "";
                })
            }

            var deleteAll = function(){
                var delete_data = ctrl.imagename;
                restService.mail.deleteAll({
                    img : delete_data
                }).$promise.then(function(response){
                    console.log(response);
                })
            }

            // funciton
            ctrl.onClickSubmit = function(infor){
                var req_body = []
                var err_code = 200;

                if(infor != null){

                }else{
                    err_code = 0;
                    console.log('입력필요')
                }

                if(infor.name != null){
                    ctrl.boinfor.name = infor.name
                }else{
                    err_code = 0;
                    console.log('이름 입력 필요');
                }

                if(infor.phone != null){
                    ctrl.boinfor.phone = infor.phone
                }else{
                    err_code = 0;
                    console.log('번호 입력 필요');
                }

                if(infor.mname != null){
                    ctrl.boinfor.mname = infor.mname
                }else{
                    err_code = 0;
                    console.log('매장이름 입력 필요');
                }

                if(infor.mphone != null){
                    ctrl.boinfor.mphone = infor.mphone
                }else{
                    err_code = 0;
                    console.log('매장 번호 입력 필요');
                }

                if(infor.address != null){
                    ctrl.boinfor.address = infor.address
                }else{
                    err_code = 0;
                    console.log('주소 입력 필요');
                }

                if(infor.exnumber > 0 || ctrl.boinfor.exnumber != null){
                    ctrl.boinfor.exnumber = infor.exnumber
                }else{
                    err_code = 0;
                    console.log('체험단 명수 입력 필요');
                }
                
                if(ctrl.imagename.length != 4){
                    err_code = 0;
                    console.log('이미지 4장 업로드 필요');
                }

                if(infor.comment != null){
                    ctrl.boinfor.comment = infor.comment
                }else{
                    ctrl.boinfor.comment = ""
                }


                req_body = ctrl.boinfor;

                if(err_code == 200){
                    isupload = true;
                    // putUser(req_body);
                    sendMail(req_body)
                }
            }

            ctrl.onClickImage = function(){
                var file = $scope.imagefile;

                if(ctrl.imagename.length > 3){
                    console.log('이미지는 최대 4장입니다.');
                }else{
                    sendImage(file);
                }

            }

            ctrl.onClickDeleteImage = function(img, index){
                restService.mail.deleteImage({
                    name : img
                }).$promise.then(function(response){
                    ctrl.imagename.splice(index, 1);
                })
            }

            $scope.$on('$destroy', function() {
                clearTimeout(setTime);
                if(ctrl.imagename.length > 0 && isupload == false){
                    deleteAll();
                }
            });
            
            $window.onbeforeunload = function(e){
                if(ctrl.imagename.length > 0 && isupload == false){
                    deleteAll();
                }
            }


            /*Initialize*/
            ctrl.$onInit = function () {
                $scope.masterLogin = false;
                deleteAll();
                setTime = setTimeout(function(){

                    if(ctrl.imagename.length > 0 && isupload == false){
                        deleteAll();
                    }

                }, 12000);
            };

        }]
});