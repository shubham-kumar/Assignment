var app = angular
    .module('mainApp', ['ui.bootstrap', 'ngRoute', 'outletController', 'menuController'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            title: 'Home',
        templateUrl: 'home.html',
        controller: 'outletCtrl'
        }).when('/Menu', {
            title: 'Home2',
        templateUrl: 'Menu.html',
        controller: 'menuCtrl'
        }).when('/', {
            title: 'Home3',
        templateUrl: 'home.html',
        controller: 'outletCtrl'
    });
    }])
    .factory('Menu', function () {
        var id = '', nameLoc = '',isLoc = false;
        return {
            getId: function () { return id; },
            setId: function (idN) { id = idN },
            getNameLoc: function () { return nameLoc; },
            setNameLoc: function (nameL) { nameLoc = nameL },
            getIsLoc: function () { return isLoc; },
            setIsLoc: function (isLo) { isLoc = isLo }
        };
    });

app.controller('mainAppController', ['$scope', '$location', 'Menu',function ($scope, $location, Menu) {
    $scope.isActive = function (route) {
        var urlTmp = $location.path();
        if (urlTmp == "" || urlTmp == "/")
            urlTmp = "/index";
        $scope.navHeadUrl = urlTmp;
        return route === urlTmp;
    }
    $scope.changeLocation = function () {
        $location.path("/index");
    }
    $scope.Menu = Menu;
}]);