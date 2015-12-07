
MyApp.service('HttpService', function($http, $ionicLoading, $ionicPopup, Utils) {
    this.server = {
        baseURL: 'https://',
        localURL: './db/',
    };

    this.TIMEOUT = 60 * 1000;
    this.RELOGIN_ERRORCODE = 401;

    this.showTemporaryLoading = function(message) {
        var msg = message ? message : "Waiting...";
        $ionicLoading.show({
            template: msg,
            duration: 600
        });
    }

    this.busyState = false;

    this.setBusy = function(state, message) {
        if (state == this.busyState)
            return;

        var me = this;

        if (state) {
            this.busyState = true;

            if (me.busyState === true) {
                if(message)
                    $ionicLoading.show({template: message});
                else
                    $ionicLoading.show({template: 'Waiting...'});
            }
        }
        else {
            this.busyState = false;
            $ionicLoading.hide();
        }
    };

    this.getFullURL = function(query) {
        return (this.server.baseURL + query);
    };

    this.getLocalURL = function(query) {
        return (this.server.localURL + query);
    };

    this.postFail = function(yescb, nocb) {
        Utils.alertPopup("Connection Error", "Unable to connect to the server. Please try again later.");
    };

});

MyApp.factory('HttpPost', function($http, $state, HttpService, Utils) {
    return function(url, data, callback, message, context, timeout) {

        if (!timeout) {
            timeout = this.TIMEOUT;
        }

        HttpService.setBusy(true, message);

        var handler = function(d, e) {
            HttpService.setBusy(false);

            if (callback) {
                if (context)
                    callback.call(context, d, 0);
                else
                    callback(d, e);
            }
        };

        $http.post(url, data, {timeout: timeout}).
            success(function(data, status, headers, config, statusText) {
                console.log("Success: " + JSON.stringify(data));
                handler(data, 0);
            }).
            error(function(data, status, headers, config, statusText) {
                console.log("Fail: " + JSON.stringify(status));
                if (status === HttpService.RELOGIN_ERRORCODE) {
                    HttpService.setBusy(false);
                    Utils.confirmPopupOKCancel(
                        "Error",
                        "Authentication was expired, please try to sign in again.",
                        function() {
                            $state.go('login');
                        }
                    );
                }
                else
                    handler(status, true);
            }
        );
    };
});

MyApp.factory('HttpGet', function($http, $state, HttpService, Utils) {
    return function(url, data, callback, message, context, timeout) {

        if (!timeout) {
            timeout = this.TIMEOUT;
        }

        //HttpService.setBusy(true, message);

        var handler = function(d, e) {
            //HttpService.setBusy(false);

            if (callback) {
                if (context)
                    callback.call(context, d, 0);
                else
                    callback(d, e);
            }
        };

        var str = [];
        var serialize = function(obj, prefix) {
            var fullUrl = prefix + "?";
            for (var p in obj) {
                fullUrl = fullUrl + p + "=" + obj[p] + "&";
            }
            return fullUrl.substr(0, fullUrl.length-1);
        }
        
        $http.get(serialize(data, url), {}, {timeout: timeout}).
            success(function(data, status, headers, config, statusText) {
                console.log("Success: " + JSON.stringify(data));
                handler(data, 0);
            }).
            error(function(data, status, headers, config, statusText) {
                console.log("Fail: " + JSON.stringify(status));
                if (status === HttpService.RELOGIN_ERRORCODE) {
                    //HttpService.setBusy(false);
                    Utils.confirmPopupOKCancel(
                        "Error",
                        "Authentication was expired, please try to sign in again.",
                        function() {
                            $state.go('login');
                        }
                    );
                }
                else
                    handler(status, true);
            }
        );
    };
});

