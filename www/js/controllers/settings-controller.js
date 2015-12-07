MyApp.controller('SettingsCtrl', function($scope, $http, $ionicPopup, $ionicHistory, $state, $timeout, gApp, Utils) {

	$scope.onLogOut = function() {
		gApp.clearUserInfo();
		gApp.patients.bLogged = false;
		gApp.saveAllInfo();
		$state.go('login');
	}

	$scope.onClear = function(){
		Utils.confirmPopupYesNo('Warning', 'Do you surely want to clear all data?', 
			function(){
				gApp.clearAllInfo();
				Utils.alertPopup('Cleared', 'Database is successfully cleared.');
			},
	       	function(){
	       	}
	    );
	}
})