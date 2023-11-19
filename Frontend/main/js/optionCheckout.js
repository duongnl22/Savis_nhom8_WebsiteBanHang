myapp.controller("checkout-ctrl", function ($scope, $http, $location) {
    $scope.login=function(){
        $location.path("/login")
    }
    $scope.guestCheck=function(){
        $location.path("/address")
    }
})