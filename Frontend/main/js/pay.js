myapp.controller("pay-ctrl", function ($scope, $http, $location) {
    $scope.editAddress = function () {
        $location.path("/address");
        localStorage.removeItem('selectedAddress');
    }
    $scope.localStorageAddress = JSON.parse(localStorage.getItem('selectedAddress')) || [];
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];

    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.cartNow = JSON.parse(localStorage.getItem('ProductBuyNow')) || [];

    angular.forEach($scope.cart, function (cartItem) {
        // Gọi API để lấy danh sách images cho từng watchdetail
        $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
            cartItem.images = imageResponse.data;
            console.log(cartItem.images.image_link)
        });
    });
    $http.get("http://localhost:8080/api/watch/" + $scope.cartNow.id + "/images").then(function (imageResponse) {
        $scope.cartNow.images = imageResponse.data;
    });

    $scope.calculateTotal = function () {
        var total = 0;  // Declare total inside the function

        if ($scope.cartNow.price === undefined) {
            for (var i = 0; i < $scope.cart.length; i++) {
                total += $scope.cart[i].price * $scope.cart[i].quantity;
            }
            $scope.total_money = total;
            return total;
        } else {
            return $scope.cartNow.price;
        }
    };
    // $scope.calculateTotal = function () {
    //     var total = 0;
    //     for (var i = 0; i < $scope.cart.length; i++) {
    //         total += $scope.cart[i].price * $scope.cart[i].quantity;
    //     }
    //     $scope.total_money = total;
    //     return total;
    // };

    $scope.editCart = function () {
        $location.path("/cart");
    }

    $scope.thanhtoan = [];
    $http.get("http://localhost:8080/api/payment")
        .then(function (response) {
            $scope.thanhtoan = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });


    $scope.showPaymentName = function (option) {
        $scope.selectedPayment = option;
    };

    $scope.order = {};


    $scope.placeOrder = function () {
        // var addressId = $scope.localStorageAddress.id; // Lấy ID của địa chỉ

        // Kiểm tra xem selectedPayment có được chọn hay không
        if ($scope.selectedPayment) {
            // var paymentId = $scope.selectedPayment.id; // Lấy ID của phương thức thanh toán

            // Hiển thị thông báo alert với ID của địa chỉ và phương thức thanh toán
            // alert("ID của địa chỉ: " + addressId + "\nID của phương thức thanh toán: " + paymentId);
            if ($scope.cartNow.id === undefined) {
                $http.get("http://localhost:8080/api/order")
                    .then(function (response) {
                        // Dữ liệu trả về từ API sẽ ở response.data
                        var numberOfOrders = response.data.length;

                        // Tạo mã cho hóa đơn mới
                        $scope.order.code = "HD" + ('000' + (numberOfOrders + 1)).slice(-3);
                        $scope.order.total_money = $scope.total_money;
                        $scope.order.account = $scope.localStorageIdac;
                        $scope.order.address = $scope.localStorageAddress;
                        $scope.order.payment = $scope.selectedPayment;
                        $scope.order.status = 0;
                        $http.post("http://localhost:8080/api/order/add", $scope.order)
                            .then(function (response) {
                                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                var orderData = response.data; // Lấy ID của hóa đơn từ phản hồi

                                // alert("Đặt hàng thành công. ID của hóa đơn: " + orderId);
                                $scope.cart.forEach(function (watch, index) {
                                    $scope.orderDetail = {};
                                    $scope.orderDetail.quantity = watch.quantity;
                                    $scope.orderDetail.total_price = watch.quantity * watch.price;
                                    $scope.orderDetail.order = orderData;
                                    $scope.orderDetail.watchdetail = watch;
                                    $http.post("http://localhost:8080/api/orderdetail/add", $scope.orderDetail)
                                        .then(function (response) {
                                            // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                        })
                                        .catch(function (error) {
                                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                            console.error("Lỗi khi lưu dữ liệu: ", error);
                                        });
                                });

                                alert("Đặt hàng thành công thành công");
                                localStorage.removeItem('cart');
                            })
                            .catch(function (error) {
                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                console.error("Lỗi khi lưu dữ liệu: ", error);
                            });
                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            } else {
                $http.get("http://localhost:8080/api/order")
                    .then(function (response) {
                        // Dữ liệu trả về từ API sẽ ở response.data
                        var numberOfOrders = response.data.length;

                        // Tạo mã cho hóa đơn mới
                        $scope.order.code = "HD" + ('000' + (numberOfOrders + 1)).slice(-3);
                        $scope.order.total_money = $scope.cartNow.price;
                        $scope.order.account = $scope.localStorageIdac;
                        $scope.order.address = $scope.localStorageAddress;
                        $scope.order.payment = $scope.selectedPayment;
                        $scope.order.status = 0;
                        $http.post("http://localhost:8080/api/order/add", $scope.order)
                            .then(function (response) {
                                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                var orderData = response.data; // Lấy ID của hóa đơn từ phản hồi

                                // alert("Đặt hàng thành công. ID của hóa đơn: " + orderId);
                                $scope.orderDetail = {};
                                $scope.orderDetail.quantity = 1;
                                $scope.orderDetail.total_price = $scope.cartNow.price;
                                $scope.orderDetail.order = orderData;
                                $scope.orderDetail.watchdetail = $scope.cartNow;
                                $http.post("http://localhost:8080/api/orderdetail/add", $scope.orderDetail)
                                    .then(function (response) {
                                        // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                                    })
                                    .catch(function (error) {
                                        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                        console.error("Lỗi khi lưu dữ liệu: ", error);
                                    });

                                alert("Đặt hàng mua ngay thành công");
                                localStorage.removeItem('ProductBuyNow');
                            })
                            .catch(function (error) {
                                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                console.error("Lỗi khi lưu dữ liệu: ", error);
                            });
                    }, function (error) {
                        console.error('Lỗi trong quá trình gọi API:', error);
                    });
            }
        } else {
            alert("Vui lòng chọn một phương thức thanh toán trước khi đặt hàng.");
        }
    };


})