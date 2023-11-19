myapp.controller("cart-ctrl", function ($scope, $http, $location) {
    // alert("Carthi")
    // var input = document.querySelector("input"),
    //     input_val = parseInt(input.value),
    //     btn_add = document.querySelector(".add"),
    //     btn_remove = document.querySelector(".remove");

    // input.addEventListener("keyup", function () {
    //     input_val = parseInt(input.value);
    // });

    // btn_add.addEventListener("click", function (e) {
    //     if (e.shiftKey) {
    //         input_val += 10;
    //     } else {
    //         input_val++;
    //     }
    //     input.value = input_val;
    // });

    // btn_remove.addEventListener("click", function (e) {
    //     if (input_val > 11 && e.shiftKey) {
    //         input_val -= 10;
    //     } else if (input_val > 1) {
    //         input_val--;
    //     }
    //     input.value = input_val;
    // });
    localStorage.removeItem("ProductBuyNow");

    $scope.increaseQuantity = function(product) {
        if (event.shiftKey) {
            product.quantity += 10;
        } else {
            product.quantity++;
        }
        updateLocalStorage();
    };

    $scope.decreaseQuantity = function(product) {
        if (product.quantity > 11 && event.shiftKey) {
            product.quantity -= 10;
        } else if (product.quantity > 1) {
            product.quantity--;
        }
        updateLocalStorage();
    };

    // var thongtin_thanhtoan = document.getElementById("content_thongtin_thanhtoan");
    // var dropdown_thongtin_thanhtoan = document.getElementById("dropdown_thongtin_thanhtoan");
    // var chevronIcon_thongtin_thanhtoan = document.querySelector("#content_thongtin_thanhtoan i");
    // var isDropdownVisible = false;

    // thongtin_thanhtoan.addEventListener("click", function () {
    //     dropdown_thongtin_thanhtoan.style.display = isDropdownVisible ? "none" : "block";

    //     // Thay đổi lớp CSS của phần tử <i>
    //     chevronIcon_thongtin_thanhtoan.classList.toggle("chevron-up");
    //     chevronIcon_thongtin_thanhtoan.classList.toggle("chevron-down");

    //     isDropdownVisible = !isDropdownVisible;
    // });

    // var magiamgia_thanhtoan = document.getElementById("content_magiamgia_thanhtoan");
    // var dropdown_magiamgia_thanhtoan = document.getElementById("dropdown_magiamgia_thanhtoan");
    // var chevronIcon_magiamgia_thanhtoan = document.querySelector("#content_magiamgia_thanhtoan i");
    // var isDropdownVisible_magiamgia = false;

    // magiamgia_thanhtoan.addEventListener("click", function () {
    //     dropdown_magiamgia_thanhtoan.style.display = isDropdownVisible_magiamgia ? "none" : "block";

    //     // Thay đổi lớp CSS của phần tử <i>
    //     chevronIcon_magiamgia_thanhtoan.classList.toggle("chevron-up");
    //     chevronIcon_magiamgia_thanhtoan.classList.toggle("chevron-down");

    //     isDropdownVisible_magiamgia = !isDropdownVisible_magiamgia;
    // });

    // Khởi tạo giỏ hàng từ localStorage (nếu có)
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Hàm để tính tổng giá trị của giỏ hàng
    angular.forEach($scope.cart, function (cartItem) {
        // Gọi API để lấy danh sách images cho từng watchdetail
        $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
            cartItem.images = imageResponse.data;
            console.log(cartItem.images.image_link)
        });
    });
    
    $scope.calculateTotal = function () {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            total += $scope.cart[i].price * $scope.cart[i].quantity;
        }
        return total;
    };
    $scope.clearCart = function() {
        // Xóa giỏ hàng khỏi localStorage và khởi tạo giỏ hàng rỗng
        localStorage.removeItem('cart');
        $scope.cart = [];
    };

    $scope.removeFromCart = function(productId) {
        var index = -1;
    
        // Tìm vị trí của sản phẩm có ID trùng với productId trong giỏ hàng
        for (var i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].id === productId) {
                index = i;
                break;
            }
        }
    
        // Nếu tìm thấy sản phẩm, xóa nó khỏi giỏ hàng
        if (index !== -1) {
            $scope.cart.splice(index, 1);
        }
        // Cập nhật giỏ hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    };

    $scope.checkout = function() {
        var username = localStorage.getItem('username');
    
        if (username) {
            $location.path("/address");
        } else {
            $location.path("/checkout");
        }
    };
    function updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }
})