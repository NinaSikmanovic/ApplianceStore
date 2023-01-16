productsModule.request = function () {
    return new Promise((resolve, reject) => {
        axios.get(" http://localhost:3000/products")
            .then(function (response) {
                resolve(response);
            });
    });
}

