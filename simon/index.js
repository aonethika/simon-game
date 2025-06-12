var level = 0;
var sequence = [];        
var userSequence = [];    
$(document).keypress(function () {
    if (level === 0) {
        nextLevel();
    }
});

function nextLevel() {
    userSequence = [];
    level++;
    $("h1").text("Level " + level);

    
    var num = Math.floor(Math.random() * 4) + 1;
    var newSquare = "sqr" + num;
    sequence.push(newSquare);

   
    var square = $(".sqr").find("." + newSquare);
    setTimeout(() => {
        square.fadeOut(200).fadeIn(200);
    }, 500);
}


$(".sqr").children().click(function () {
    var clickedClass = $(this).attr("class");
    var color = $(this).attr("id")
    userSequence.push(clickedClass);

    animateClick($(this));
    playSound(color);

    var currentIndex = userSequence.length - 1;

    if (userSequence[currentIndex] !== sequence[currentIndex]) {
        $("h1").text("Wrong! Press any key to restart.");
        $("body").css("background-color","red");

        setTimeout(function () {
            $("body").css("background-color", "rgb(12, 12, 78)"); // ⬅️
        }, 400);



        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        resetGame();
    } else {
        if (userSequence.length === sequence.length) {
            setTimeout(nextLevel, 1000); 
        }
    }
});

function animateClick(square) {
    square.addClass("pressed");
    setTimeout(function () {
        square.removeClass("pressed");
    }, 100);
}

function resetGame() {
    level = 0;
    sequence = [];
    userSequence = [];
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
