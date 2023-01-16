function getViewData() {
    debugger
    return {
        footer: footerModule.controller().getFooter(),
        fridges: productsModule.controller().getFridges(),
        header: headerModule.controller().getHeader(),
        categories: categoriesModule.controller().getCategories(),
    }
}

function getViewDataProduct() {
    return productModule.controller().getProduct()
}

function renderHTML() {
    var rawTemplate = document.getElementById("render").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    console.log('renderData',getViewData())
    var ourGeneratedHTML = compiledTemplate(getViewData());
    var container = document.getElementById("render");
    container.innerHTML = ourGeneratedHTML;
}

function renderHTMLTest() {
    var rawTemplate = document.getElementById("render").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var container = document.getElementById("render");
    container.innerHTML = ourGeneratedHTML;
}


