var fetchProductData = function (productId) {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/products/" + productId)
            .then(function (response) {
                resolve(response);
            });
    });
}

productModule.model = {
    request: fetchProductData
}

