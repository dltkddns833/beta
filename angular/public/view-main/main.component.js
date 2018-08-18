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
            
            ctrl.boinfor = {
                name : null,
                phone : null,
                mname : null,
                mphone : null,
                address : null,
                exnumber : 1,
                contents : null
            };
            ctrl.loginState = false;
            ctrl.uploadState = false;
            ctrl.isNewProduct = true;
            ctrl.isPreProduct = false;
            ctrl.imageurl = "http://"+ $window.location.host + "/image/";
            ctrl.imagename = [];
            ctrl.productList = [];
            ctrl.preproductData = [];

            // Init
            var url = "deposit"
            var setTime;
            var isupload = false;
            var productUserId = null;

            var putUser = function(req_body){
                restService.user.getUser({
                    name : req_body.name,
                    phone : req_body.phone
                }).$promise.then(function(response){
                    // 가입되어 있는 회원이 존재
                    if(response.length == 1){
                        req_body.userid = response[0].id;
                        productUserId = req_body.userid;
                        // putProduct(req_body);
                        getProduct(req_body);
                    }

                    // 신규 가입
                    else if(response.length == 0){
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
                                productUserId = req_body.userid;
                                // putProduct(req_body);
                            })
                        })
                    }else{
                        console.log('Error Main Component User API');
                    }
                    // sendMail(req_body);
                    // daydreamshared.goToPage(url);
                })
            }

            var getProduct = function(req_body){
                restService.products.getProductsList({
                    userid : req_body.userid
                }).$promise.then(function(response){
                    console.log(response);
                    for(var index in response){
                        if(response[index].completeAll === 'N')
                        ctrl.productList.push(response[index]);
                    }
                    // ctrl.productList = response;
                })
            }

            var postProduct = function(req_body){
                restService.products.postProductsList({
                }, {
                    userid : productUserId,
                    mname : req_body.mname,
                    mphone : req_body.mphone,
                    address : req_body.address,
                    exnumber : req_body.exnumber,
                    contents : req_body.contents

                }).$promise.then(function(response){
                    console.log('Sucess POST Products in Client');
                    console.log(response);
                    ctrl.boinfor = null
                    // alert('Sucess');
                    
                    // daydreamshared.goToPage(url);

                })
            }

            var putProduct = function(req_body, id){
                restService.products.putProductsList({

                }, {
                    listid : id,
                    userid : productUserId,
                    mname : req_body.mname,
                    mphone : req_body.mphone,
                    address : req_body.address,
                    exnumber : req_body.exnumber,
                    contents : req_body.contents,
                    deposit : 'N',
                    completeEx : 'N',
                    completeAll : 'N'
                }).$promise.then(function(response){
                    console.log('Success PUT Products in Client');
                    console.log(response);

                })
            }

            var sendMail = function(req_body){
                restService.mail.sendMail({
                    name : req_body.name,
                    phone : req_body.phone,
                    mname : req_body.mname,
                    mphone : req_body.mphone,
                    address : req_body.address,
                    exnumber : req_body.exnumber,
                    contents : req_body.contents,
                    img1 : ctrl.imagename[0],
                    img2 : ctrl.imagename[1],
                    img3 : ctrl.imagename[2],
                    img4 : ctrl.imagename[3]
                }).$promise.then(function(response){
                    console.log(response);
                    console.log(response[0]+response[1]);
                    if(response[0]+response[1] == 'OK'){
                        ShowAlert('이메일이 성공적으로 발송되었습니다.', 'success');
                        daydreamshared.goToPage(url);
                    }else{
                        ShowAlert('이메일 발송에 실패하였습니다.')
                    }
                })
            }

            var sendImage = function(image_file){
                var file = image_file;
                var uploadUrl = "/api/v0.1.1/mail/sendImage";
                var fd = new FormData();
                var file_size = file.length + ctrl.imagename.length
                var state = 200;

                if(file_size > 4){
                    ShowAlert('이미지는 4장만 업로드 할 수 있습니다.');
                    state = 400;
                }

                for(var i in file){
                    for(var j in ctrl.imagename){
                        if(file[i].name === ctrl.imagename[j]){
                            ShowAlert('같은 이미지가 존재합니다.');
                            state = 400;
                        }
                    }
                }

                for(var index = 0; index < $scope.imagefile.length; index++){
                    fd.append('imagefile', file[index]);
                }
                
                if(state == 200){
                    $http.post(uploadUrl,fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function(response){
                        for(var index = 0; index < $scope.imagefile.length; index++){
                            ctrl.imagename.push($scope.imagefile[index].name);
                        }
                        document.getElementById("main-inputImage").value = "";
                        $scope.imagefile = null;
                    })
                }
            }

            var deleteAll = function(){
                var delete_data = ctrl.imagename;
                restService.mail.deleteAll({
                    img : delete_data
                }).$promise.then(function(response){
                    console.log(response);
                    ctrl.imagename = [];
                })
            }

            var ShowAlert = function(msg, type){
                if(type == null){
                    type = 'danger'
                }
                var alert ={
                    msg : msg,
                    type : type
                }
                $scope.$emit('showAlert', alert)
            }

            // funciton
            ctrl.onClickExnumber = function(state, num){
                if(state == false && num == 0){
                    if(ctrl.boinfor.exnumber - 1 > 0){
                        ctrl.boinfor.exnumber = ctrl.boinfor.exnumber - 1;
                    }else{
                        ShowAlert('체험단은 1명이상 신청해야 합니다.');
                    }
                }else{
                    ctrl.boinfor.exnumber = ctrl.boinfor.exnumber + 1;
                }
                if(state == false && num == 1){
                    if(ctrl.preproductData.exnumber - 1 > 0){
                        ctrl.preproductData.exnumber = ctrl.preproductData.exnumber - 1;
                    }else{
                        ShowAlert('체험단은 1명이상 신청해야 합니다.');
                    }
                }else{
                    ctrl.preproductData.exnumber = ctrl.preproductData.exnumber + 1;
                }
            }

            ctrl.onClickVerifySubmit = function(infor){
                var err_code = 200;

                if(infor != null){

                }else{
                    err_code = 0;
                    ShowAlert('정보를 입력해주세요.');
                }

                if(infor.name != null){
                    ctrl.boinfor.name = infor.name
                }else{
                    err_code = 0;
                    ShowAlert('성함을 입력해주세요.');
                }

                if(infor.phone != null){
                    ctrl.boinfor.phone = infor.phone
                }else{
                    err_code = 0;
                    ShowAlert('연락처를 입력해주세요.');
                }

                if(err_code == 200){
                    ctrl.loginState = true;
                    putUser(infor);
                }
            }

            ctrl.onClickSubmit = function(infor){
                var req_body = []
                var err_code = 200;

                if(infor != null){

                }else{
                    err_code = 0;
                    ShowAlert('정보를 입력해주세요.');
                }

                if(infor.mname != null){
                    ctrl.boinfor.mname = infor.mname
                }else{
                    err_code = 0;
                    ShowAlert('상품명을 입력해주세요.');
                }

                if(infor.mphone != null){
                    ctrl.boinfor.mphone = infor.mphone
                }else{
                    err_code = 0;
                    ShowAlert('연락처를 입력해주세요.');
                }

                if(infor.address != null){
                    ctrl.boinfor.address = infor.address
                }else{
                    err_code = 0;
                    ShowAlert('주소를 입력해주세요.');
                }
                
                if(infor.contents != null){
                    ctrl.boinfor.contents = infor.contents
                }else{
                    err_code = 0;
                    ShowAlert('체험내역을 선택해주세요.');
                }

                if(ctrl.boinfor.exnumber != null){
                    
                }else{
                    err_code = 0;
                }
                
                if(ctrl.imagename.length != 4){
                    err_code = 0;
                    ShowAlert('이미지를 4장을 업로드 해주세요.');
                }

                req_body = ctrl.boinfor;
                console.log(req_body);
                if(err_code == 200){
                    isupload = true;
                    ctrl.uploadState = true;

                    sendMail(req_body)
                    if(ctrl.preproductData.completeAll === 'N'){
                        console.log('기존내역 업로드')
                        putProduct(req_body, ctrl.preproductData.id);
                    }else{
                        postProduct(req_body);
                    }
                    alert('신청 완료');
                    // daydreamshared.goToPage(url);
                }
            }

            ctrl.onClickPreProduct = function(data){
                ctrl.isPreProduct = true;
                ctrl.preproductData = data;
            }

            ctrl.onClickImage = function(){
                var file = $scope.imagefile;

                if(ctrl.imagename.length > 3){
                    ShowAlert('이미지는 4장만 업로드 가능합니다.');
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

                // 버그가 많음
                // setTime = setTimeout(function(){
                //     if(ctrl.imagename.length > 0 && isupload == false){
                //         console.log('delete')
                //         deleteAll();
                //     }

                // }, 10000);
            };

        }]
});