myapp.controller("home-ctrl", function ($scope, $http, $filter,$location) {
    var roleIdAc = localStorage.getItem("role");
    console.log(roleIdAc);
    if (roleIdAc === 'ADM' || roleIdAc ==='STAFF') {
        window.location.href = "/admin/index.html";
    } 

    localStorage.removeItem("ProductBuyNow");
    let slider = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let dots = document.querySelectorAll('.slider .dots li');

    let lengthItems = items.length - 1;
    let active = 0;
    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }
    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }
    // let refreshInterval = setInterval(() => { next.click() }, 9000);
    function reloadSlider() {
        slider.style.left = -items[active].offsetLeft + 'px';
        // 
        let last_active_dot = document.querySelector('.slider .dots li.active');
        last_active_dot.classList.remove('active');
        dots[active].classList.add('active');

        // clearInterval(refreshInterval);
        // refreshInterval = setInterval(() => { next.click() }, 8000);


    }

    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        })
    })
    window.onresize = function (event) {
        reloadSlider();
    };

    // Lấy tất cả các mục danh sách <li>
    const listItems = document.querySelectorAll('.category-list ul li');

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItems.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');
        });
    });

    $scope.products = [];
    $scope.displayedProducts = [];
    var currentPage = 0;
    var productsPerPage = 6;

    function updateDisplayedProducts() {
        var startIndex = currentPage * productsPerPage;
        var endIndex = startIndex + productsPerPage;
        $scope.displayedProducts = $scope.products.slice(startIndex, endIndex);
    }

    $scope.previousPage = function () {
        if (currentPage > 0) {
            currentPage--;
            updateDisplayedProducts();
        }
    };

    $scope.nextPage = function () {
        if (currentPage < Math.ceil($scope.products.length / productsPerPage) - 1) {
            currentPage++;
            updateDisplayedProducts();
        }
    };

    // Khởi tạo hiển thị ban đầu
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.products = response.data;

            // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
            angular.forEach($scope.products, function (cartItem) {
                $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                    cartItem.images = imageResponse.data;
                    console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                });
            });

            updateDisplayedProducts();
            // UpdateDisplayedProducts ở đây nếu cần
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    // Khởi tạo giỏ hàng từ localStorage (nếu có)
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    $scope.addtoCart = function (watch) {
        // Kiểm tra xem đồng hồ đã có trong giỏ hàng chưa
        var existingWatch = $scope.cart.find(item => item.id === watch.id);

        if (existingWatch) {
            // Nếu đồng hồ đã tồn tại, tăng số lượng lên
            existingWatch.quantity++;
        } else {
            // Nếu đồng hồ chưa có trong giỏ hàng, thêm đồng hồ mới
            watch.quantity = 1;
            $scope.cart.push(watch);
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    };

    $scope.detailProduct=function(watch){
        localStorage.setItem('ProductDetail', JSON.stringify(watch));
        $location.path("/detail");
    }

    $scope.buyNow = function(watch) {
        var username = localStorage.getItem('username');
        localStorage.setItem("ProductBuyNow",JSON.stringify(watch));
        if (username) {
            $location.path("/address");
            
        } else {
            $location.path("/checkout");
        }
    };

})