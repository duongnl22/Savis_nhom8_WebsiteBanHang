myapp.controller("product-ctrl", function ($scope, $http, $filter, $q, WatchService) {
    alert("Hello productAdmin")
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const productPopup = document.getElementById("productPopup");

    openPopup.addEventListener("click", function () {
        productPopup.style.display = "block";
    });

    closePopup.addEventListener("click", function () {
        productPopup.style.display = "none";
    });

    //image product
    // const openPopupImage = document.getElementById("openPopup-image");
    // const closePopupImage = document.getElementById("closePopup-image");
    // const productPopupImage = document.getElementById("productImagePopup");

    // openPopupImage.addEventListener("click", function () {
    //     productPopupImage.style.display = "block";
    // });

    // closePopupImage.addEventListener("click", function () {
    //     productPopupImage.style.display = "none";
    // });

    //popup thuong hieu
    $scope.openedPopups = {};

    $scope.openPopup = function (popupName) {
        $scope.openedPopups[popupName] = true;
    };

    $scope.closePopup = function (popupName) {
        $scope.openedPopups[popupName] = false;
    };

    $scope.isPopupOpen = function (popupName) {
        return $scope.openedPopups[popupName];
    };


    // Show-image

    // Show-image
    // var imageInput = document.getElementById("image-input");
    // var imagePreview = document.getElementById("preview-image");
    // var imageIcon = document.getElementById("image-icon");
    // var browseLink = document.getElementById("browse-link");
    // var isImageVisible = false;
    // var clickCount = 0;

    // var imgProduct = document.querySelector(".img-product");


    // imageInput.addEventListener("change", function (e) {
    //     if (imageInput.files.length > 0) {
    //         var file = e.target.files[0];
    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             imagePreview.src = e.target.result;
    //             imagePreview.style.display = "block";
    //             isImageVisible = true;
    //             // Ẩn icon và link khi hiện ảnh
    //             imageIcon.style.display = "none";
    //             browseLink.style.display = "none";
    //             imgProduct.style.border = "none"
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // });

    // browseLink.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     imageInput.click();
    // });

    // imagePreview.addEventListener("click", function (e) {
    //     if (isImageVisible) {
    //         clickCount++;
    //         if (clickCount >= 2) {
    //             imageInput.value = ""; // Clear the file input
    //             imagePreview.style.display = "none";
    //             isImageVisible = false;
    //             clickCount = 0;
    //             // Hiển thị lại icon và link khi ảnh mất đi
    //             imageIcon.style.display = "block";
    //             browseLink.style.display = "inline";
    //             imgProduct.style.border = "2px dotted #0188ff"
    //         }
    //     }
    // });
    // end show-image
    $scope.currentTab = 'danhsach'; // Mặc định chọn tab 'Danh Sách'

    $scope.selectTab = function (tab) {
        $scope.currentTab = tab;
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
        }, function (error) {
            console.error('Lỗi trong quá trình gọi API:', error);
        });


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
    $scope.product = [];

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
        $http.get("http://localhost:8080/api/strap"),
        $http.get("http://localhost:8080/api/product")
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
        $scope.product = responses[11].data;
    }).catch(function (error) {
        console.error('Lỗi trong quá trình gọi API:', error);
    });


    // checkbox
    $scope.selectAll = false;
    // Hàm xử lý khi checkbox đầu tiên được chọn
    $scope.selectAllCheckboxes = function () {
        angular.forEach($scope.watchs, function (watch) {
            watch.selected = $scope.selectAllCheckbox;
        });
    };

    // dropdown
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Bắt sự kiện click trên nút toggle
    dropdownToggle.addEventListener('click', function () {
        // Kiểm tra trạng thái hiển thị của dropdown menu và thay đổi nó
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Bắt sự kiện click trên mọi nơi để ẩn dropdown menu khi click bên ngoài
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

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

    $scope.showContent = false;

    $scope.toggleContent = function () {
        $scope.showContent = !$scope.showContent;
    };


    $scope.showImageContent = false;

    $scope.toggleImageContent = function () {
        $scope.showImageContent = !$scope.showImageContent;
    };

    $scope.selectedValues = [];//Sizemat
    $scope.selectedValuesThuongHieu = [];
    $scope.selectedValuesGioiTinh = [];
    $scope.selectedValuesDongMay = [];
    $scope.selectedValues_ChatLieuDay = [];
    $scope.selectedValues_ChatLieuKinh = [];
    $scope.selectedValues_TinhNang = [];
    $scope.selectedValues_XuatXu = [];
    $scope.selectedValues_HinhDang = [];
    $scope.selectedValues_MauVo = [];




    $scope.productList = {};

    $scope.updateSelectedValues = function (selectedValue, targetArray) {
        if (selectedValue && !targetArray.includes(selectedValue)) {
            targetArray.push(selectedValue);
            $scope.selectedValue = '';
            generateProducts();
        }
    };

    $scope.deleteSelectedValue = function (selectedValue, targetArray) {
        var index = targetArray.indexOf(selectedValue);
        if (index !== -1) {
            targetArray.splice(index, 1);
        }
        generateProducts();
    };
    function generateProducts() {
        $scope.productList = [];
        for (var j = 0; j < $scope.selectedValues.length; j++) {
            var product = {
                size: $scope.selectedValues[j]
            };
            $scope.productList.push(product);
        }
    }

    // Hàm xóa sản phẩm
    $scope.deleteProduct = function (product) {
        var index = $scope.productList.indexOf(product);
        if (index !== -1) {
            $scope.productList.splice(index, 1);
        }
    };

    $scope.imageFile = null;
    $scope.imagePreview = null;

    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function () {
        $scope.$apply(function () {
            $scope.imageFile = fileInput.files[0];
            $scope.previewImage();
        });
    });

    $scope.previewImage = function () {
        if ($scope.imageFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imagePreview = e.target.result;
                });
            };
            reader.readAsDataURL($scope.imageFile);
        }
    };

    $scope.deleteImage = function () {
        // Xóa hình ảnh vừa chọn bằng cách đặt lại biến $scope.imageFile thành null
        $scope.imageFile = null;
        // Đồng thời đặt $scope.imagePreview thành null để ẩn hình ảnh xem trước
        $scope.imagePreview = null;
    };

    $scope.selectImage = function () {
        // Kích hoạt sự kiện chọn tệp của thẻ <input type="file> khi click vào biểu tượng "Thêm ảnh"
        fileInput.click();
    };
    $scope.sanpham = {};
    $scope.tenproduct = {};
    $scope.anhwatch = {};
    $scope.addProducts = function () {
        var item = angular.copy($scope.sanpham);
        item.image = $scope.imageFile.name;
        console.log(item);

        $scope.tenproduct.name = item.name;
        $scope.anhwatch.image_link = item.image;


        $http.post("http://localhost:8080/api/product/add", $scope.tenproduct)
            .then(function (response) {
                var productData = response.data;
                alert("Thêm thành công!");
                var items = angular.copy($scope.productList);
                for (var j = 0; j < items.length; j++) {
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            items[j][key] = item[key];
                        }
                    }
                    items[j].product = productData;

                    $http.post("http://localhost:8080/api/watch/add", items[j])
                        .then(function (response) {
                            var watchData = response.data;
                            alert("Đẩy data thành công!")
                            $scope.anhwatch.watchdetail = watchData;
                            $http.post("http://localhost:8080/api/image/add", $scope.anhwatch)
                                .then(function (response) {
                                    var anhData = response.data;
                                    alert("Lưu ảnh thành công!")
                                    console.log("Link ảnh:" + anhData.id);
                                })
                                .catch(function (error) {
                                    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                                    console.error("Lỗi khi lưu dữ liệu: ", error);
                                });

                        })
                        .catch(function (error) {
                            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                            console.error("Lỗi khi lưu dữ liệu: ", error);
                        });
                }

            })
            .catch(function (error) {
                // Xử lý lỗi nếu có lỗi xảy ra trong quá trình lưu
                console.error("Lỗi khi lưu dữ liệu: ", error);
            });

        // console.log("Sản phẩm " + j + ": " + items[j].image);
    }

    $scope.exportToExcel = function () {
        // Filter selected watches
        $scope.selectedWatches = $scope.watchs.filter(function (watch) {
            return watch.selected;
        });

        if ($scope.selectedWatches.length === 0) {
            alert('Please select at least one product.');
            return;
        }

        // Convert data to Excel format
        var data = [];
        data.push(['Mã sản phẩm', 'Tên sản phẩm', 'Giá bán', 'Giá nhập', 'Số lượng tồn', 'Mô tả', 'Trạng thái', 'Thương hiệu', 'Dòng máy', 'Giới tính',
            'Loại dây', 'Chất liệu kính', 'Tính năng', 'Kích cỡ', 'Xuất xứ', 'Chất liệu vỏ', 'Màu vỏ', 'Hình dáng']);

        $scope.selectedWatches.forEach(function (watch) {
            data.push([
                watch.code,
                watch.product.name,
                watch.price,
                watch.price_im,
                watch.quantity_stock,
                watch.description,
                watch.status,
                watch.brand.name,
                watch.machinetype.name,
                watch.gender.name,
                watch.strap.name,
                watch.glassmaterial.name,
                watch.feature.name,
                watch.size.name,
                watch.origin.name,
                watch.casematerial.name,
                watch.casecolor.name,
                watch.shape.name
            ]);
        });

        // Create a worksheet
        var ws = XLSX.utils.aoa_to_sheet(data);

        // Create a workbook
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SelectedWatches');

        // Save the workbook
        XLSX.writeFile(wb, 'selected_watches.xlsx');

        var blobUrl = URL.createObjectURL(new Blob([s2ab(blob)], { type: 'application/octet-stream' }));

        // Create a hidden input element
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.accept = '.xlsx';

        // Set the value of the input to the blob URL
        input.value = blobUrl;

        // Append the input to the body
        document.body.appendChild(input);

        // Trigger a click event on the input
        input.click();

        // Remove the input from the DOM
        document.body.removeChild(input);
    };



    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    // $scope.importFile = function (event) {
    //     var file = event.target.files[0];
    //     if (file) {
    //         // Thực hiện các bước xử lý file ở đây (ví dụ: gửi file về server)
    //         console.log('Selected file:', file);

    //         // // Gửi file về server
    //         // var formData = new FormData();
    //         // formData.append('file', file);

    //         // $http.post("http://localhost:8080/api/watch/importExcel", formData, {
    //         //     transformRequest: angular.identity,
    //         //     headers: { 'Content-Type': undefined }
    //         // }).then(function (response) {
    //         //     // Xử lý phản hồi từ server nếu cần
    //         //     console.log(response.data);
    //         // }, function (error) {
    //         //     // Xử lý lỗi nếu có
    //         //     console.error(error);
    //         // });
    //     }
    // };

    // Đảm bảo rằng bạn đã thêm đúng đường dẫn đến thư viện xlsx trong file HTML của bạn

    $scope.importFile = function () {
        document.getElementById('fileInput').click();
    };

    $scope.donghos = {};
    document.getElementById('fileInput').addEventListener('change', function (event) {
        var fileInput = event.target;
        var file = fileInput.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });

                // Assuming you have only one sheet in the workbook
                var sheet = workbook.Sheets[workbook.SheetNames[0]];

                // Iterate through each row
                var rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                // Assuming the first row is the header, skip it
                rows.shift();

                rows.forEach(function (row) {
                    // Create a WatchDetail object for each row
                    var sanPham = row[1];
                    var thuongHieu = row[7];
                    var dongMay = row[8];
                    var gioiTinh  = row[9];
                    var loaiDay   = row[10];
                    var loaiKinh  = row[11];
                    var tinhNang  = row[12];
                    var kichCo  = row[13];
                    var xuatXu  = row[14];
                    var loaiVo  = row[15];
                    var mauVo  = row[16];
                    var hinhDang  = row[17];

                    var watchDetail = {
                        code: row[0],
                        product: getProduct(sanPham),
                        price: parseFloat(row[2]),
                        price_im: parseFloat(row[3]),
                        quantity_stock: parseInt(row[4]),
                        description: row[5],
                        status: parseInt(row[6]),
                        brand:  getBrand(thuongHieu),
                        machinetype: getDongMay(dongMay),
                        gender:getGioiTinh(gioiTinh),
                        strap:getLoaiDay(loaiDay),
                        glassmaterial:getLoaiKinh(loaiKinh),
                        feature:getTinhNang(tinhNang),
                        size:getKichCo(kichCo),
                        origin:getXuatXu(xuatXu),
                        casematerial:getLoaiVo(loaiVo),
                        casecolor:getMauVo(mauVo),
                        shape:getHinhDang(hinhDang)
                        // brand:getBrand(thuongHieu),
                        // Set other properties accordingly...
                    };
                    $scope.donghos = JSON.stringify(watchDetail);
                    console.log("Đây là : " + $scope.donghos);
                    WatchService.sendWatchToServer($scope.donghos).then(function (response) {
                        // Xử lý phản hồi từ server nếu cần
                        console.log("Dữ liệu trả về: "+response.data);
                    }).catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.log(error);
                    });
                    // Do something with the created WatchDetail object
                    // console.log(watchDetail);
                });
            };

            reader.readAsArrayBuffer(file);
        }
    });

    function getBrand(thuongHieu) {
        for (var i = 0; i < $scope.thuongHieu.length; i++) {
            if ($scope.thuongHieu[i].name === thuongHieu) {
                return $scope.thuongHieu[i];
            }
        }
        return addNewBrand(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addNewBrand(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/brand/add",  thuongHieu);
        }
    }

    function getDongMay(thuongHieu) {
        for (var i = 0; i < $scope.machineType.length; i++) {
            if ($scope.machineType[i].name === thuongHieu) {
                return $scope.machineType[i];
            }
        }
        return addDongMay(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addDongMay(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/dongmay/add", thuongHieu);
        }
    }

    function getGioiTinh(thuongHieu) {
        for (var i = 0; i < $scope.gender.length; i++) {
            if ($scope.gender[i].name === thuongHieu) {
                return $scope.gender[i];
            }
        }
        return addGioiTinh(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addGioiTinh(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/gender/add",  thuongHieu);
        }
    }

    function getLoaiKinh(thuongHieu) {
        for (var i = 0; i < $scope.glassMaterial.length; i++) {
            if ($scope.glassMaterial[i].name === thuongHieu) {
                return $scope.glassMaterial[i];
            }
        }
        return addLoaiKinh(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiKinh(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/chatlieukinh/add",  thuongHieu);
        }
    }

    function getLoaiDay(thuongHieu) {
        for (var i = 0; i < $scope.strap.length; i++) {
            if ($scope.strap[i].name === thuongHieu) {
                return $scope.strap[i];
            }
        }
        return addLoaiDay(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiDay(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/strap/add",  thuongHieu);
        }
    }

    function getTinhNang(thuongHieu) {
        for (var i = 0; i < $scope.feature.length; i++) {
            if ($scope.feature[i].name === thuongHieu) {
                return $scope.feature[i];
            }
        }
        return addTinhNang(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addTinhNang(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/feature/add",  thuongHieu);
       
        }
    }

    function getKichCo(thuongHieu) {
        for (var i = 0; i < $scope.sizeMat.length; i++) {
            if ($scope.sizeMat[i].name === thuongHieu) {
                return $scope.sizeMat[i];
            }
        }
        return addKichCo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addKichCo(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/size/add",  thuongHieu);
        }
    }

    function getXuatXu(thuongHieu) {
        for (var i = 0; i < $scope.origin.length; i++) {
            if ($scope.origin[i].name === thuongHieu) {
                return $scope.origin[i];
            }
        }
        return addXuatXu(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addXuatXu(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/origin/add",  thuongHieu);
        }
    }


    function getLoaiVo(thuongHieu) {
        for (var i = 0; i < $scope.caseMaterial.length; i++) {
            if ($scope.caseMaterial[i].name === thuongHieu) {
                return $scope.caseMaterial[i];
            }
        }
        return addLoaiVo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addLoaiVo(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/casematerial/add",  thuongHieu);
        }
    }

    function getMauVo(thuongHieu) {
        for (var i = 0; i < $scope.caseColor.length; i++) {
            if ($scope.caseColor[i].name === thuongHieu) {
                return $scope.caseColor[i];
            }
        }
        return addMauVo(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addMauVo(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/casecolor/add",  thuongHieu);
        }
    }

    function getHinhDang(thuongHieu) {
        for (var i = 0; i < $scope.shape.length; i++) {
            if ($scope.shape[i].name === thuongHieu) {
                return $scope.shape[i];
            }
        }
        return addHinhDang(thuongHieu); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addHinhDang(thuongHieu) {
        if(!thuongHieu || thuongHieu.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/shape/add",  thuongHieu);
        }
    }
    // $q.all(requests).then(function (responses) {
    //     $scope.sizeMat = responses[0].data;
    //     $scope.thuongHieu = responses[1].data;
    //     $scope.caseColor = responses[2].data;
    //     $scope.caseMaterial = responses[3].data;
    //     $scope.feature = responses[4].data;
    //     $scope.gender = responses[5].data;
    //     $scope.glassMaterial = responses[6].data;
    //     $scope.machineType = responses[7].data;
    //     $scope.origin = responses[8].data;
    //     $scope.shape = responses[9].data;
    //     $scope.strap = responses[10].data;
    //     $scope.product = responses[11].data;
    // }).catch(function (error) {
    //     console.error('Lỗi trong quá trình gọi API:', error);
    // });

    function getProduct(prodcut) {
        for (var i = 0; i < $scope.product.length; i++) {
            if ($scope.product[i].name === prodcut) {
                return $scope.product[i];
            }
        }
        return addProduct(prodcut); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu
    }
    function addProduct(prodcut) {
        if(!prodcut || prodcut.trim() === ""){
            return null;
        }else{
            return $http.post("http://localhost:8080/api/product/add", prodcut);
        }
    }

   




    // function generateProducts() {
    //     $scope.productList = [];
    //     for (var i = 0; i < $scope.selectedValuesThuongHieu.length; i++) {
    //         for (var j = 0; j < $scope.selectedValues.length; j++) {
    //             for (var k = 0; k < $scope.selectedValuesGioiTinh.length; k++) {
    //                 for (var l = 0; l < $scope.selectedValuesDongMay.length; l++) {
    //                     for (var z = 0; z < $scope.selectedValues_ChatLieuDay.length; z++) {
    //                         for (var x = 0; x < $scope.selectedValues_ChatLieuKinh.length; x++) {
    //                             for (var c = 0; c < $scope.selectedValues_TinhNang.length; c++) {
    //                                 for (var v = 0; v < $scope.selectedValues_XuatXu.length; v++) {
    //                                     for (var b = 0; b < $scope.selectedValues_HinhDang.length; b++) {
    //                                         for (var n = 0; n < $scope.selectedValues_MauVo.length; n++) {
    //                                             var product = {
    //                                                 thuongHieu: $scope.selectedValuesThuongHieu[i],
    //                                                 sizeMat: $scope.selectedValues[j],
    //                                                 gender: $scope.selectedValuesGioiTinh[k],
    //                                                 machineType: $scope.selectedValuesDongMay[l],
    //                                                 strap: $scope.selectedValues_ChatLieuDay[z],
    //                                                 glassMaterial: $scope.selectedValues_ChatLieuKinh[x],
    //                                                 feature: $scope.selectedValues_TinhNang[c],
    //                                                 origin: $scope.selectedValues_XuatXu[v],
    //                                                 shape: $scope.selectedValues_HinhDang[b],
    //                                                 caseColor: $scope.selectedValues_MauVo[n],
    //                                                 image:null
    //                                             };
    //                                             $scope.productList.push(product);
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // $scope.showImagePopup = false;
    // $scope.currentProduct = null; // Sử dụng một biến để lưu trữ sản phẩm hiện tại
    // $scope.reviewImage = null; // Sử dụng biến để lưu trữ ảnh của sản phẩm hiện tại
    // $scope.selectedImage = 

    // $scope.openImagePopup = function (product) {
    //     $scope.showImagePopup = true;
    //     $scope.currentProduct = product;
    //     $scope.reviewImage = product.image;
    //     console.log(product.image);
    // };



    // // Hàm đóng cửa sổ popup hình ảnh
    // $scope.closeImagePopup = function () {
    //     $scope.showImagePopup = false;
    //     $scope.currentProduct = null;
    //     $scope.reviewImage = null;
    // };


    // // Hàm thêm hình ảnh
    // $scope.addImage = function (product) {
    //     // Tạo một đối tượng input file ẩn và kích hoạt nó
    //     var input = document.getElementById('image-upload');
    //     input.click();

    //     // Tạo một FileReader mới cho sản phẩm
    //     var reader = new FileReader();

    //     // Sử dụng sự kiện 'change' của trường input file để bắt đầu xử lý khi người dùng đã chọn hình ảnh
    //     input.addEventListener('change', function () {
    //         // Lấy danh sách các tệp được chọn bởi người dùng
    //         var files = input.files;

    //         // Xử lý các tệp ở đây (tải lên, lưu trữ, hiển thị, v.v.)
    //         // Ví dụ: tải lên hình ảnh và gán nó vào sản phẩm

    //     });
    // };

    // Hàm xóa hình ảnh
    // $scope.deleteImage = function (product) {
    //     // Kiểm tra xem sản phẩm có hình ảnh hay không
    //     if (product.image) {
    //         // Xóa hình ảnh bằng cách gán giá trị null hoặc rỗng cho trường hình ảnh
    //         product.image = null;
    //         $scope.reviewImage = null;
    //         // Cập nhật sản phẩm trong danh sách hoặc thực hiện các thao tác lưu trữ dữ liệu tùy thuộc vào yêu cầu của bạn
    //         $scope.$apply();
    //     }
    // };


    // $scope.isImagePopupOpen = false;
    // $scope.selectedProductImage = [];
    // $scope.selectedImage = null;

    // $scope.openImagePopup = function (product) {
    //     $scope.isImagePopupOpen = true;
    //     $scope.selectedProductImage = product;
    //     product.images = $scope.sel // Sử dụng trường image của sản phẩm
    //     $scope.selectedImage = product;
    //     console.log(product);
    //     // Set the image source based on the product's image property
    // };

    // $scope.closeImagePopup = function () {
    //     $scope.isImagePopupOpen = false;
    // };

    // $scope.addImage = function () {
    //     var input = document.getElementById('image-upload');

    //     input.onchange = function (e) {
    //         var file = e.target.files[0];

    //         if (file) {
    //             var reader = new FileReader();
    //             reader.onload = function (e) {
    //                 $scope.selectedProductImage = e.target.result;
    //                 $scope.selectedImage = file;
    //                 $scope.$apply(); // Make sure Angular updates the view
    //             };

    //             reader.readAsDataURL(file);
    //         }
    //     };

    //     input.click();
    // };










    // Handle image file selection
    // $scope.$watch('selectedImage', function () {
    //     if ($scope.selectedImage) {
    //         var image = new Image();
    //         image.src = URL.createObjectURL($scope.selectedImage);
    //         image.onload = function () {
    //             if (image.width <= 100 && image.height <= 100) {
    //                 $scope.selectedProductImage = image.src;
    //             } else {
    //                 alert('Kích thước ảnh không hợp lệ. Ảnh phải có kích thước tối đa 100x100.');
    //             }
    //         };
    //     }
    // });
})