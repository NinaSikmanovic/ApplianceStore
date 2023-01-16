var footer;

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
