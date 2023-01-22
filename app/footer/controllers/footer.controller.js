var footer;
var test;

footerModule.controller = function (){
    return {
        setFooter: function (footerLinks) {
            footer = footerLinks;
        },
        getFooter: function () {
            return footer;
        }
    }
}
