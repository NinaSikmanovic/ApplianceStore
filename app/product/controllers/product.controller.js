var product;

function openProduct(event) {
    $("#includedContent-product-page").load("app/product/views/open-product.view.html");
    var productId = event.currentTarget.id;
    hideMainContent();
    productModule.model.request(productId).then((values) => {
        productModule.controller().setProduct(values.data);
        productModule.view();
        showContent();
    });
}

productModule.controller = function () {
    return {
        setProduct: function (productData) {
            product = productData;
        },
        getProduct: function () {
            return product;
        }
    }
}

function renderProductItem() {
    var template = document.getElementById("product-render-id").innerHTML;
    var compiled = Handlebars.compile(template);
    var generatedHTML = compiled(getViewDataProduct());
    var container2 = document.getElementById("product-render-id");
    container2.innerHTML = generatedHTML;
}

productModule.view = renderProductItem;
