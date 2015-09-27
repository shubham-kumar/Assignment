var menu = angular.module('menuController', [])
menu.filter('myFilter', function () {
    var filteredData = []
    return function (datas, type) {
        if (type === 'All')
            return datas;
        else {
            angular.forEach(datas, function (data) {
                if (data.attributes[0].name == type)
                    filteredData.push(data);
            });
            return filteredData;
        }
    };
});
menu.controller('menuCtrl', ['$scope', '$http', 'Menu', function ($scope, $http, Menu) {
    $scope.cartData = false;
    $scope.cartItems = [];
    $scope.getType = null;
    $scope.itemCnt = 0;
    $scope.changeLocation = function () {
        $location.path("/index");
    }
    $scope.isAct1 = true;
    $scope.typeFilter = function (val) {
        if (val == null) {
            $scope.isAct1 = true;
            $scope.isAct2 = false;
            $scope.isAct3 = false;
        }
        else if (val == '115') {
            $scope.isAct2 = true;
            $scope.isAct1 = false;
            $scope.isAct3 = false;
        }
        else if (val == 'Non-Veg') {
            $scope.isAct3 = true;
            $scope.isAct2 = false;
            $scope.isAct1 = false;
        }
        $scope.getType = val;
    };
    $http.get("http://api.done.to/menu/" + Menu.getId()).success(function (response) {
        $scope.products = response.products;
        $scope.oldProducts = response.old_products;
    });
    $scope.cartTotalPr = 0;
    $scope.addedToCart = function (product) {
        $scope.cartData = true;
        var objItem = {};
        if (product.addToCart == undefined) {
            product.addToCart = true;
            objItem.name = product.name;
            objItem.quantity = 1;
            objItem.price = product.price;
            objItem.id = product.id;
            objItem.totalPrice = objItem.quantity * objItem.price;
            $scope.cartTotalPr += objItem.totalPrice;
            $scope.cartItems.push(objItem);
        }
        else {
            var reslt = true;
            for (var i = 0; i < $scope.cartItems.length; i++) {
                if ($scope.cartItems[i].id == product.id) {
                    reslt = false;
                    break;
                }
            }
            if (reslt) {
                product.addToCart = true;
                objItem.name = product.name;
                objItem.quantity = 1;
                objItem.price = product.price;
                objItem.id = product.id;
                objItem.totalPrice = objItem.quantity * objItem.price;
                $scope.cartTotalPr += objItem.totalPrice;
                $scope.cartItems.push(objItem);
            }
            else {
                for (var i = 0; i < $scope.cartItems.length; i++) {
                    if ($scope.cartItems[i].id == product.id) {
                        objItem.name = product.name;
                        objItem.quantity = parseInt($scope.cartItems[i].quantity) + 1;
                        objItem.price = product.price;
                        objItem.id = product.id;
                        objItem.totalPrice = parseInt(objItem.quantity) * parseInt(product.price);
                        $scope.cartItems[i] = objItem;
                        $scope.cartTotalPr += parseInt(product.price);
                        break;
                    }
                }
            }
        }
        $scope.itemCnt++;
    }
    $scope.editQuantity = function (delta, product) {
        if (delta === -1 && product.quantity > 1) {
            $scope.cartTotalPr -= product.price;
            product.quantity--;
            $scope.itemCnt--;
        } else if (delta === 1) {
            $scope.cartTotalPr += product.price;
            $scope.itemCnt++;
            product.quantity++;
        }
        product.totalPrice = product.quantity * product.price;
    };

    $scope.removeCartItem = function (index) {
        $scope.cartTotalPr -= $scope.cartItems[index].totalPrice;
        $scope.itemCnt -= $scope.cartItems[index].quantity;
        $scope.cartItems.splice(index, 1);
        if ($scope.cartItems.length == 0) {
            $scope.cartData = false;
        }
    };
}]);