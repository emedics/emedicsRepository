MyApp.controller('DraftCtrl', function($scope, $ionicTabsDelegate, $http, $ionicPopup, $ionicHistory, $state, $timeout, gApp, Utils) {
    // event whenever enter the home screen.
    $scope.$on('$ionicView.enter', function(viewInfo, state) {
        gApp.loadAllInfo();
        $scope.patients = gApp.patients.list;
    });

    $scope.onPatients = function(pa, index){
        gApp.patient = pa;
        gApp.patient.bMnuID = index;
        gApp.bForm = true;

        $ionicHistory.clearHistory();
        $ionicTabsDelegate.select(0);
        
        $state.go('tabs.menu.forms');
    };

    $scope.onItemDelete1 = function(pa,index){
        if (index === 0)
        {
            for (var i = 1; i < pa.menus.length; i ++)
            {
                if (pa.menus[i].date != null)
                    break;
            }
            if (i === pa.menus.length){
                Utils.confirmPopupYesNo('Warning', 'Are you sure to delete this form?', 
                    function(){
                        var ind = $scope.patients.indexOf(pa);
                        $scope.patients.splice(ind, 1);
                        gApp.saveAllInfo();
                    },
                    function(){
                    });
                return;
            }
            Utils.confirmPopupYesNo('Warning', 'Do you want to delete all forms related ' + pa.name + '?', 
                function(){
                    var ind = $scope.patients.indexOf(pa);
                    $scope.patients.splice(ind, 1);
                    gApp.saveAllInfo();
                },
                function(){
                });
        }
        else
        {
            Utils.confirmPopupYesNo('Warning', 'Are you sure to delete this form?', 
                function(){
                    pa.menus.splice(index,1);
                    gApp.saveAllInfo(); 
                },
                function(){
                });
        }
    }

    $scope.onTitle = function(title, maxlen)
    {
        var sTitle = title;
        if (title.length > maxlen + 1)
            sTitle = title.substring(0, maxlen) + "...";
        return sTitle;
    }
})
