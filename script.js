// input
var input = '';
// health labels
var healthLabel = "&health=";
// diets
var keto = "keto-friendly";
var pesca = "pescatarian";
var vegan = "vegan";
var vegetarian = "vegetarian";
// intolerances
var gluten = "gluten-free";
var lactoseIntolerant = "dairy-free";
// meal type
var mealType = "&mealType=";
var breakfast = "Breakfast";
var lunch = "Lunch";
var dinner = "Dinner";
// cuisine type
var cuisineType = "&cuisineType=";
var american = "American";
var asian = "Asian";
var british = "British";
var caribbean = "Caribbean";
var centralEurope = "Central Europe";
var chinese = "Chinese";
var easternEurope = "Eastern Europe";
var french = "French";
var indian = "Indian";
var italian = "Italian";
var japanese = "Japanese";
var kosher = "Kosher";
var mediterranean = "Mediterranean";
var mexican = "Mexican";
var middleEastern = "Middle Eastern";
var nordic = "Nordic";
var southAmerican = "South American";
var southEastAsian = "South East Asian";



function getRecipe() {
    
    var queryURL = "https://api.edamam.com/search?q=" + input + "&count=10&app_id=3b067d8684260b2f7abcb8eb43481d4c" 

    // if (checkbox == true) {}

    $.ajax({
        url: queryURL,
        method: "GET"


    }).then(function(response) {
        console.log(queryURL);
        console.log(response.hits[0].recipe.url);




    })
    
}




$("#searchButton").on("click", function(event) {
event.preventDefault();

var input = $("#searchField").val().trim();

if (input === "") {
return;
 }

 getRecipe();
 

})