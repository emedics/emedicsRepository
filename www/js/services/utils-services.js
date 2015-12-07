
MyApp.service('Utils', function($ionicPopup) {

    this.classListOptions = {};
    this.selectedName = {};

    this.isValidEmailFormat = function(_email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(_email)) {
            return false;
        }
        return true;
    };

    this.isEmptyString = function(str) {
        if (typeof str === "undefined" || str === "")
            return true;
        return false;
    };

    this.isNULL = function(data) {
        if (typeof data === 'undefined' || data === null)
            return true;
        return false;
    }

    this.get2DigitNumber = function(number) {
        if (number < 10)
            return "0" + number;
        else
            return "" + number;
    };

    this.isNumeric = function(numeric) {
      return !isNaN(parseFloat(n)) && isFinite(n); 
    }; 

    // convert date to string (MM.DD.YYYY).
    this.formatDate = function(date_str) {
        var date = new Date(date_str);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var m = date.getMinutes();
        var ss = date.getSeconds();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        if (hh < 10)
            hh = '0' + hh;
        if (m < 10)
            m = '0' + m;
        if (ss < 10)
            ss = '0' + ss;

        return yyyy + '-' + mm + '-' + dd;// + ' ' + hh + ':' + m + ':' + ss;
    };    

    // convert date to string (MM.DD.YYYY).
    this.DateToString = function(date_str) {
        if (typeof date_str === 'undefined' || date_str === null)
            return '';

        var date = new Date(date_str);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        } 

        if (mm < 10) {
            mm = '0' + mm;
        } 

        var result = mm + '/' + dd + '/' + yyyy;
        
        return result;
    };

    // convert date string "MMDDYYYY" to "MM/DD/YYYY"
    this.getFormatDateString = function(date_str) {
        if (this.isEmptyString(date_str) || date_str.length < 8)
            return date_str;
        
        return date_str.substring(0, 2) + '/' + date_str.substring(2, 4) + '/' + date_str.substring(4);
    }

    // convert mile to km.
    this.MileToKm = function(mile) {
        return mile * 1.60934;
    };

    // convert km to mile.
    this.KmToMile = function(km) {
        return km / 1.60934;
    };

    // get distance between 2 places (lag, lon).
    this.getDistanceFromLatLonInKm = function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1); 
        var a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km

        return d;
    };

    // convert degree to radius.
    this.deg2rad = function(deg) {
        return deg * (Math.PI / 180);
    };

    // display confirm popup with Yes/No button.
    this.confirmPopupYesNo = function(title, message, yesCallback, noCallback) {
        this.displayConfirmPopup(title, message, 'Yes', 'button-positive', 'No', 'button-negative', yesCallback, noCallback);
    };

    // display confirm popup with Yes/No button.
    this.confirmPopupOKCancel = function(title, message, okCallback, cancelCallback) {
        this.displayConfirmPopup(title, message, 'OK', 'button-positive', 'Cancel', 'button-negative', okCallback, cancelCallback);
    };

    // display normal confirm popup.
    this.displayConfirmPopup = function(title, message, okText, okType, cancelText, cancelType, okCallback, cancelCallback) {
        var confirmPopup = $ionicPopup.confirm({
            title: '<h4>' + title + '</h4>',
            template: '<div style="text-align: center; color:#333">' + message + '</div>',
            okText: okText,
            okType: okType,
            cancelText: cancelText,
            cancelType: cancelType,
        });
        confirmPopup.then(function(res) {
            if (res) {
                if (angular.isFunction(okCallback)) okCallback();
            } else {
                if (angular.isFunction(cancelCallback)) cancelCallback();
            }
        });
    };

    // display selection popup such as Camera/Gallery.
    this.selectPopup = function(title, message, firstText, secondText, firstCallback, secondCallback) {
        this.displayConfirmPopup(title, message, firstText, 'button-positive', secondText, 'button-positive', firstCallback, secondCallback);
    }

    // display alert popup.
    this.alertPopup = function(title, message) {
        var confirmPopup = $ionicPopup.alert({
            title: '<h4>' + title + '</h4>',
            template: '<div style="text-align: center; color:#333">' + message + '</div>'
        });
    };
});
