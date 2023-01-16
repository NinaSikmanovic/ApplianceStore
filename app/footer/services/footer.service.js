footerModule.request = function (){
        return new Promise((resolve, reject) => {
            axios.get(" http://localhost:3000/footer-menu")
                .then(function (response) {
                    resolve(response);
                });
        });
}

