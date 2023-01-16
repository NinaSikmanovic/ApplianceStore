function scrollFunction() {

    var mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(function () {

//.ready

    $("#includedContent").load("app/header/views/header.view.html");
    $("#includedContent-footer").load("app/footer/views/footer.view.html");
    $("#includedContent-categories").load("app/categories/views/categories.view.html");
    $("#includedContent-products").load("app/products/views/products.view.html");

    setTimeout(() => {
        Promise.all([footerModule.request(), headerModule.request(), categoriesModule.request(), productsModule.request()]).then((values) => {
            footerModule.controller().setFooter(values[0].data);
            headerModule.controller().setHeader(values[1].data);
            categoriesModule.controller().setCategories(values[2].data);
            productsModule.controller().setFridges(values[3].data);
            renderHTML();
        });
        window.onscroll = function () {
            scrollFunction()
        };
    });
});

function gohome()
{
    window.location="index.html"
}

