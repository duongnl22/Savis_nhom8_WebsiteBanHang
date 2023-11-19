myapp.controller("order-ctrl", function ($scope, $http, $filter) {
    alert("Hello order");
    $scope.selectedTab = 'all';

    // Hàm để chọn tab
    $scope.selectTab = function (tabName) {
        $scope.selectedTab = tabName;
    };

    // Hàm để kiểm tra xem một tab có được chọn không
    $scope.isSelected = function (tabName) {
        return $scope.selectedTab === tabName;
    };



    // search caties
    const searchContainer = document.getElementById("search-container");
    const searchIcon = document.getElementById("search-icon");
    const closeIcon = document.getElementById("close-icon");
    const inputSearch = searchContainer.querySelector(".search-product input");

    searchContainer.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ lan ra các phần tử cha
        searchContainer.classList.add("expanded");
        inputSearch.style.display = "block";
        closeIcon.style.display = "block";
        searchIcon.style.display = "block";
    });

    closeIcon.addEventListener("click", function (event) {
        closeSearch();
        event.stopPropagation();
    });

    function closeSearch() {
        searchContainer.classList.remove("expanded");
        inputSearch.style.display = "none";
        closeIcon.style.display = "none";
        searchIcon.style.display = "block";
    }

    // checkbox
    // const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    // const allCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    // // Thêm sự kiện click cho th
    // selectAllCheckbox.addEventListener('click', function () {
    //     const isChecked = this.checked;

    //     // Duyệt qua tất cả các checkbox trong tbody và thiết lập trạng thái
    //     allCheckboxes.forEach(function (checkbox) {
    //         checkbox.checked = isChecked;
    //     });
    // });



    // // edit table
    // // Lấy danh sách tất cả các biểu tượng 3 chấm
    // const editIcons = document.querySelectorAll('.bx-dots-horizontal-rounded');

    // // Lặp qua từng biểu tượng 3 chấm
    // editIcons.forEach((icon, index) => {
    //     // Gán sự kiện click cho từng biểu tượng
    //     icon.addEventListener('click', () => {
    //         // Lấy phần tử edit-tr tương ứng dựa vào index
    //         const editTr = document.querySelectorAll('.edit-tr')[index];

    //         // Kiểm tra trạng thái hiển thị của phần tử edit-tr
    //         if (editTr.style.display === 'none' || editTr.style.display === '') {
    //             // Nếu ẩn hoặc chưa có style display thì hiển thị
    //             editTr.style.display = 'table-row';
    //         } else {
    //             // Nếu đang hiển thị thì ẩn đi
    //             editTr.style.display = 'none';
    //         }
    //     });
    // });

    $scope.orders = [];
    $scope.loadOrder = function () {
        $http.get("http://localhost:8080/api/order")
            .then(function (response) {
                // Gán dữ liệu trả về từ API vào biến $scope.orders
                $scope.orders = response.data;

                // Lặp qua từng order để lấy thông tin order detail
                angular.forEach($scope.orders, function (order) {
                    // Gọi API để lấy danh sách order detail cho từng order
                    $http.get("http://localhost:8080/api/orderdetail/" + order.id + "/orderdetailfororder")
                        .then(function (orderDetailResponse) {
                            order.orderDetails = orderDetailResponse.data;

                            // Lặp qua từng order detail để lấy danh sách images cho từng watchdetail
                            angular.forEach(order.orderDetails, function (cartItem) {
                                cartItem.watchdetail.images = [];
                                $http.get("http://localhost:8080/api/watch/" + cartItem.watchdetail.id + "/images")
                                    .then(function (imageResponse) {
                                        cartItem.watchdetail.images = imageResponse.data;
                                    });
                            });
                        }, function (error) {
                            console.error('Lỗi trong quá trình gọi API orderdetail:', error);
                        });
                });
            }, function (error) {
                console.error('Lỗi trong quá trình gọi API order:', error);
            });
    }

    $scope.getCombinedAddress = function (address) {
        return address.address_detail + '-' + address.town_code + '-' + address.district_code + '-' + address.province_code;
    };

    $scope.toggleDetails = function (order) {
        // Toggle trạng thái hiển thị của chi tiết đơn hàng
        order.showDetails = !order.showDetails;
    };

    $scope.watchs = [];
    $http.get("http://localhost:8080/api/watch")
        .then(function (response) {
            // Gán dữ liệu trả về từ API vào biến $scope.watchs
            $scope.watchs = response.data;

            // Lặp qua danh sách sản phẩm và lấy danh sách hình ảnh
            angular.forEach($scope.watchs, function (cartItem) {
                $http.get("http://localhost:8080/api/watch/" + cartItem.id + "/images").then(function (imageResponse) {
                    cartItem.images = imageResponse.data;
                    console.log(cartItem.images[0].image_link); // Lấy hình ảnh đầu tiên từ danh sách
                });
            });
        }).catch(function (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
            console.error("Lỗi khi lưu dữ liệu: ", error);
        });

    $scope.qrcodeData = '';

    // Function to generate QR code for the invoice
    $scope.generateQRCode = function (order) {
        if (order) {
            // Lọc bỏ các thuộc tính không mong muốn
            var cleanOrder = {
                id: order.id,
                code: order.code,
            };

            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width: 100,
                height: 100
            });

            var qrData = JSON.stringify(cleanOrder);

            if (qrData) {
                qrcode.makeCode(qrData);

                // Tạo một canvas từ hình ảnh mã QR
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var qrImage = document.getElementById("qrcode").querySelector("img");

                canvas.width = qrImage.width;
                canvas.height = qrImage.height;
                ctx.drawImage(qrImage, 0, 0, qrImage.width, qrImage.height);

                // Sử dụng thư viện FileSaver để tải về
                if (window.navigator.msSaveOrOpenBlob) {
                    // Cho Internet Explorer
                    window.navigator.msSaveBlob(canvas.msToBlob(), "qrcode.png");
                } else {
                    // Cho các trình duyệt khác
                    canvas.toBlob(function (blob) {
                        var link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "qrcode.png";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }, "image/png", 1); // Chất lượng đặt là 1 (tối đa)
                }
            } else {
                console.error("Dữ liệu QR code không hợp lệ.");
            }
        } else {
            console.error("Dữ liệu đơn hàng không tồn tại.");
        }
    };
    $scope.generatePDF = function (order) {
        if (order) {
            var docDefinition = {
                content: [
                    { text: 'BeeWatch', style: 'header', alignment: 'center' },
                    { text: 'Số điện thoại: 0563797816', alignment: 'center' },
                    { text: 'Địa chỉ: Phúc lộc - Uy Nỗ - Đông Anh', alignment: 'center' },
                    { text: 'Ngân hàng: MBBank - Số tài khoản: 0563797816', alignment: 'center' },
                    { text: 'Chủ tài khoản: Nguyễn Minh Đức', alignment: 'center' },

                    { text: 'Hóa đơn bán hàng', style: 'subheader', alignment: 'center' },
                    { text: 'Mã hóa đơn: ' + order.code, alignment: 'center' },

                    { text: 'Tên khách hàng: ' + order.name_user, margin: [40, 10, 0, 0] },
                    { text: 'Địa chỉ: ' + order.address_user, margin: [40, 0] },
                    { text: 'Số điện thoại: ' + order.sdt_user, margin: [40, 0] },
                    { text: 'Nhân viên bán hàng: ' + order.salesperson, margin: [40, 0] },

                    {
                        table: {
                            headerRows: 1,
                            widths: [20, '*', 50, 50, 50],
                            body: [
                                ['#', 'Sản phẩm', 'Số lượng', 'Đơn giá', 'Thành tiền'],
                                ...order.orderDetails.map((detail, index) => {
                                    return [
                                        index + 1,
                                        detail.watchdetail.product.name || '',     // Kiểm tra và sử dụng giá trị mặc định nếu productName không tồn tại
                                        detail.quantity || '',        // Kiểm tra và sử dụng giá trị mặc định nếu quantity không tồn tại
                                        detail.watchdetail.price || '',       // Kiểm tra và sử dụng giá trị mặc định nếu unitPrice không tồn tại
                                        detail.total_price || ''       // Kiểm tra và sử dụng giá trị mặc định nếu totalPrice không tồn tại
                                    ];
                                })
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 20, 0, 0]
                    },

                    { text: 'Phí ship: ' + order.shippingFee, alignment: 'right', margin: [0, 10] },
                    { text: 'Tổng tiền thanh toán: ' + order.total_money, alignment: 'right' },
                    {
                        text: 'Trạng thái đơn hàng: ' + (order.status === 7 ? 'Thành công' : order.status),
                        alignment: 'right',
                        margin: [0, 10]
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download('hoadon.pdf');
        } else {
            console.error("Dữ liệu đơn hàng không tồn tại.");
        }
    };

    $scope.selectAllCheckedCXN = false;

    $scope.toggleSelectAllCXN = function () {
        angular.forEach($scope.orders, function (order) {
            order.isSelectedCXN = $scope.selectAllCheckedCXN;
        });
    };

    $scope.updateSelectAllCXN = function () {
        $scope.selectAllCheckedCXN = $scope.orders.every(function (order) {
            return order.isSelectedCXN;
        });
    };
    $scope.getSelectedOrders = function () {
        return $scope.orders.filter(function (order) {
            return order.isSelectedCXN && order.status === 0;
        });
    };

    $scope.confirmSelectedOrdersCXN = function () {
        var selectedOrders = $scope.getSelectedOrders();

        if (selectedOrders.length > 0) {
            selectedOrders.forEach(function (order) {
                $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatus")
                    .then(function (response) {
                        // Xử lý phản hồi từ server nếu cần
                        $scope.loadOrder();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                    });
            });
            alert("Xác nhận hóa đơn thành công!");
            // Thêm các bước xác nhận khác ở đây nếu cần
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn!");
        }
    };


    // Xác nhận giao hàng
    $scope.selectAllCheckedXNG = false;

    $scope.toggleSelectAllXNG = function () {
        angular.forEach($scope.orders, function (order) {
            order.isSelectedXNG = $scope.selectAllCheckedXNG;
        });
    };

    $scope.updateSelectAllXNG = function () {
        $scope.selectAllCheckedXNG = $scope.orders.every(function (order) {
            return order.isSelectedXNG;
        });
    };
    $scope.getSelectedOrdersXNG = function () {
        return $scope.orders.filter(function (order) {
            return order.isSelectedXNG && order.status === 1;
        });
    };

    $scope.confirmSelectedOrdersXNG = function () {
        var selectedOrders = $scope.getSelectedOrdersXNG();

        if (selectedOrders.length > 0) {
            selectedOrders.forEach(function (order) {
                $http.post("http://localhost:8080/api/order/" + order.id + "/updateStatusGiaohang")
                    .then(function (response) {
                        // Xử lý phản hồi từ server nếu cần
                        $scope.loadOrder();
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.error('Lỗi khi cập nhật trạng thái cho hóa đơn có ID:', order.id, error);
                    });
            });
            alert("Xác nhận hóa đơn giao hàng thành công!");
            // Thêm các bước xác nhận khác ở đây nếu cần
        } else {
            alert("Vui lòng chọn ít nhất một hóa đơn!");
        }
    };

    $scope.loadOrder();

});