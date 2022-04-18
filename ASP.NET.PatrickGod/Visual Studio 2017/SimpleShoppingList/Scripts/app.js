// Global variable
var currentList = {};

function createShoppingList() {
    // Her bruger vi jQuery til at findeu ud af, hvad der pt står i et bestemt input element i index.html-filen.
    // "We say to jQuery: Hey, I want to access a DOM element with a specific id" (and get the value of that element (an input field in this case))
    currentList.name = $("#shoppingListName").val();

    // Reset the global currentList variable
    currentList.items = new Array();

    // Web Service Call
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList/",
        data: currentList,
        success: function (result) {
            showShoppingList();
        },
        error: function () {
            console.error("Something bad happened! :(");
        }
    });
}

function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name); // Change the html of an element with a specific id (a header element in this case)
    $("#shoppingListItems").empty(); // Clear the list
    $("#createListDiv").hide(); // Hide this view
    $("#shoppingListDiv").show(); // Show this view

    // Set input focus to the shopping list name input element
    $("#newItemName").focus();

    // Listen to every keypress in that input element
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });

}

function addItem() {
    var newItem = {}; // Create a new object
    newItem.name = $("#newItemName").val(); // Gie the object a name that we retrieve form another dom element
    newItem.shoppingListId = currentList.id;

    // When we mocked it
    //currentList.items.push(newItem); // Add it to the list
    //console.info(currentList); // Test

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Item/",
        data: newItem,
        success: function (result) {
            currentList = result;
            drawItems();
            $("#newItemName").val(""); // Clear the input field
        },
        error: function () {
            console.error("Something bad happened! :(");
        }
    });
}

// General purpose function for drawing list of items
function drawItems() {
    // Tøm listen i viewet, og hold fast i et handle til det
    // Bemærk: Vi bruger et foranstillet dollartegn, når vi erklærer et antal objekter.
    //         Det er for at angive, at det er såkaldte jQuery objekter.
    //         Jeg mistænker at det bare er en konvention, da det tilsyneladende også virker, hvis man
    //         udelader dollartegnet.
    // Bemærk: Vi tilføjer button click event handlers undervejs, altså referencer til handler funktionerne
    //         inklusive de parametre, der sendes med.
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem (" + currentItem.id + ")'>C</button>").appendTo($li);

        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    // Remove the item from the global list, and redraw the list
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(itemId) {
    // When we mocked it
    /*
    if ($("#item_" + index).hasClass("checked")) {
        console.info("removing checked class from element");
        $("#item_" + index).removeClass("checked");
    } else {
        // Add a css class to the element in question, using a style from our styles.css file
        console.info("adding checked class to element");
        $("#item_" + index).addClass("checked");
    }
    */

    //var item = currentList.items[index];
    //item.checked = !item.checked;

    var changedItem = {};

    for (var i = 0; i < currentList.items.length; i++) {
        if (currentList.items[i].id == itemId) {
            changedItem = currentList.items[i];
        }
    }

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + itemId,
        data: changedItem,
        success: function (result) {
            currentList = result;
            drawItems();
        },
        error: function () {
            console.error("Something bad happened! :(");
        }
    });
}

function getShoppingListById(id) {
    /*
    console.info(id);
    currentList.name = "Mock Shopping List";
    currentList.items = [
        { name: "Milk" },
        { name: "Cornflakes" },
        { name: "Strawberries" }
    ];

    showShoppingList();
    drawItems();
    */

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        },
        error: function() {
            console.error("Something bad happened! :(");
        }
    });
}

$(document).ready(function () {
    console.info("ready");

    // Set input focus to the shopping list name input element
    $("#shoppingListName").focus();

    // Listen to every keypress in that input element
    $("#shoppingListName").keyup(function(event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }
    });

    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex != -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }

    /*
    console.info("before call to web api");

    $.ajax({
        url: "http://api.exchangeratesapi.io/v1/latest?access_key=3d5861a43985fbc3778eda7aaa2fefa9&symbols=USD,INR",
        type: "GET",
        dataType: "json",
        success: function(result) {
            console.info("after apparently receiving a response from the web api");
        }
    });
    console.info("after call to web api");
    */
});