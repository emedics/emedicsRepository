
MyApp.controller('SplashCtrl', function($scope, $ionicPopup, $ionicHistory, $state, $timeout, gApp) {
    $scope.data = {};
    
	$timeout(function() {
		$ionicHistory.currentView($ionicHistory.backView());
		gApp.loadAllInfo();
		if (typeof gApp.patients.bLogged === 'undefined' || gApp.patients.bLogged === false)
			$state.go('login');
		else
			$state.go('tabs.main');
	}, 3000);
})
