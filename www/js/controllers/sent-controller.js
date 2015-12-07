MyApp.controller('SentCtrl', function($scope, $ionicLoading, $http, $ionicPopup, $ionicHistory, $state, $timeout, gApp, Utils) {
	$scope.$on('$ionicView.enter', function(viewInfo, state) {
		$ionicLoading.hide();
	})
})