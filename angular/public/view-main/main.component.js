angular.module('main',[
    'ui.bootstrap',
]);

angular.module('main', [
    'core'
]).
component('main',{
    templateUrl : 'view-main/main.template.html',
    controller : [
        '$scope', 
        'daydreamshared',
        function mainController($scope, daydreamshared){
            var ctrl = this;
            
            ctrl.boinfor = []


            // funciton
            ctrl.onClickSubmit = function(infor){
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
            }

        }]
});