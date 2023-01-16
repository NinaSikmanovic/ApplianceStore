categoriesModule.request = function () {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/categories")
            .then(function (response) {
                resolve(response);
            });
    });
}



