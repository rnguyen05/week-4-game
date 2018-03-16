
//Create an object to hold all games info.
var fightersObj = {
        imgDir: "assets/images/",
        choosenYourChar: false, 
        chooseDefChar: false,
        charDivStyle: "width: 190px, height: 190px, background-color: white, margin: 10px",
        //Array of fighters
        fightersArr: [{
            name: "Obi-Wan Kenobi",
            health_point: "120",
            image: "Obi-Wan-Kenobi.jpg"
        }, {
            name: "Chibi Maul",
            health_point: "180",
            image: "Chibi-Maul.jpg"

        }, {
            name: "Darth Sidious",
            health_point: "150",
            image: "Darth-Sidious.jpg"

        }, {
            name: "Luke Skywalker",
            health_point: "100",
            image: "Luke-Skywalker.jpg"

        }],
        //List all characters for user to pick
        displayCharacters: function () {
            for (var i = 0; i < this.fightersArr.length; i++) {
                //Create new div to load individual character
                var $newDiv = $("<div id='newDiv"+i+"'>"); 
                $newDiv.addClass("newDiv");
                $newDiv.html("<p>" + this.fightersArr[i].name + "</p>"
                                        + "<p>" + '<a href="#"> <img src="'+this.imgDir + this.fightersArr[i].image +'"></a>' + "</p>"
                                        + "<p>" + this.fightersArr[i].health_point + "</p>");
                $("#characters").append($newDiv);
            }  
        }
}


$("#characters").on("click", function() {
    $(this).hide();
});

fightersObj.displayCharacters();



