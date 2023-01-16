var fridges;

productsModule.controller = function (){
    return {
        setFridges: function (fridgesArray) {
            fridges = fridgesArray;
        },
        getFridges: function () {
            console.log('getter',fridges)
            return fridges;
        }
    }
}

