myapp.controller("address-ctrl", function ($scope, $http, $location) {
    const addressSavedList = document.querySelectorAll(".address-saved");
    const continueButton = document.querySelector(".button-buy");

    // addressSavedList.forEach(function (addressSaved) {
    //     const checkIcon = addressSaved.querySelector(".bx-check");

    //     addressSaved.addEventListener("click", function () {
    //         // Ẩn tất cả icon i của tất cả các phần tử
    //         addressSavedList.forEach(function (element) {
    //             const otherCheckIcon = element.querySelector(".bx-check");
    //             otherCheckIcon.style.display = "none";
    //         });

    //         // Hiển thị hoặc ẩn icon i của phần tử được click
    //         const isShown = getComputedStyle(checkIcon).display !== "none";
    //         if (!isShown) {
    //             checkIcon.style.display = "block"; // Hiển thị phần tử i
    //         } else {
    //             checkIcon.style.display = "none"; // Ẩn phần tử i
    //         }
    //     });

    // });

    // addressSavedList.forEach(function (addressSaved) {
    //     addressSaved.addEventListener("click", function () {
    //         // Loại bỏ class .active từ tất cả các phần tử
    //         addressSavedList.forEach(function (element) {
    //             element.classList.remove("active");
    //         });

    //         // Thêm class .active vào phần tử được click
    //         addressSaved.classList.add("active");
    //     });
    // });
    //click buy
    // continueButton.addEventListener("click", function () {
    //     let selectedAddress = false;

    //     // Kiểm tra xem có địa chỉ nào được chọn không
    //     addressSavedList.forEach(function (addressSaved) {
    //         const checkIcon = addressSaved.querySelector(".bx-check");
    //         const isShown = getComputedStyle(checkIcon).display !== "none";
    //         if (isShown) {
    //             selectedAddress = true;
    //         }
    //     });

    //     // Nếu không có địa chỉ nào được chọn, hiển thị thông báo
    //     if (!selectedAddress) {
    //         alert("Vui lòng chọn địa chỉ để tiếp tục mua hàng");
    //     } else {
    //         // Nếu có địa chỉ được chọn, tiếp tục thực hiện hành động mua hàng
    //         // Thêm mã xử lý mua hàng ở đây (nếu cần)
    //     }
    // });

    $scope.selectAddress = function (selectedAddress) {
        if (selectedAddress.isActive) {
            selectedAddress.isActive = false; // Bỏ chọn địa chỉ nếu đã được chọn
            $scope.isAddressSelected = false; // Cập nhật trạng thái là không có địa chỉ nào được chọn
            $scope.selectedAddress = null; // Đặt biến selectedAddress về null
        } else {
            // Đặt tất cả các địa chỉ về trạng thái không active
            angular.forEach($scope.addressAcount, function (address) {
                address.isActive = false;
            });

            // Đặt địa chỉ được chọn về trạng thái active
            selectedAddress.isActive = true;
            $scope.selectedAddress = selectedAddress; // Cập nhật selectedAddress với địa chỉ đã chọn
            $scope.selectedAddress.indexAddress = ($scope.addressAcount.indexOf(selectedAddress) + 1);
            $scope.isAddressSelected = true; // Cập nhật trạng thái là đã có địa chỉ được chọn
        }
    };

    $scope.continueShopping = function () {
        if ($scope.isAddressSelected) {
            // Đã có địa chỉ được chọn, thực hiện điều hướng đến trang /pay
            // Lưu địa chỉ đã chọn vào localStorage trước khi điều hướng
            localStorage.setItem('selectedAddress', JSON.stringify($scope.selectedAddress));

            $location.path("/pay");
        } else {
            // Chưa có địa chỉ nào được chọn, hiển thị cảnh báo
            alert("Cần phải chọn địa chỉ để tiếp tục");
        }
    };

    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.cartNow = JSON.parse(localStorage.getItem('ProductBuyNow')) || [];
    // console.log("Day la san pham mua ngay:"+$scope.cartNow.brand.name);
    // Lặp qua danh sách cart và gán danh sách hình ảnh cho mỗi cartItem
    angular.forEach($scope.cart, function (cartItem) {
        // Gọi API để lấy danh sách images cho từng watchdetail
        $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
            cartItem.images = imageResponse.data;
        });
    });


    $http.get("http://localhost:8080/api/watch/" + $scope.cartNow.id + "/images").then(function (imageResponse) {
        $scope.cartNow.images = imageResponse.data;
    });

    // $scope.buyNow = false;


    $scope.calculateTotal = function () {
        var total = 0;  // Declare total inside the function

        if ($scope.cartNow.price === undefined) {
            for (var i = 0; i < $scope.cart.length; i++) {
                total += $scope.cart[i].price * $scope.cart[i].quantity;
            }
            console.log("Day là giá:" + total);
            return total;
        } else {
            return $scope.cartNow.price;
        }
    };

    $scope.addresss = [];
    $http.get("https://provinces.open-api.vn/api/?depth=3")
        .then(function (response) {
            $scope.addresss = response.data;
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.resetForm = function () {
        $scope.selectedProvince = null;
        $scope.selectedDistrict = null;
        $scope.selectedWard = null;
        $scope.name = ""; // Đặt lại giá trị cho ô input "Tên"
        $scope.email = ""; // Đặt lại giá trị cho ô input "Email"
        $scope.phone = ""; // Đặt lại giá trị cho ô input "Điện thoại"
        $scope.address = ""; // Đặt lại giá trị cho ô input "Địa chỉ chi tiết"
    };

    $scope.localStorageUsername = localStorage.getItem('username');
    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];


    $scope.addressAcount = []
    $scope.loadAddresses = function () {
        $http.get("http://localhost:8080/api/address/" + $scope.localStorageIdac.id + "/account")
            .then(function (response) {
                $scope.addressAcount = response.data;
                console.log($scope.addressAcount);
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    };

    // Gọi hàm loadAddresses để tải danh sách địa chỉ ban đầu
    $scope.loadAddresses();

    // Thêm sản phẩm
    $scope.addressAdd = {}; // Đối tượng để lưu thông tin địa chỉ mới

    $scope.saveAddress = function () {
        // Lấy dữ liệu từ các trường form và gán vào đối tượng addressAdd
        $scope.addressAdd.province_code = $scope.selectedProvince.name;
        $scope.addressAdd.district_code = $scope.selectedDistrict.name;
        $scope.addressAdd.town_code = $scope.selectedWard.name;
        $scope.addressAdd.address_detail = $scope.address;
        $scope.addressAdd.username = $scope.name;
        $scope.addressAdd.phone = $scope.phone;
        $scope.addressAdd.email = $scope.email;
        $scope.addressAdd.account_address = $scope.localStorageIdac;

        $http.post("http://localhost:8080/api/address/add", $scope.addressAdd)
            .then(function (response) {
                // Xử lý phản hồi từ máy chủ sau khi lưu thành công
                alert("Lưu thông tin địa chỉ thành công");
                $scope.loadAddresses();

            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });
    };

    $scope.deleteAddress = function (idaddress) {
        var confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
        if (confirmDelete) {
            $http.delete("http://localhost:8080/api/address/delete/" + idaddress)
                .then(function (response) {
                    alert("Đã xóa thành công");
                    $scope.loadAddresses();
                })
                .catch(function (error) {
                    console.error("Lỗi khi xóa dữ liệu: ", error);
                });
        }
    }
})