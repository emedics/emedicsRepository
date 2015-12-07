MyApp.controller('TestFormCtrl', function($scope, $ionicLoading, $ionicPopover, $ionicPopup,$ionicViewSwitcher, $ionicHistory, $ionicScrollDelegate,$ionicTabsDelegate, $state, $timeout, gApp, HttpGet, HttpService, Utils) {
	$scope.onTop = function(bActual){
		$ionicScrollDelegate.$getByHandle('my-handle').scrollTop(bActual);
	};

	$scope.$on('$ionicView.enter', function() {
		$scope.bChart = 1;
		$scope.onTop(false);
		$scope.temp = {section:gApp.testform[0]};
		$ionicLoading.hide();
	})
	
	$scope.onChart = function(){
		$scope.bChart = 2;
	}

	$scope.onTable = function(){
		$scope.bChart = 1;
	}
})