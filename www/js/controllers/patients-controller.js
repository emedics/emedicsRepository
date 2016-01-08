
MyApp.controller('PatientsCtrl', function($scope, $ionicViewSwitcher, $http, $ionicPopup, $ionicHistory, $state, $timeout, gApp, Utils) {
    // event whenever enter the home screen.
    $scope.$on('$ionicView.enter', function(viewInfo, state) {
        //gApp.clearAllInfo();
        $ionicViewSwitcher.nextDirection('forward');
        $scope.model = {};
        $scope.model.searchFilter = '';
        $scope.model.sort = 'ID';
        $scope.model.direct = false;

        $scope.bSearch = 0;
        $scope.bOrder = -1;
        $scope.personSearch = {name:''};
        gApp.loadAllInfo();
        $scope.patients = gApp.patients.list;
    });

    $scope.onNew = function(){
    	gApp.patient = {};

    	gApp.patient.menus = null;
        gApp.patient.bMnuID = 0;
        gApp.bForm = true;

        gApp.saveAllInfo();
        $ionicHistory.clearHistory();
      	$state.go('tabs.menu.forms');
    };

    $scope.onClear = function(){
        $scope.model.searchFilter = '';
    };

    $scope.onPatients = function(pa){
    	gApp.patient = pa;
        gApp.patient.bMnuID = 0;
        gApp.bForm = true;
        $ionicHistory.clearHistory();
    	$state.go('tabs.menu.forms');
    };

    $scope.onSearch = function(){
        $scope.bSearch = ($scope.bSearch + 1) % 2;
    };

    $scope.onSort = function(){
        if ($scope.bOrder == -1)
            $scope.model.sort = 'name';
        $scope.bOrder = ($scope.bOrder + 1) % 2;
        $scope.model.direct = $scope.bOrder;
    };
})
