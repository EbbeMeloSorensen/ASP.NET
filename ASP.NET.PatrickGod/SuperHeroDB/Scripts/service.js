function getAllHeroes() {
    $.ajax({
        url: "Service/SuperHeroService.svc/GetAllHeroes",
        type: "GET",
        dataType: "json",
        success: function (result) {
            heroes = result;
            drawHeroTable(result);
        }
    });
}