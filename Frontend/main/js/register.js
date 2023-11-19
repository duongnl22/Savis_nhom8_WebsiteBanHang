myapp.controller("register-ctrl", function ($scope, $http, $location) {
    alert("hello regis")
    $scope.login = function () {
        $location.path("/login");
    }

    $scope.emailFormatError = false;
    $scope.checkEmailFormat = function () {
        // Biểu thức chính quy kiểm tra định dạng email
        var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test($scope.email)) {
            $scope.emailFormatError = true;
        } else {
            $scope.emailFormatError = false;
        }
    };

    $scope.passwordMatchError = false;
    $scope.checkPass = function () {
        if ($scope.pass !== $scope.confirmPass) {
            $scope.passwordMatchError = true;
        } else {
            $scope.passwordMatchError = false;
        }
    };

    $scope.is_null = false;

    // Hàm kiểm tra trường có trống không
    $scope.checkFields = function () {
        if (!$scope.email || !$scope.pass || !$scope.confirmPass) {
            $scope.is_null = true;
        } else {
            $scope.is_null = false;
        }
    };


    $scope.account = {};
    $scope.register = function () {
        $scope.checkFields();
        if ($scope.emailFormatError || $scope.passwordMatchError || $scope.is_null) {
            alert("Vui lòng kiểm tra lại thông tin cho chính xác!");
        } else {
            $scope.account.username = $scope.email;
            $scope.account.pass = $scope.pass;
            $scope.account.email = $scope.email;
            $http.post("http://localhost:8080/api/account/add", $scope.account)
                .then(function (response) {
                    // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                    alert("Đăng kí tài khoản thành công!");
                    $location.path("/login");
                })
                .catch(function (error) {
                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                    console.error("Lỗi khi lưu dữ liệu: ", error);
                });
        }
    }
})