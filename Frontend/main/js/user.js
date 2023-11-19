myapp.controller("user-ctrl", function ($scope, $http, $location) {
    const userLeftHeaders = document.querySelectorAll('.user-left h4');

    userLeftHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các h4
            userLeftHeaders.forEach((h4) => {
                h4.classList.remove('active');
            });

            // Thêm lớp active vào h4 được nhấp vào
            header.classList.add('active');
        });
    });
    // Lấy tất cả các mục danh sách <li>
    const listItemsthongtinthanhtoan = document.querySelectorAll('.category-thongtintaikhoan ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItemsthongtinthanhtoan.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItemsthongtinthanhtoan.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });

    // Lấy tất cả các mục danh sách <li>
    const listItemshoadon = document.querySelectorAll('.category-hoadon ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItemshoadon.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItemshoadon.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });

    $scope.showPersonalInfo = function () {
        $scope.isPersonalInfoVisible = true;
        $scope.isDeliveryAddressVisible = false;
    };

    $scope.showDeliveryAddress = function () {
        $scope.isPersonalInfoVisible = false;
        $scope.isDeliveryAddressVisible = true;
    };

    // Mặc định hiển thị thông tin cá nhân
    $scope.isPersonalInfoVisible = true;
    $scope.isDeliveryAddressVisible = false;

    $scope.localStorageIdac = JSON.parse(localStorage.getItem('idac')) || [];

    $scope.orderAccount=[];
    $http.get("http://localhost:8080/api/order/" + $scope.localStorageIdac.id + "/orderforaccount")
    .then(function (response) {
        $scope.orderAccount = response.data;
    }, function (error) {
        console.error('Lỗi trong quá trình gọi API:', error);
    });

    $scope.detailOrder=function(ord){
        localStorage.setItem('Order', JSON.stringify(ord));
        $location.path("/orderDetail");
    }


    function showHoadonall() {
        document.querySelector(".user-hoadon-all").style.display = "block";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }
    function showHoadonxacnhan() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "block";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }
    function showHoadoncho() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "block";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }

    function showHoadondanggiao() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "block";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }
    function showHoadondagiao() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "block";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }
    function showHoadondahuy() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "block";
        document.querySelector(".user-hoadon-trahang").style.display = "none";
    }
    function showHoadontrahang() {
        document.querySelector(".user-hoadon-all").style.display = "none";
        document.querySelector(".user-hoadon-xacnhan").style.display = "none";
        document.querySelector(".user-hoadon-cho").style.display = "none";
        document.querySelector(".user-hoadon-danggiao").style.display = "none";
        document.querySelector(".user-hoadon-dagiao").style.display = "none";
        document.querySelector(".user-hoadon-dahuy").style.display = "none";
        document.querySelector(".user-hoadon-trahang").style.display = "block";
    }

    // Lấy các phần tử cần điều khiển
    var userLeft = document.querySelector(".user-left");
    var userThongTinTaiKhoan = document.querySelector(".user-thongtintaikhoan");
    var userHoaDon = document.querySelector(".user-hoadon");
    var userRepass = document.querySelector(".user-repass")

    // Mặc định hiển thị Thông tin tài khoản
    userThongTinTaiKhoan.style.display = "block";
    userHoaDon.style.display = "none";
    userRepass.style.display = "none";

    // Đặt sự kiện cho việc chuyển đổi giữa Thông tin tài khoản và Hóa đơn
    userLeft.addEventListener("click", function (e) {
        if (e.target.classList.contains("user-left-thongtintaikhoan")) {
            userThongTinTaiKhoan.style.display = "block";
            userHoaDon.style.display = "none";
            userRepass.style.display = "none"
        } else if (e.target.classList.contains("user-left-hoadon")) {
            userThongTinTaiKhoan.style.display = "none";
            userHoaDon.style.display = "block";
            userRepass.style.display = "none"
        }
        else if (e.target.classList.contains("user-left-repass")) {
            userThongTinTaiKhoan.style.display = "none";
            userHoaDon.style.display = "none";
            userRepass.style.display = "block"
        }
    });

    const addressSavedList = document.querySelectorAll(".address-saved");

    addressSavedList.forEach(function (addressSaved) {
        const checkIcon = addressSaved.querySelector(".bx-check");

        addressSaved.addEventListener("click", function () {
            // Ẩn tất cả icon i của tất cả các phần tử
            addressSavedList.forEach(function (element) {
                const otherCheckIcon = element.querySelector(".bx-check");
                otherCheckIcon.style.display = "none";
            });

            // Hiển thị hoặc ẩn icon i của phần tử được click
            const isShown = getComputedStyle(checkIcon).display !== "none";
            if (!isShown) {
                checkIcon.style.display = "block"; // Hiển thị phần tử i
            } else {
                checkIcon.style.display = "none"; // Ẩn phần tử i
            }
        });

    });

    addressSavedList.forEach(function (addressSaved) {
        addressSaved.addEventListener("click", function () {
            // Loại bỏ class .active từ tất cả các phần tử
            addressSavedList.forEach(function (element) {
                element.classList.remove("active");
            });

            // Thêm class .active vào phần tử được click
            addressSaved.classList.add("active");
        });
    });
});