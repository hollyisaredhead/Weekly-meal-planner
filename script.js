var recipeSet = [];

    // input    
    // var input = document.querySelector('#searchBar').value
    // var queryURL = "https://api.edamam.com/search?q=" + input + "&from=0&to=100&app_id=de5d421e&app_key=3b067d8684260b2f7abcb8eb43481d4c" 
    // health labels
    var healthLabel = "&health=";
    // diets
    var keto = "keto-friendly";
    var pesca = "pescatarian";

    // allowable filters
    var balanced = "balanced";
    var highProtein = "high-protein"
    var lowFat = "low-fat";
    var lowCarb = "low-carb";
    var sugarConscious = "sugar-conscious";
    var peanutFree = "peanut-free";
    var treeNutFree = "tree-nut-free";
    var alcoholFree = "alcohol-free";
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




    var setnumber = 0;

    // getRecipe();

    $(document).ready(function () {


    $("#nextSet").on("click", function (event) {


        if (setnumber > 8) {
            return;
        }

        else {
            event.preventDefault();
            setnumber++
            renderList();
        }
    })


    $("#previousSet").on("click", function (event) {
        if (setnumber <= 0) {
            return
        }

        else {

            event.preventDefault();
            setnumber--
            renderList();
        }

    })

    $("#searchButton").on("click", function (event) {
        event.preventDefault();

        $(".spinner").attr("uk-spinner", "uk-spinner")



        // var input = encodeURI(input)


        // if (input === "") {

        // return;

        //  }



        getRecipe();


    })

    function getRecipe() {

        var input = document.querySelector('#searchBar').value
        var queryURL = "https://api.edamam.com/search?q=" + input + "&from=0&to=100&app_id=de5d421e&app_key=3b067d8684260b2f7abcb8eb43481d4c"



        if (document.getElementById("vegan").checked === true) {

            var queryURL = queryURL.concat(healthLabel, vegan)

        }

        // if ( document.getElementById("balanced").checked = true) {

        //     var queryURL = queryURL.concat(healthLabel, balanced)
        // }

        // if ( document.getElementById("low-fat").checked = true) {

        //     var queryURL = queryURL.concat(healthLabel, lowFat)
        // }

        // if ( document.getElementById("low-carb").checked = true) {

        //     var queryURL = queryURL.concat(healthLabel, lowCarb)
        // }

        if (document.getElementById("sugar-conscious").checked === true) {

            var queryURL = queryURL.concat(healthLabel, sugarConscious)
        }

        if (document.getElementById("peanut-free").checked === true) {

            var queryURL = queryURL.concat(healthLabel, peanutFree)
        }

        if (document.getElementById("tree-nut-free").checked === true) {

            var queryURL = queryURL.concat(healthLabel, treeNutFree)
        }

        if (document.getElementById("vegetarian").checked === true) {

            var queryURL = queryURL.concat(healthLabel, vegetarian)
        }

        // if ( document.getElementById("high-protein").checked = true) {

        //     var queryURL = queryURL.concat(healthLabel, highProtein)
        // }

        if (document.getElementById("alcohol-free").checked === true) {

            var queryURL = queryURL.concat(healthLabel, alcoholFree)

        }

        $.ajax({
            url: queryURL,
            method: "GET"


        }).then(function (response) {

            $(".spinner").removeAttr("uk-spinner", "uk-spinner")
            
            console.log(queryURL);

            setnumber = 0;
            recipeSet = response.hits
            
            renderList();

        })


            // user click on next set



function renderList () {

  
    $(".spinner").remove();
    $("#accordion").text("")
    

    for(var i = 0; i <= 9; i++){
        
        // recipe labels 
        recipeSet[ setnumber*10+i ];
            
        li = $("<div>")
        li.addClass("uk-margin-top uk-background-default")

        
        
        addRecipeButton = $("<button>")
        addRecipeButton.addClass("uk-margin-left addRecipe recipeButton uk-padding-small")
        addRecipeButton.attr("uk-icon", "calendar")
        addRecipeButton.attr("uk-tooltip", "title: Add to Calendar")
        
        
        
        recipeLabel = $("<li>" + recipeSet[ setnumber*10+i ].recipe.label + "</li>")
        li.prepend(addRecipeButton)
        addRecipeButton.css("float", "right");
       
        

        recipeLabel.attr("href", "#")
        addRecipeButton.attr("data-recipe-id", recipeSet[ setnumber*10+i ].recipe.uri)
        // recipeLabel.attr("data", `label-${i}`)
        // recipeLabel.data("recipeId",recipeSet[ setnumber*10+i ].recipe.uri)
        recipeLabel.addClass("uk-accordion-title uk-margin-top uk-margin-left")
        
        
        
        // accordion div
        accordionDiv = $("<div>");
        accordionDiv.addClass("uk-accordion-content uk-card-default")
        accordionDiv.css("border-radius", "15px")
        // accordionDiv.attr("data", `details-${i}`)

        IngredientsDiv = $("<h3>" + "Ingredients:" + "</h3>")
        IngredientsDiv.addClass("uk-margin-left uk-margin-top")
        // ingredients header ul

        ingredientsUl = $("<ul>");
        ingredientsUl.addClass("")

        

        // recipe ingredients

        

        
        $.each(recipeSet[ setnumber*10+i ].recipe.ingredientLines, function (index, value) {
            
            

            recipeIngredients = $("<li>" + value + "</li>")
            recipeIngredients.addClass("uk-padding-small")
    
            ingredientsUl.append(recipeIngredients)

            
        })


        // recipe image

            recipeImg = $("<img>").css({ 'height': '150px', 'width': '200px' });
            
            recipeImg.attr("src", recipeSet[ setnumber*10+i ].recipe.image);

            recipeImg.addClass("uk-margin-top uk-margin-right")
            recipeImg.css("float", "right")
            
           

        // recipe url

            recipeUrl = $("<button>");
            recipeUrlLink = $("<a>" + "Link to Recipe" + "</a>");
            recipeUrlLink.attr("href", recipeSet[ setnumber*10+i ].recipe.url)
            recipeUrlLink.attr("target", "_blank")
            recipeUrl.append(recipeUrlLink);
            recipeUrl.addClass("uk-margin-left uk-margin-bottom")
            
            
        

            accordionDiv.append(IngredientsDiv, recipeImg, ingredientsUl, recipeUrl)
            li.append(recipeLabel, accordionDiv)
            $("#accordion").append(li)
            
    }
    
   

}
    }

    
    
        
});