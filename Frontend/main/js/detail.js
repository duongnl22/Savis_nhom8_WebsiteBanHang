myapp.controller("detail-ctrl", function ($scope, $http, $location) {
    // Lấy tất cả các mục danh sách <li>
    alert("hllo detail");
    const listItems = document.querySelectorAll('.product-list ul li');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ẩn tất cả nội dung tab trừ tab đầu tiên
    tabContents.forEach((content, index) => {
        if (index !== 0) {
            content.style.display = 'none';
        }
    });

    // Lặp qua từng mục danh sách và thêm sự kiện click
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Xóa lớp active khỏi tất cả các mục danh sách
            listItems.forEach((li) => {
                li.classList.remove('active');
            });

            // Thêm lớp active vào mục danh sách được nhấp vào
            item.classList.add('active');

            // Ẩn tất cả nội dung tab
            tabContents.forEach((content) => {
                content.style.display = 'none';
            });

            // Lấy giá trị data-tab của li được click
            const tabName = item.getAttribute('data-tab');

            // Hiển thị nội dung tab tương ứng
            const tabContent = document.getElementById(tabName + '-content');
            if (tabContent) {
                tabContent.style.display = 'block';
            }
        });
    });

    const leftImage = document.getElementById('left-image');
    const rightImages = document.querySelectorAll('.right ul li img');
    let currentIndex = 0;

    // Thêm sự kiện click vào nút "btn-next"
    document.querySelector('.btn-next').addEventListener('click', () => {
        currentIndex++; // Tăng chỉ số hiện tại

        // Kiểm tra nếu chỉ số vượt quá số lượng hình ảnh bên phải, đặt lại chỉ số về 0
        if (currentIndex >= rightImages.length) {
            currentIndex = 0;
        }

        // Thay đổi hình ảnh ở phần "left" bằng hình ảnh tương ứng từ phần "right"
        leftImage.src = rightImages[currentIndex].src;
    });

    // Thêm sự kiện click vào nút "btn-next"
    document.querySelector('.btn-prev').addEventListener('click', () => {
        currentIndex--; // Tăng chỉ số hiện tại

        // Kiểm tra nếu chỉ số vượt quá số lượng hình ảnh bên phải, đặt lại chỉ số về 0
        if (currentIndex < 0) {
            currentIndex = rightImages.length - 1;
        }

        // Thay đổi hình ảnh ở phần "left" bằng hình ảnh tương ứng từ phần "right"
        leftImage.src = rightImages[currentIndex].src;
    });

    rightImages.forEach((rightImage, index) => {
        rightImage.addEventListener('click', () => {
            currentIndex = index; // Cập nhật chỉ số hiện tại dựa trên hình ảnh được click
            leftImage.src = rightImage.src; // Thay đổi hình ảnh ở phần "left" dựa trên hình ảnh được click
        });
    });

    const productItems = document.querySelector('.product-items');
    const prevButton = document.querySelector('.btn-prev-product');
    const nextButton = document.querySelector('.btn-next-product');
    const products = productItems.querySelectorAll('.product');
    const numVisibleProducts = 4; // Số lượng sản phẩm hiển thị trên màn hình cùng lúc
    let currentIndex_product = 0;

    // Hiển thị 4 sản phẩm đầu tiên
    showProducts(currentIndex_product);

    // Hàm để hiển thị 4 sản phẩm
    function showProducts(startIndex) {
        for (let i = 0; i < products.length; i++) {
            if (i >= startIndex && i < startIndex + numVisibleProducts) {
                products[i].style.display = 'block';
            } else {
                products[i].style.display = 'none';
            }
        }
    }

    // Thêm sự kiện cho nút "Next"
    nextButton.addEventListener('click', () => {
        currentIndex_product += numVisibleProducts; // Di chuyển đến 4 sản phẩm tiếp theo
        if (currentIndex_product >= products.length) {
            currentIndex_product = 0; // Quay lại sản phẩm đầu tiên nếu đã ở cuối danh sách
        }
        showProducts(currentIndex_product);
    });

    // Thêm sự kiện cho nút "Prev"
    prevButton.addEventListener('click', () => {
        currentIndex_product -= numVisibleProducts; // Di chuyển đến 4 sản phẩm trước đó
        if (currentIndex_product < 0) {
            currentIndex_product = products.length - numVisibleProducts; // Quay lại 4 sản phẩm cuối cùng nếu đã ở đầu danh sách
        }
        showProducts(currentIndex_product);
    });


    const colorItems = document.querySelectorAll(".product-color ul li");
    const sizeItems = document.querySelectorAll(".product-size ul li");

    // Xử lý sự kiện khi một phần tử màu được chọn
    colorItems.forEach((colorItem) => {
        colorItem.addEventListener("click", () => {
            // Loại bỏ lớp selected từ tất cả các phần tử màu
            colorItems.forEach((item) => {
                item.classList.remove("selected");
            });

            // Thêm lớp selected cho phần tử màu được chọn
            colorItem.classList.add("selected");
        });
    });

    // Xử lý sự kiện khi một phần tử kích thước được chọn
    sizeItems.forEach((sizeItem) => {
        sizeItem.addEventListener("click", () => {
            // Loại bỏ lớp selected từ tất cả các phần tử kích thước
            sizeItems.forEach((item) => {
                item.classList.remove("selected");
            });

            // Thêm lớp selected cho phần tử kích thước được chọn
            sizeItem.classList.add("selected");
        });
    });

    $scope.loadPage = function () {
        $scope.localStorageProduct = JSON.parse(localStorage.getItem('ProductDetail')) || [];
        console.log($scope.localStorageProduct.description);
        $http.get("http://localhost:8080/api/watch/" + $scope.localStorageProduct.id + "/images").then(function (imageResponse) {
            $scope.localStorageProduct.images = imageResponse.data;
            console.log($scope.localStorageProduct.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
        });
    }

    $scope.products = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.products
            $scope.products = response.data;

            // Sắp xếp sản phẩm theo trường 'name' tăng dần
            $scope.products = $scope.products.sort(function (a, b) {
                return a.size.name.localeCompare(b.size.name);
            });

            // Lọc sản phẩm có tên giống với localStorageProduct.product.name
            $scope.filteredProducts = $scope.products.filter(function (product) {
                return product.product.name === $scope.localStorageProduct.product.name;
            });

        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });

    $scope.detailProduct = function (watch) {
        localStorage.setItem('ProductDetail', JSON.stringify(watch));
        $scope.loadPage();
    }

    $scope.loadPage();
});



