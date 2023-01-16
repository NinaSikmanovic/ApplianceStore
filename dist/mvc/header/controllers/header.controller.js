var header;

headerModule.controller = function (){
    return{
        setHeader: function (headerLinks) {
            header = headerLinks;
        },
        getHeader: function () {
            return header;
        }
    }
}