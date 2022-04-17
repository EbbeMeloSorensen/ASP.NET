﻿// Global variable
var currentList = {};

function createShoppingList() {
    // Her bruger vi jQuery til at findeu ud af, hvad der pt står i et bestemt input element i index.html-filen.
    // "We say to jQuery: Hey, I want to access a DOM element with a specific id" (and get the value of that element (an input field in this case))
    currentList.name = $("#shoppingListName").val();

    // Reset the global currentList variable
    currentList.items = new Array();

    // Todo: Web Service Call
    // (for now, we just pretend to call a web service)

    $("#shoppingListTitle").html(currentList.name); // Change the html of an element with a specific id (a header element in this case)
    $("#shoppingListItems").empty(); // Clear the list
    $("#createListDiv").hide(); // Hide this view
    $("#shoppingListDiv").show(); // Show this view
}

function addItem() {
    var newItem = {}; // Create a new object
    newItem.name = $("#newItemName").val(); // Gie the object a name that we retrieve form another dom element
    currentList.items.push(newItem); // Add it to the list
    console.info(currentList); // Test

    drawItems();
}

// General purpose function for drawing list of items
function drawItems() {
    // Tøm listen i viewet, og hold fast i et handle til det
    // Bemærk: Vi bruger et foranstillet dollartegn, når vi erklærer et antal objekter.
    //         Det er for at angive, at det er såkaldte jQuery objekter.
    //         Jeg mistænker at det bare er en konvention, da det tilsyneladende også virker, hvis man
    //         udelader dollartegnet.
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button>D</button>").appendTo($li);
        var $checkBtn = $("<button>C</button>").appendTo($li);
        $li.appendTo($list);
    }
}

$(document).ready(function () {
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
});