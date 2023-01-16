headerModule.request = function (){
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/navbar-menu")
            .then(function (response) {
                resolve(response);
            });
    });
}
