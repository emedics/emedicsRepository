MyApp.controller('MenuCtrl', function($scope, $http, $ionicModal, $timeout, $ionicSideMenuDelegate, HttpGet, HttpService, Utils) {

	var data = {};
    HttpGet(HttpService.getLocalURL("JSON_Menu.json"), data, function(resp, error) {
    	if (error){
            Utils.alertPopup("Error", "Failed to load local database file 'JSON_Menu.json'.");
            return;
    	}
    	else
    		$scope.menus = resp.menus;
    })

    $scope.onClick = function(index){
   		$scope.$broadcast("MenuSelected", index);
   		$ionicSideMenuDelegate.toggleRight(false);
	};
})