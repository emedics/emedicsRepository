// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var MyApp = angular.module('starter', ["ionic", "chart.js", "ionic-timepicker", "ngCordova", 
                          "ngIOS9UIWebViewPatch","LocalStorageModule"])
MyApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

MyApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tabs', {
    url: '/tabs',
    abstract:true,
    templateUrl:'templates/tabs.html',
    controller:'TabsCtrl'
  })

  .state('splash' , {
    url: '/splash',
    templateUrl: 'templates/splash.html',
    controller: 'SplashCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tabs.main', {
    url: '/main',
    views:{
      'home-tab' : {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    }
  })
  
  .state('tabs.draft', {
    url: '/draft',
    views:{
      'draft-tab' : {
        templateUrl: 'templates/draft.html',
        controller: 'DraftCtrl'
      }
    }
  })

  .state('tabs.sent', {
    url: '/sent',
    views:{
      'sent-tab' : {
        templateUrl: 'templates/sent.html',
        controller: 'SentCtrl'
      }
    }
  })

  .state('tabs.settings', {
    url: '/settings',
    views:{
      'settings-tab' : {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  
  .state('tabs.patients', {
    url: '/patients',
    views:{
      'home-tab' : {
        templateUrl: 'templates/patients.html',
        controller: 'PatientsCtrl'
      }
    }
  })

  .state('tabs.testform', {
    url: '/testform',
    views:{
      'home-tab' : {
        templateUrl: 'templates/testform.html',
        controller: 'TestFormCtrl'
      }
    }
  })

  .state('tabs.menu', {
    url: '/menu',
    abstract:true,
    views: {
      'home-tab' : {
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
      }
    }
  })

  .state('tabs.menu.forms', {
    url: '/forms',
    views: {
      'menuContent' : {
        templateUrl: 'templates/forms.html',
        controller: 'FormsCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});

MyApp.directive('standardTimeNoMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;

            return (prependZero(hours) + ":" + prependZero(minutes));
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        scope.stime = epochParser(scope.etime, 'time');
      });

    }
  };
})

MyApp.directive('signature', ['$ionicModal', 'Utils',function ($ionicModal,Utils) {
    var canvas = null,
      ratio = 1.0;

    return {
      scope: {
        signature: '=ngModel'
      },
      link: function ($scope, $element, $attrs, $controller) {
        $scope.signaturePadModel = {};

        $ionicModal.fromTemplateUrl('templates/signaturePad.html', {
          animation: 'slide-in-up',
          scope: $scope,
        }).then(function(modal) {
          $scope.signatureModal = modal;
        });

        $scope.$on('$destroy', function () {
          $scope.signatureModal.remove();
        });

        $scope.openSignatureModal = function () {
          $scope.signatureModal.show();
          canvas = angular.element($scope.signatureModal.modalEl).find('canvas')[0];

          $scope.signaturePad = new SignaturePad(canvas, {
            backgroundColor: '#FFF',
            minWidth: 1,
            maxWidth: 1.5,
            dotSize: 3,
            penColor: 'rgb(66, 133, 244)',
            onEnd: function () {
              $scope.signature = $scope.signaturePad.toDataURL();
            }
          });

          if ($scope.signature) {
            $scope.signaturePad.fromDataURL($scope.signature);
          }
          $scope.resizeCanvas();
        };

        $scope.resizeCanvas = function () {
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext('2d').scale(ratio, ratio);          
        };

        $scope.clear = function () {
          $scope.signaturePadModel.signatureConfirm = false;
          $scope.signaturePad.clear();
          $scope.signature = null;
        };

        $scope.save = function () {
          if ($scope.signaturePad.isEmpty())
            Utils.alertPopup("Warning", "Please draw your signature.");  
          else
          {
            $scope.signaturePadModel = {};
            $scope.signatureModal.hide();
          }
        };
      },
      require: 'ngModel',
      replace: true,
      restrict: 'A',
      templateUrl: 'templates/signatureButton.html'
    };
  }
]);
MyApp.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
});
MyApp.directive('ngMin', function() {
  return {
    restrict : 'A',
    require : ['ngModel'],
    compile: function($element, $attr) {
      return function linkDateTimeSelect(scope, element, attrs, controllers) {
        var ngModelController = controllers[0];
        scope.$watch($attr.ngMin, function watchNgMin(value) {
          element.attr('min', value);
          ngModelController.$render();
        })
      }
    }
  }
})
MyApp.directive('ngMax', function() {
  return {
    restrict : 'A',
    require : ['ngModel'],
    compile: function($element, $attr) {
      return function linkDateTimeSelect(scope, element, attrs, controllers) {
        var ngModelController = controllers[0];
        scope.$watch($attr.ngMax, function watchNgMax(value) {
          element.attr('max', value);
          ngModelController.$render();
        })
      }
    }
  }
})
MyApp.directive('ionRadioFix', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template:
      '<label class="item item-radio">' +
        '<input type="radio" name="radio-group">' +
        '<div class="radio-content">' +
          '<div class="item-content disable-pointer-events" ng-transclude></div>' +
          '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
        '</div>' +
      '</label>',

    compile: function(element, attr) {
      if (attr.icon) {
        var iconElm = element.find('i');
        iconElm.removeClass('ion-checkmark').addClass(attr.icon);
      }

      var input = element.find('input');
      angular.forEach({
          'name': attr.name,
          'value': attr.value,
          'disabled': attr.disabled,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-disabled': attr.ngDisabled,
          'ng-change': attr.ngChange,
          'ng-required': attr.ngRequired,
          'required': attr.required
      }, function(value, name) {
        if (angular.isDefined(value)) {
            input.attr(name, value);
          }
      });

      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
});