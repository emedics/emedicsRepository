
MyApp.controller('LoginCtrl', function($scope, $ionicPopup, $ionicScrollDelegate, $state, $rootScope, $timeout, HttpGet, HttpService, Utils,$ionicViewSwitcher, gApp) {

    // $scope.$on('$ionicView.enter', function(viewInfo, state) {
    //     $ionicScrollDelegate.scrollTop();
    // });

    $scope.doLogin = function() {
        $ionicViewSwitcher.nextDirection('forward');
        var userName    = $('#login-user').val();
        var password = $('#login-password').val();

        if (Utils.isEmptyString(userName)) {
            Utils.alertPopup("Warning", "Please enter your email.");
            return;
        }
        if (!Utils.isValidEmailFormat(userName)){
            Utils.alertPopup("Warning", "Email is not valid. Please enter your correct email.");
            return;
        }
        if (Utils.isEmptyString(password)) {
            Utils.alertPopup("Warning", "Please enter your password.");
            return;
        }

        // HttpService.setBusy(true);
        // $timeout(function() {
            // HttpService.setBusy(false);
            // display tab bar and adjust height of main container.

            // go to main home page.
            gApp.user.userName = userName;
            gApp.user.password = password;
            gApp.saveUserInfo();
            
            gApp.patients.bLogged = true;
            gApp.saveAllInfo();

            $state.go('tabs.main');
        // }, 3000);

        // HttpPost(HttpService.getFullURL("users/sign_in"), data, function(result, error) {
        //     if (error) {
        //         if (result === 401) {
        //             alert($scope.MESSAGE_FAILED_AUTHORIZE);
        //         }
        //         else {
        //             alert($scope.MESSAGE_NOCONNECT_SERVER);
        //         }
        //         // HttpService.postFail();
        //         return;
        //     } else {
        //         UserInfo.setInfo(result.user.id, result.user.token, result.user.email, password);

        //         $state.go('app.status');
        //     }
        // });
    };

})
