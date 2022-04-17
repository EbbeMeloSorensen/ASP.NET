// Global variable
var currentList = {};

function createShoppingList() {
    // Her bruger vi jQuery til at findeu ud af, hvad der pt står i et bestemt input element i index.html-filen.
    // "We say to jQuery: Hey, I want to access a DOM element with a specific id" (and get the value of that element (an input field in this case))
    currentList.name = $("#shoppingListName").val();

    // Todo: Web Service Call
    // (for now, we just pretend to call a web service)

    $("#shoppingListTitle").html(currentList.name); // Change the html of an element with a specific id (a header element in this case)
    $("#shoppingListItems").empty(); // Clear the list
    $("#createListDiv").hide(); // Hide this view
    $("#shoppingListDiv").show(); // Show this view
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