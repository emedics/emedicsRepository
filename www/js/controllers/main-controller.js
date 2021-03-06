
MyApp.controller('MainCtrl', function($scope, $ionicLoading, $ionicPopup, $ionicHistory, $state, $timeout, HttpGet, HttpService, Utils, gApp, $ionicTabsDelegate) {
	
    gApp.loadUserInfo();
	gApp.bForm = false;
	var data = {};
    $ionicLoading.show();
    HttpGet(HttpService.getLocalURL("JSON_Annexe.json"), data, function(resp, error) {
        if (error) {
            $ionicLoading.hide();
            Utils.alertPopup("Error", "Failed to load local database file 'JSON_Annexe.json'.");
            return;
        } else {
            $ionicLoading.hide();
            gApp.annexe = resp;
        }
    });

    $scope.$on('$ionicView.enter', function(viewInfo, state) {
        navigator.globalization.getPreferredLanguage(
            function (language) {
                gApp.langu = language.value;
            },
            function () {}
        );
    })

    $scope.onPatients = function(){
    	$state.go('tabs.patients');
    }

    $scope.onFormTest = function(){
        $ionicLoading.show();
        HttpGet(HttpService.getLocalURL("sample.json"), data, function(resp, error) {
            if (error) {
                $ionicLoading.hide();
                Utils.alertPopup("Error", "Failed to load local database file 'sample.json'.");
                return;
            } else {
                $ionicLoading.hide();
                gApp.testform = resp.annexes[0].sections[0].subsections;
                $state.go('tabs.testform');
            }
        });  
    }
})
