const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content_index nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content_index nav form .form-input button');
const searchBtnIcon = document.querySelector('.content_index nav form .form-input button .bx');
const searchForm = document.querySelector('.content_index nav form');

// searchBtn.addEventListener('click', function (e) {
//     if (window.innerWidth < 576) {
//         e.preventDefault;
//         searchForm.classList.toggle('show');
//         if (searchForm.classList.contains('show')) {
//             searchBtnIcon.classList.replace('bx-search', 'bx-x');
//         } else {
//             searchBtnIcon.classList.replace('bx-x', 'bx-search');
//         }
//     }
// });

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        // searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

// Lấy danh sách các mục con của "Product"
const productSubMenu = document.querySelector('.sub-menu');

// Lấy mục "Product"
const productMenuItem = document.querySelector('.product');

// Bắt đầu ẩn mục con của "Product"
productSubMenu.style.display = 'none';

// Thêm sự kiện click vào mục "Product"
productMenuItem.addEventListener('click', () => {
    // Toggle hiển thị mục con của "Product"
    if (productSubMenu.style.display === 'none') {
        productSubMenu.style.display = 'block';
    } else {
        productSubMenu.style.display = 'none';
    }
});

// function logout(){
//     window.location.href="/index.html"
// }



var myapp = angular.module('adminapp',["ngRoute"]);

myapp.controller('HeaderController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
    var username = localStorage.getItem('username');
    if (username) {
        $scope.username = username;
    }
    $scope.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('idac');
        $scope.username = "";
        // $rootScope.isLoggedIn = false;
        $location.path('/login');
    };
}]);

myapp.config(function ($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/banhang",{
            templateUrl:"banhang.html",
            controller:"banhang-ctrl"
        })
        .when("/product",{
            templateUrl:"productAdmin.html",
            controller:"product-ctrl"
        })
        .when("/order",{
            templateUrl:"order.html",
            controller:"order-ctrl"
        })
        .when("/login",{
            templateUrl:"login.html",
            controller:"loginAdmin-ctrl"
        })
        .otherwise({
            redirectTo: "/banhang"
        });
})
