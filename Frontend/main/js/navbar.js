myapp.service('ProductService', function() {
    alert("helool")
    var products = [
        { id: 1, name: 'Sản phẩm 1' },
        { id: 2, name: 'Sản phẩm 2' },
        { id: 3, name: 'Sản phẩm 3' }
    ];

    this.getProducts = function() {
        return products;
    };

    this.addProduct = function(product) {
        products.push(product);
    };
});