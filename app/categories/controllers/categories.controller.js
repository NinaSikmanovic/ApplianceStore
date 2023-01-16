var categories;

categoriesModule.controller = function (){
    return{
        setCategories: function (categoriesArray){
            categories = categoriesArray;
        },
        getCategories: function () {
            return categories;
        }
    }
}

