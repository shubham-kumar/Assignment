var outlet = angular.module('outletController', []);

outlet.controller('outletCtrl', ['$scope', '$http', 'Menu', '$location', function ($scope, $http, Menu, $location) {
    var company_id = 6896;
    var done_host_parameters = {
        timeout: 10000
    };
    Menu.setIsLoc(false);
    var request = {
        "company_id": company_id,
        "outlet_last_updated_timestamp": 0,
        "ot_last_updated_timestamp": 0,
        "oa_last_updated_timestamp": 0,
        "oam_last_updated_timestamp": 0,
        "oag_last_updated_timestamp": 0,
        "offer_last_updated_timestamp": 0,
        "oom_last_updated_timestamp": 0
    };
    $http.post("http://api.done.to/done-outlets-by-company", request, done_host_parameters)
           .success(function (response) {
               console.log(response);
               $scope.outlets = response.data.outlets;
           });
    $scope.getMenu = function (id,name) {
        Menu.setId(id);
        Menu.setNameLoc(name);
        Menu.setIsLoc(true);
        $location.path("/Menu");
    }
}]);