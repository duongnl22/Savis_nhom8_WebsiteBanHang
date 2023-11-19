myapp.controller("product-ctrl", function ($scope, $http, $filter, $q) {
    localStorage.removeItem("ProductBuyNow");
    // Khoang gia
    $scope.isPriceDropdownVisible = false;
    $scope.togglePriceDropdown = function () {
        $scope.isPriceDropdownVisible = !$scope.isPriceDropdownVisible;
    };
    $scope.priceFromError = false;
    $scope.priceToError = false;
    $scope.comparePrice = false;

    $scope.validatePrice = function () {
        if (!/^[0-9]+$/.test($scope.selectedValues.priceFrom) && $scope.selectedValues.priceFrom) {
            $scope.priceFromError = true;
        } else {
            $scope.priceFromError = false;
        }

        if (!/^[0-9]+$/.test($scope.selectedValues.priceTo) && $scope.selectedValues.priceTo) {
            $scope.priceToError = true;
        } else {
            $scope.priceToError = false;
        }


    }
    // Thuonghieu
    $scope.isDropdownVisibleThuongHieu = false;
    $scope.toggleDropdownThuongHieu = function () {
        $scope.isDropdownVisibleThuongHieu = !$scope.isDropdownVisibleThuongHieu;
    };
    // Mauvo
    $scope.isDropdownVisibleMauVo = false;
    $scope.toggleDropdownMauVo = function () {
        $scope.isDropdownVisibleMauVo = !$scope.isDropdownVisibleMauVo;
    };
    // Chatlieuvo
    $scope.isDropdownVisibleChatlieuvo = false;
    $scope.toggleDropdownChatlieuvo = function () {
        $scope.isDropdownVisibleChatlieuvo = !$scope.isDropdownVisibleChatlieuvo;
    };
    // Tinhnang
    $scope.isDropdownVisibleTinhnang = false;
    $scope.toggleDropdownTinhnang = function () {
        $scope.isDropdownVisibleTinhnang = !$scope.isDropdownVisibleTinhnang;
    };
    // Chatlieukinh
    $scope.isDropdownVisibleChatlieukinh = false;
    $scope.toggleDropdownChatlieukinh = function () {
        $scope.isDropdownVisibleChatlieukinh = !$scope.isDropdownVisibleChatlieukinh;
    };
    // Dongmay
    $scope.isDropdownVisibleDongmay = false;
    $scope.toggleDropdownDongmay = function () {
        $scope.isDropdownVisibleDongmay = !$scope.isDropdownVisibleDongmay;
    };
    // Xuatxu
    $scope.isDropdownVisibleXuatxu = false;
    $scope.toggleDropdownXuatxu = function () {
        $scope.isDropdownVisibleXuatxu = !$scope.isDropdownVisibleXuatxu;
    };
    // Hinhdang
    $scope.isDropdownVisibleHinhdang = false;
    $scope.toggleDropdownHinhdang = function () {
        $scope.isDropdownVisibleHinhdang = !$scope.isDropdownVisibleHinhdang;
    };
    // Day
    $scope.isDropdownVisibleDay = false;
    $scope.toggleDropdownDay = function () {
        $scope.isDropdownVisibleDay = !$scope.isDropdownVisibleDay;
    };
    // $scope.sizeMat = []
    // $http.get("http://localhost:8080/api/size")
    //     .then(function (response) {
    //         $scope.sizeMat = response.data;
    //     }, function (error) {
    //         console.error('Lỗi trong quá trình gọi API:', error);
    //     });

    // $scope.thuongHieu = []
    // $http.get("http://localhost:8080/api/brand")
    //     .then(function (response) {
    //         $scope.thuongHieu = response.data;
    //     }, function (error) {
    //         console.error('Lỗi trong quá trình gọi API:', error);
    //     });
    $scope.sizeMat = [];
    $scope.thuongHieu = [];
    $scope.caseColor = [];
    $scope.caseMaterial = [];
    $scope.feature = [];
    $scope.gender = [];
    $scope.glassMaterial = [];
    $scope.machineType = [];
    $scope.origin = [];
    $scope.shape = [];
    $scope.strap = [];

    var requests = [
        $http.get("http://localhost:8080/api/size"),
        $http.get("http://localhost:8080/api/brand"),
        $http.get("http://localhost:8080/api/casecolor"),
        $http.get("http://localhost:8080/api/casematerial"),
        $http.get("http://localhost:8080/api/feature"),
        $http.get("http://localhost:8080/api/gender"),
        $http.get("http://localhost:8080/api/chatlieukinh"),
        $http.get("http://localhost:8080/api/dongmay"),
        $http.get("http://localhost:8080/api/origin"),
        $http.get("http://localhost:8080/api/shape"),
        $http.get("http://localhost:8080/api/strap")
    ];

    $q.all(requests).then(function (responses) {
        $scope.sizeMat = responses[0].data;
        $scope.thuongHieu = responses[1].data;
        $scope.caseColor = responses[2].data;
        $scope.caseMaterial = responses[3].data;
        $scope.feature = responses[4].data;
        $scope.gender = responses[5].data;
        $scope.glassMaterial = responses[6].data;
        $scope.machineType = responses[7].data;
        $scope.origin = responses[8].data;
        $scope.shape = responses[9].data;
        $scope.strap = responses[10].data;
    }).catch(function (error) {
        console.error('Lỗi trong quá trình gọi API:', error);
    });

    // $http.get("http://localhost:8080/api/watch")
    // .then(function (response) {
    //     // Gán dữ liệu trả về từ API vào biến $scope.products
    //     $scope.watchs = response.data;

    //     // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
    //     angular.forEach($scope.watchs, function (cartItem) {
    //         $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
    //             cartItem.images = imageResponse.data;
    //             console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
    //         });
    //     });

    //     // UpdateDisplayedProducts ở đây nếu cần
    // }, function (error) {
    //     console.error('Lỗi trong quá trình gọi API:', error);
    // });
    // $http.get("http://localhost:8080/api/watch")
    // .then(function (response) {
    //     // Gán dữ liệu trả về từ API vào biến $scope.watchs
    //     $scope.watchs = response.data;

    //     // Biến tạm thời để theo dõi các tên sản phẩm đã được hiển thị
    //     var displayedProductNames = {};

    //     // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
    //     angular.forEach($scope.watchs, function (cartItem) {
    //         // Kiểm tra xem tên sản phẩm đã được hiển thị chưa
    //         if (!displayedProductNames[cartItem.product.name]) {
    //             $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
    //                 cartItem.images = imageResponse.data;
    //                 console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
    //             });

    //             // Đánh dấu tên sản phẩm này đã được hiển thị
    //             displayedProductNames[cartItem.product.name] = true;
    //         } else {
    //             // Nếu sản phẩm có cùng tên đã được hiển thị, bạn có thể ẩn nó bằng cách thay đổi thuộc tính "display" của cartItem
    //             cartItem.display = false;
    //         }
    //     });

    //     // Cập nhật danh sách sản phẩm đã hiển thị
    //     $scope.displayedWatchs = $scope.watchs.filter(function (cartItem) {
    //         return cartItem.display !== false;
    //     });

    //     // UpdateDisplayedProducts ở đây nếu cần
    // }, function (error) {
    //     console.error('Lỗi trong quá trình gọi API:', error);
    // });
    $scope.watchs = [];


    $scope.watchdetails = function () {
        $http.get("http://localhost:8080/api/watch")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.watchs
                $scope.watchs = response.data;

                var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

                // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
                $scope.watchs = $scope.watchs.filter(function (watch) {
                    if (!uniqueProductNames[watch.product.name]) {
                        uniqueProductNames[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });

                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                angular.forEach($scope.watchs, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });
                console.log($scope.watchs)
                // UpdateDisplayedProducts ở đây nếu cần
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API:', error);
            });
    }
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 2; // Số sản phẩm trên mỗi trang

    // Hàm để tính số trang
    $scope.totalPages = function () {
        return Math.ceil($scope.watchs.length / $scope.itemsPerPage);
    };

    // Hàm để hiển thị sản phẩm trên trang hiện tại
    $scope.paginatedWatchs = function () {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        return $scope.watchs.slice(begin, end);
    };

    // Hàm để chuyển đến trang trước
    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    // Hàm để chuyển đến trang tiếp theo
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages()) {
            $scope.currentPage++;
        }
    };

    $scope.getPagesArray = function (numPages) {
        var pagesArray = [];
        for (var i = 1; i <= numPages; i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    };
    $scope.goToPage = function (page) {
        $scope.currentPage = page;
    };

    // Loc
    // $scope.applyFilters = function () {
    //     var selectedValues = [];

    //     // Duyệt qua mảng của từng trường lọc và kiểm tra giá trị đã được chọn
    //     $scope.thuongHieu.forEach(function (th) {
    //         if (th.selected) {
    //             selectedValues.push("Thương hiệu: " + th.name);
    //         }
    //     });

    //     $scope.caseColor.forEach(function (cc) {
    //         if (cc.selected) {
    //             selectedValues.push("Màu vỏ: " + cc.name);
    //         }
    //     });

    //     // Tương tự cho các trường lọc khác

    //     // Hiển thị các giá trị đã chọn trong cửa sổ thông báo
    //     alert("Các giá trị đã chọn:\n" + selectedValues.join("\n"));
    // };
    // End Loc
    $scope.selectedValues = {
        thuongHieu: {},
        caseColor: {},
        caseMaterial: {},
        feature: {},
        glassMaterial: {},
        machineType: {},
        origin: {},
        shape: {},
        strap: {},
        priceFrom: null, // Initialize with null or any default value
        priceTo: null
        // Thêm các trường lọc khác tương ứng
    };

    $scope.applyFilters = function () {

        if ($scope.selectedValues.priceFrom !== null && $scope.selectedValues.priceTo !== null) {
            var fromValue = parseFloat($scope.selectedValues.priceFrom);
            var toValue = parseFloat($scope.selectedValues.priceTo);
        
            if (!isNaN(fromValue) && !isNaN(toValue)) {
                // Check if priceFrom is greater than priceTo
                if (fromValue <= toValue) {
                    $scope.comparePrice = false;
                } else {
                    $scope.comparePrice = true;
                    return;
                }
            } else {
                // Handle the case where conversion to numbers fails
                console.error("Invalid numeric values for priceFrom or priceTo");
            }
        }
        $http.post('http://localhost:8080/api/watch/references', $scope.selectedValues)
            .then(function (response) {
                $scope.watchs = response.data;
                var uniqueProductNames = {}; // Sử dụng đối tượng để theo dõi tên sản phẩm duy nhất

                // Loại bỏ các sản phẩm trùng tên và gán danh sách sản phẩm duy nhất vào $scope.watchs
                $scope.watchs = $scope.watchs.filter(function (watch) {
                    if (!uniqueProductNames[watch.product.name]) {
                        uniqueProductNames[watch.product.name] = true;
                        return true; // Giữ sản phẩm nếu tên sản phẩm chưa được thấy
                    }
                    return false; // Loại bỏ sản phẩm nếu tên sản phẩm đã tồn tại
                });

                // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
                angular.forEach($scope.watchs, function (cartItem) {
                    $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                        cartItem.images = imageResponse.data;
                        console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                    });
                });
                alert("Day data thanh cong!");
            })
            .catch(function (error) {

            });
        

        // $http.post('http://localhost:8080/api/watch/references',$scope.selectedValues)
        // .then(function (response) {
        //     $scope.watchs = response.data;
        //     alert("Day du lieu thanh cong!");
        // })
        // .catch(function (error) {
        //     console.log(error)
        // });


        // Check if priceFrom and priceTo are both filled with valid values
        // Check if at least one of the fields is filled



    };
   
    $scope.clearFilters = function () {
        // Xóa giá trị của trường giá
        $scope.selectedValues.priceFrom = null;
        $scope.selectedValues.priceTo = null;

        // Đặt các trường khác về giá trị mặc định
        $scope.selectedValues.thuongHieu = {};
        $scope.selectedValues.caseColor = {};
        $scope.selectedValues.caseMaterial = {};
        $scope.selectedValues.feature = {};
        $scope.selectedValues.glassMaterial = {};
        $scope.selectedValues.machineType = {};
        $scope.selectedValues.origin = {};
        $scope.selectedValues.shape = {};
        $scope.selectedValues.strap = {};
        // ... (đặt giá trị mặc định cho các trường khác)

        // Gọi hàm applyFilters để áp dụng sự thay đổi
        $scope.watchdetails();
    };

    $scope.watchdetails();
})

// alert("Các giá trị đã chọn:\n" + $scope.selectedValues.caseColor.join("\n")+"\n"+
// $scope.selectedValues.glassMaterial.join("\n")+"\n"+
// $scope.selectedValues.feature.join("\n")+"\n"+
// $scope.selectedValues.machineType.join("\n")+"\n"+
// $scope.selectedValues.origin.join("\n")+"\n"+
// $scope.selectedValues.shape.join("\n")+"\n"+
// $scope.selectedValues.strap.join("\n")+"\n"+
// $scope.selectedValues.caseMaterial.join("\n"));