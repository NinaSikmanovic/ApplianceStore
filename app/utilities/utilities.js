function addOne() {
    var number = parseInt(document.getElementById("number").value);
    value = number + 1;
    document.getElementById("number").value = value;
}

function openTab(evt, listnumber) {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].setAttribute("style", "display: none !important");
    }
    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(listnumber).setAttribute('style', 'display:flex !important');
    evt.currentTarget.className += " active";
}

function hideMainContent() {
    document.getElementById("mainContent").setAttribute("style", "display: none !important");
}

function showContent() {
    document.getElementById("includedContent-product-page").setAttribute("style", "display: block !important");
    document.getElementById("hide").setAttribute("style", "display: block !important");
}

function searchItem(event) {
    if (event.key === "Enter"){
        var value = event.currentTarget.value;
        productsModule.controller().setFridges([fridges[0]]);
        document.getElementById("productsTest").contentWindow.location.reload(true);
        renderHTML();
        document.getElementById("productsTest").contentWindow.location.reload(true);
    }
}


