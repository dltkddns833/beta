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
        '$log',
        function mainController($scope, daydreamshared, restService, $http, $log){
            var ctrl = this;
            
            ctrl.boinfor = [];
            ctrl.imageurl = [];

            // Init
            var url = "deposit"

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
                    phone : req_body.phone
                }).$promise.then(function(response){
                    console.log('Success Send Mail');
                    console.log(response);
                })
            }

            // funciton
            ctrl.onClickSubmit = function(infor){
                var req_body = []

                ctrl.boinfor.name = infor.name
                ctrl.boinfor.phone = infor.phone
                ctrl.boinfor.mname = infor.mname
                ctrl.boinfor.mphone = infor.mphone
                ctrl.boinfor.address = infor.address
                ctrl.boinfor.exnumber = infor.exnumber
                ctrl.boinfor.contents = infor.contents
                ctrl.boinfor.userid = 0
                
                daydreamshared.hello();

                if(infor.comment != null){
                    ctrl.boinfor.comment = infor.comment
                }else{
                    ctrl.boinfor.comment = ""
                }

                console.log(ctrl.boinfor)

                req_body = ctrl.boinfor;

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

            ctrl.onClickImage = function(){
                console.log($scope.imagefile)
                var file = $scope.imagefile;
                var uploadUrl = "/api/v0.1.1/mail/sendImage";
                var fd = new FormData();
                fd.append('imagefile', file);
        
                $http.post(uploadUrl,fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                    ctrl.imageurl.push($scope.imagefile.name)
                    console.log(ctrl.imageurl)
                })
            }

            ctrl.onClickDeleteImage = function(img, index){
                restService.mail.deleteImage({
                    name : img
                }).$promise.then(function(response){
                    ctrl.imageurl.splice(index, 1);
                })
            }

            /*Initialize*/
            ctrl.$onInit = function () {
                $scope.masterLogin = false;
            };

        }]
});