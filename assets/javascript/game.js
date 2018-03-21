//Create an object to hold game info.
var fightersObj = {
    availableDefenders: [],
    vdefender: null,
    vplayer: null,
    playerPower: 0,
    defenderPower: 0,
    playerHP: 0,
    defenderHP: 0,
    tmpPlayerHP: 0,
    tmpPlayerAP: 0,
    imgDir: "assets/images/",
    //Array of fighters
    fightersArr: [{
        name: "Obi-Wan Kenobi",
        health_point: "120",
        attack_damage: "21",
        flag: false,
        image: "Obi-Wan-Kenobi.jpg"
    }, {
        name: "Chibi Maul",
        health_point: "210",
        attack_damage: "25",
        flag: false,
        image: "Chibi-Maul.jpg"

    }, {
        name: "Darth Sidious",
        health_point: "150",
        attack_damage: "17",
        flag: false,
        image: "Darth-Sidious.jpg"

    }, {
        name: "Luke Skywalker",
        health_point: "300",
        attack_damage: "11",
        flag: false,
        image: "Luke-Skywalker.jpg"
    }],

    //attackBtnFunction 
    attackBtnFunction: function () {
        if (this.tmpPlayerAP == 0 && this.tmpPlayerHP == 0) {
            $("#vplayerHP").html("<p class='pContent'>You attacked " + fightersObj.vdefender.name + " for " + fightersObj.vplayer.attack_damage
                + " damage.</p>");
            fightersObj.playerHP = parseInt(fightersObj.vplayer.health_point);
        }
        $("#vdefenderHP").html("<p class='pContent'>" + fightersObj.vdefender.name + " attacked You back for " + fightersObj.vdefender.attack_damage + " damage.</p>");
        //Initialize the player and defender health points
        fightersObj.defenderHP = parseInt(fightersObj.vdefender.health_point);
        //Update defender button css
        var $defenderBtn = $("<button>");
        $defenderBtn.addClass("btn newBtn pickedDefender");
        $defenderBtn.html("<p>" + fightersObj.vdefender.name + "</p>"
            + "<p>" + '<a href="#"> <img src="' + fightersObj.imgDir + fightersObj.vdefender.image + '"></a>' + "</p>"
            + "<p>" + fightersObj.vdefender.health_point + "</p>");
        $("#your-defender").html($defenderBtn);
        //unload all previous click event
        $("#attackId").off("click");
        $("#attackId").on("click", ".attack", function () {
            //check to see if the defender is choosen
            if ($("#your-defender").html() == "") {
                $("#vdefenderHP").html("<p class='pContent'>No Defender!<br>Pick an enemy to fight.</p>");
            }
            else {
                if (this.tmpPlayerAP > 0 && this.tmpPlayerHP > 0) {
                    $("#vplayerHP").html("<p class='pContent'>You attacked " + fightersObj.vdefender.name + " for " + this.tmpPlayerAP + " damage.</p>");
                    fightersObj.playerHP = this.tmpPlayerHP;
                }
                else {
                    $("#vplayerHP").html("<p class='pContent'>You attacked " + fightersObj.vdefender.name + " for " + fightersObj.vplayer.attack_damage
                        + " damage.</p>");
                }
                $("#vdefenderHP").html("<p class='pContent'>" + fightersObj.vdefender.name + " attacked You back for " + fightersObj.vdefender.attack_damage + " damage.</p>");
                //Accumulate player attack power by click
                fightersObj.defenderPower = parseInt(fightersObj.vdefender.attack_damage);
                //Accumulate player attack power by click
                fightersObj.playerPower += parseInt(fightersObj.vplayer.attack_damage);
                //Deduct defender health point by player attack power
                fightersObj.defenderHP -= fightersObj.playerPower;
                //Deduct player health point by defender attack power
                fightersObj.playerHP -= fightersObj.defenderPower;
                //Display updated defender health points
                var $defenderBtn = $("<button>");
                $defenderBtn.addClass("btn newBtn pickedDefender");
                $defenderBtn.html("<p>" + fightersObj.vdefender.name + "</p>"
                    + "<p>" + '<a href="#"> <img src="' + fightersObj.imgDir + fightersObj.vdefender.image + '"></a></p>' + "<p>" + fightersObj.defenderHP + "</p>");
                $("#your-defender").html($defenderBtn);

                //Display updated player health points
                var $playerBtn = $("<button>");
                $playerBtn.addClass("btn newBtn");
                $playerBtn.html("<p>" + fightersObj.vplayer.name + "</p>"
                    + "<p>" + '<a href="#"> <img src="' + fightersObj.imgDir + fightersObj.vplayer.image + '"></a>' + "</p>"
                    + "<p>" + fightersObj.playerHP + "</p>");
                $("#your-player").html($playerBtn);

                //Display updated player power
                $("#vplayerHP").html("<p class='pContent'>You attacked " + fightersObj.vplayer.name + " for " + fightersObj.playerPower + " damage.</p>");

                if (fightersObj.playerHP <= 0 && fightersObj.defenderHP <= 0) {
                    $(".attack").hide();
                    $(".restart").show();
                    $("#vdefenderHP").html("");
                    $("#vplayerHP").html("<h1 class='draw'>Draw...<br>Try Again!!!</h1>");
                    $("#attackId").on("click", ".restart", function () {
                        fightersObj.restartGame();
                    });
                }
                //if defender health points less than or equal 0
                else if (fightersObj.defenderHP <= 0) {
                    //Record player current health points and attack power
                    fightersObj.tmpPlayerAP = fightersObj.playerPower;
                    fightersObj.tmpPlayerHP = fightersObj.playerHP;
                    $("#your-defender, #vdefenderHP").html("");
                    $("#vplayerHP").html("<p class='pContent'>You have defeated " + fightersObj.vdefender.name + ".</p><p class='pContent'>You can choose to fight another enemy.</p>");
                    //If player have defeated all defenders then show restart button 
                    if (fightersObj.availableDefenders.length == 0) {
                        $(".attack").hide();
                        $(".restart").show();
                        $("#vplayerHP").html("<h1 class='win'>You Win!!!</h1>");
                        $("#attackId").on("click", ".restart", function () {
                            fightersObj.restartGame();
                        });
                    }
                }
                //if player health point is less than or equal to 0
                else if (fightersObj.playerHP <= 0) {
                    $(".attack").hide();
                    $(".restart").show();
                    $("#vplayerHP").html("<h1 class='lost'>You Loose!!!</h1>");
                    $("#attackId").on("click", ".restart", function () {
                        fightersObj.restartGame();
                    });
                }
            }
        });
    },//end of attackBtnFunction

    //List all characters for user to pick
    displayCharacters: function () {
        $("#characters").html("<p class='pTitle col-md-2'>Select your player to get started :</p>");
        for (var i = 0; i < this.fightersArr.length; i++) {
            //Create new button to load individual character
            var $newBtn = $("<button id='newBtn" + i + "'>");
            $newBtn.addClass("btn newBtn").attr("value", i);
            $newBtn.html("<p>" + this.fightersArr[i].name + "</p>"
                + "<p>" + '<a href="#"> <img src="' + this.imgDir + this.fightersArr[i].image + '"></a>' + "</p>"
                + "<p>" + this.fightersArr[i].health_point + "</p>");
            $("#characters").append($newBtn);
        }
        this.pickPlayer();
    },//end of displayCharacters

    //Function to pick player
    pickPlayer: function () {
        $("#player-opponent, #attackId").hide();
        //Pick a player
        $("#characters").on("click", ".btn", function () {
            var $pickaPlayer = $(this).val();
            fightersObj.fightersArr[$pickaPlayer].flag = true;
            var $newBtn = $("<button>");
            $newBtn.addClass("btn newBtn");
            $newBtn.html("<p>" + fightersObj.fightersArr[$pickaPlayer].name + "</p>"
                + "<p>" + '<a href="#"> <img src="' + fightersObj.imgDir + fightersObj.fightersArr[$pickaPlayer].image + '"></a>' + "</p>"
                + "<p>" + fightersObj.fightersArr[$pickaPlayer].health_point + "</p>");
            $("#your-player").html($newBtn);
            $("#characters").html("");
            $("#player-opponent").show();
            //Assign pickedPlayer to vplayer for attack tracking
            fightersObj.vplayer = fightersObj.fightersArr[$pickaPlayer];
            fightersObj.updateDefenders(fightersObj.fightersArr);
        });
    },

    //UpdateDefenders to update defender list when user pick a new defender
    updateDefenders: function (dArray) {
        fightersObj.availableDefenders = [];
        for (var l = 0; l < dArray.length; l++) {
            if (!dArray[l].flag) {
                fightersObj.availableDefenders.push(dArray[l]);
            }
        }
        dArray = [];
        this.displayDefenders(fightersObj.availableDefenders);
    }, //end of updateDefenders

    //displayDefenders function
    displayDefenders: function (defendersList) {
        $("#your-defenders").html("<p class='pTitle'>Pick an Enemy to attack :</p>");
        for (var i = 0; i < defendersList.length; i++) {
            var $newBtn = $("<button id='newBtn" + i + "'>");
            $newBtn.addClass("btn newBtn availDefenders").attr("value", i);
            $newBtn.html("<p>" + defendersList[i].name + "</p>"
                + "<p>" + '<a href="#"> <img src="' + this.imgDir + defendersList[i].image + '"></a>' + "</p>"
                + "<p>" + defendersList[i].health_point + "</p>");
            $("#your-defenders").append($newBtn);
        }
        defendersList = [];
        this.pickDefender();
    },//end of displayDefenders function

    //Function to pick defender
    pickDefender: function () {
        $("#your-defenders").on("click", ".btn", function () {
            if ($("#your-defender").html() == "") {
                fightersObj.vdefender = null;
                var $pickaDefender = $(this).val();
                fightersObj.availableDefenders[$pickaDefender].flag = true;
                var $newBtn = $("<button>");
                $newBtn.addClass("btn newBtn");
                $newBtn.html("<p>" + fightersObj.availableDefenders[$pickaDefender].name + "</p>"
                    + "<p>" + '<a href="#"> <img src="' + fightersObj.imgDir + fightersObj.availableDefenders[$pickaDefender].image + '"></a>' + "</p>"
                    + "<p>" + fightersObj.availableDefenders[$pickaDefender].health_point + "</p>");
                $("#your-defender").html($newBtn);
                $("#your-defenders").html("");
                $("#attackId").show();
                fightersObj.vdefender = fightersObj.availableDefenders[$pickaDefender];
                fightersObj.updateDefenders(fightersObj.availableDefenders);
                if (fightersObj.availableDefenders.length == 0) {
                    $("#your-defenders").html("");
                }
                fightersObj.attackBtnFunction();
            }
        });
    },

    //restartGame function
    restartGame: function () {
        fightersObj.availableDefenders.length = 0;
        fightersObj.vdefender = null;
        fightersObj.vplayer = null;
        fightersObj.playerPower = 0;
        fightersObj.playerHP = 0;
        fightersObj.defenderHP = 0;
        fightersObj.tmpPlayerHP = 0;
        fightersObj.tmpPlayerAP = 0;
        $("#your-defenders, #your-defender, #your-player").html("");
        fightersObj.displayCharacters();
        for (var i = 0; i < fightersObj.fightersArr.length; i++) {
            fightersObj.fightersArr[i].flag = false;
        }
        $(".attack").show();
        $(".restart").hide();
    }//end of restartGame
}//end of object bracket
fightersObj.displayCharacters();