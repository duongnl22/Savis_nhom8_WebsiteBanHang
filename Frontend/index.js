
var myapp = angular.module("client-app", ["ngRoute"]);

myapp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", {
            templateUrl: "/main/layout/home.html",
            controller: "home-ctrl"
        })
        .when("/login", {
            templateUrl: "/main/layout/login.html",
            controller: "login-ctrl"
        })
        .when("/product", {
            templateUrl: "/main/layout/product.html",
            controller: "product-ctrl"
        })
        .when("/contact", {
            templateUrl: "/main/layout/contact.html",
        })
        .when("/about", {
            templateUrl: "/main/layout/about.html",
        })
        .when("/cart", {
            templateUrl: "/main/layout/cart.html",
            controller: "cart-ctrl"
        })
        .when("/address", {
            templateUrl: "/main/layout/address.html",
            controller: "address-ctrl"
        })
        .when("/checkout", {
            templateUrl: "/main/layout/optionCheckout.html",
            controller: "checkout-ctrl"
        })
        .when("/pay", {
            templateUrl: "/main/layout/peyment.html",
            controller: "pay-ctrl"
        })
        .when("/user", {
            templateUrl: "/main/layout/user.html",
            controller: "user-ctrl"
        })
        .when("/orderDetail", {
            templateUrl: "/main/layout/orderdetail.html",
            controller: "orderDetail-ctrl"
        })
        .when("/detail", {
            templateUrl: "/main/layout/detail.html",
            controller: "detail-ctrl"
        })
        .when("/register", {
            templateUrl: "/main/layout/register.html",
            controller: "register-ctrl"
        })
        .otherwise({
            redirectTo: "/home"
        }); 
});

myapp.controller('controllerNav', function ($scope, $http,$location,ProductService) {
    var username = localStorage.getItem('username');
    if (username) {
        $scope.username = username;
    }
    $scope.logout = function () {
        // Remove 'username' and 'role' from Local Storage
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('idac');
        $scope.username = "";

        // Redirect to the login page
        $location.path('/login');
    };
});