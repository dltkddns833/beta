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
        '$window',
        '$log',
        function mainController($scope, daydreamshared, restService, $window, $log){
            var ctrl = this;
            
            ctrl.boinfor = []

            // Init
            var url = "http://"+ $window.location.host + "#!/deposit"
            // funciton
            ctrl.onClickSubmit = function(infor){
                var req_body = []

                ctrl.boinfor.name = infor.name
                ctrl.boinfor.phone = infor.phone
                ctrl.boinfor.mphone = infor.mphone
                ctrl.boinfor.address = infor.address
                ctrl.boinfor.exnumber = infor.exnumber
                ctrl.boinfor.passwd= infor.passwd
                
                daydreamshared.hello();

                if(infor.comment != null){
                    ctrl.boinfor.comment = infor.comment
                }else{
                    ctrl.boinfor.comment = ""
                }

                console.log(ctrl.boinfor)
                req_body = ctrl.boinfor;

                restService.products.postProductsList({
                }, {
                    name : req_body.name,
                    phone : req_body.phone,
                    mphone : req_body.mphone,
                    address : req_body.address,
                    exnumber : req_body.exnumber,
                    passwd : req_body.passwd,
                    comment : req_body.comment

                }).$promise.then(function(response){
                    console.log('Sucess POST Products in Client');
                    console.log(response);
                    ctrl.boinfor = null
                    alert('Sucess');
                    // location.reload();
                    $log.log(url);
                    $window.location.href = url;

                })
            }

            /*Initialize*/
            ctrl.$onInit = function () {

            };

        }]
});