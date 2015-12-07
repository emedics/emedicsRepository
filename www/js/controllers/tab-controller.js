MyApp.controller('TabsCtrl', function($scope, $ionicPopup,$ionicViewSwitcher, $ionicHistory, $ionicScrollDelegate, $state, $timeout, gApp, HttpGet, HttpService, Utils) {
	$scope.onHome = function(){
		$scope.$broadcast("TabSelected",0);
		if (gApp.bForm === false)
			$state.go('tabs.main');
	}
	$scope.onSent = function(){
		$scope.$broadcast("TabSelected",2);
		if (gApp.bForm === false)
			$state.go('tabs.sent');
	}
	$scope.onDraft = function(){
		$scope.$broadcast("TabSelected",1);
		if (gApp.bForm === false)
			$state.go('tabs.draft');
	}
	$scope.onSettings = function(){
		$scope.$broadcast("TabSelected",3);
		if (gApp.bForm === false)
			$state.go('tabs.settings');
	}
});