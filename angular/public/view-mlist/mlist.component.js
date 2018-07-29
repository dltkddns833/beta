angular.module('mlist', [
    'ui.bootstrap',
    'core'
]).
component('mlist',{
    templateUrl : 'view-mlist/mlist.template.html',
    controller : [
        '$scope', 
        '$routeParams',
        '$window', 
        'daydreamshared',
        'restService',
        function mlistController($scope, $routeParams, $window, daydreamshared, restService){
            var ctrl = this;
            var mlist_params = [];
            
            ctrl.list_data = [];
            ctrl.exuser_data = [];
            
            // Init
            // Get Params
            var initParams = function(){
                mlist_params.id = $routeParams.id;
                mlist_params.userid = $routeParams.userid;

            }
            
            // Get product Infor
            var getProductData = function(userid, listid){
                restService.user.getUserId({
                    userid : userid
                }).$promise.then(function(response){
                    ctrl.list_data.name = response[0].name;
                    ctrl.list_data.phone = response[0].phone;
                });
                
                restService.products.getProductsListId({
                    id : listid
                }).$promise.then(function(response){
                    ctrl.list_data.address = response[0].address;
                    ctrl.list_data.comment = response[0].comment;
                    ctrl.list_data.completeAll = response[0].completeAll;
                    ctrl.list_data.completeEx = response[0].completeEx;
                    ctrl.list_data.contents = response[0].contents;
                    ctrl.list_data.date = response[0].date;
                    ctrl.list_data.deposit = response[0].deposit;
                    ctrl.list_data.exnumber = response[0].exnumber;
                    ctrl.list_data.mname = response[0].mname;
                    ctrl.list_data.mphone = response[0].mphone;
                });
            }

            // 체험단
            var getExuserData = function(id){
                restService.exuser.getExuserId({
                    listid : id
                }).$promise.then(function(response){
                    console.log(response);
                    ctrl.exuser_data = response;
                })
            }
            
            var insertExuserData = function(id, exinfor){
                restService.exuser.postExuser({
                },{
                    listid : id,
                    name : exinfor.name,
                    nickname : exinfor.nickname,
                    phone : exinfor.phone,
                    gender : exinfor.gender,
                    blog : exinfor.blog

                }).$promise.then(function(response){
                    console.log(response);
                    location.reload();
                })
            }

            var modifyExuserData = function(id, exinfor){
                restService.exuser.putExuser({
                },{
                    listid : id,
                    name : exinfor.name,
                    nickname : exinfor.nickname,
                    phone : exinfor.phone,
                    gender : exinfor.gender,
                    blog : exinfor.blog,
                    cancel : exinfor.cancel,
                    complete : exinfor.complete
                }).$promise.then(function(response){
                    alert('Sucess');
                    location.reload();
                })
            }

            var deleteExuserData = function(id){
                restService.exuser.deleteExuser({
                    id : id
                },{
                }).$promise.then(function(response){
                    alert('Sucess');
                    location.reload();
                })
            }

            // funciton
            ctrl.onClickExuser = function(exuser){
                var listid = mlist_params.id;
                insertExuserData(listid, exuser);
            }

            ctrl.onClickExuserModify = function(id, infor){
                modifyExuserData(id, infor);
            }

            ctrl.onClickDeleteExuser = function(id){
                deleteExuserData(id);
            }
            
            /*Initialize*/
            ctrl.$onInit = function () {
                initParams();
                getProductData(mlist_params.userid, mlist_params.id);
                getExuserData(mlist_params.id);
            };

        }]
});