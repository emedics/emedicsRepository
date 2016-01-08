MyApp.controller('TabsCtrl', function($scope, $ionicPopup,$ionicViewSwitcher, $ionicHistory, $ionicScrollDelegate, $state, $timeout, gApp, HttpGet, HttpService, Utils) {
	$scope.onHome = function(){
		if (gApp.bForm)
			$scope.$broadcast("TabSelected",0);
		else
			$state.go('tabs.main');
	}
	$scope.onSent = function(){
		if (gApp.bForm)
			$scope.$broadcast("TabSelected",2);
		else
			$state.go('tabs.sent');
	}
	$scope.onDraft = function(){
		if (gApp.bForm === false)
			$state.go('tabs.draft');
		else
			$scope.$broadcast("TabSelected",1);
	}
	$scope.onSettings = function(){
		if (gApp.bForm === false)
			$state.go('tabs.settings');
		else
			$scope.$broadcast("TabSelected",3);
	}
});