var heroes = {};

function getAllHeroes() {
    // Mocking for a start
    heroes.items = new Array();

    heroes.items = [
        { id: 0, firstName: "Peter", lastName: "Parker", heroName: "Spiderman", placeOfBirth: "New York", combat: 85 },
        { id: 1, firstName: "Bruce", lastName: "Wayne", heroName: "Batman", placeOfBirth: "Gotham City", combat: 100 }
    ];

    drawHeroTable(heroes);
}

function drawHeroTable(heroList) {
    $tbody = $("#table-body");
    $tbody.empty();
    for (var i = 0; i < heroList.items.length; i++) {
        $tr = $("<tr>");
        $("<td>").html(heroList.items[i].firstName).appendTo($tr);
        $("<td>").html(heroList.items[i].lastName).appendTo($tr);
        $("<td>").html(heroList.items[i].heroName).appendTo($tr);
        $("<td>").html(heroList.items[i].placeOfBirth).appendTo($tr);
        $("<td>").html(heroList.items[i].combat).appendTo($tr);
        $tbody.append($tr);
    }
}

$(document).ready(function () {
    console.info("ready");
    getAllHeroes();
});