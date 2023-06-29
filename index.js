$(document).ready(function () {
  var oneclicked = false;
  var score = 0;
  var gamestopper = 0;

  $(".rules").click(function () {
    $("a.reload").text("Play");
    $(".mainDiv").empty();
    var ruleDiv = $("<div class='rules'></div>");
    var title = $("<h2>Rules and score system</h2>");
    var rules = $(
      "<p>The rules are simple, try to find matching cards, each time you get a matching set you get 10 points. Mistakes will deduct 5 points from your score so try to be efficient!<br>Good luck!</p>"
    );
    ruleDiv.append(title);
    ruleDiv.append(rules);
    $(".mainDiv").append(ruleDiv);
  });

  $(".about").click(function () {
    $("a.reload").text("Play");
    $(".mainDiv").empty();
    var ruleDiv = $("<div class='about'></div>");
    var title = $("<h2>About</h2>");
    var about = $(
      "<p>This game is made by Malek Hadrich.<br>The struggles were real with this one!<br>I'm planning to keep this updated and improve on it<br>Made using:</p>"
    );
    var logos = $("<div class='logos'></div>");
    var html = $(
      '<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-html-5-1024.png"></img>'
    );
    var css = $(
      '<img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-1024.png"></img>'
    );
    var jquery = $(
      '<img src="https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/JQuery_logo-1024.png"></img>'
    );
    logos.append(jquery);
    logos.append(html);
    logos.append(css);
    ruleDiv.append(title);
    ruleDiv.append(about);
    ruleDiv.append(logos);
    $(".mainDiv").append(ruleDiv);
  });

  var data = [
    {
      name: "shroom",
      imgSrc: "./img/shroom.png",
    },
    {
      name: "goomba",
      imgSrc: "./img/goomba.png",
    },
    {
      name: "flower",
      imgSrc: "./img/flower.png",
    },
    {
      name: "yoshi",
      imgSrc: "./img/yoshi.png",
    },
    {
      name: "star",
      imgSrc: "./img/star.png",
    },
    {
      name: "coin",
      imgSrc: "./img/coin.png",
    },
    {
      name: "shroom 2",
      imgSrc: "./img/shroom.png",
    },
    {
      name: "goomba 2",
      imgSrc: "./img/goomba.png",
    },
    {
      name: "flower 2",
      imgSrc: "./img/flower.png",
    },
    {
      name: "yoshi 2",
      imgSrc: "./img/yoshi.png",
    },
    {
      name: "star 2",
      imgSrc: "./img/star.png",
    },
    {
      name: "coin 2",
      imgSrc: "./img/coin.png",
    },
  ];

  function shuffle(array) {
    //shuffle cards
    var i = array.length;
    var temporaryValue;
    var randIndex;
    while (i !== 0) {
      randIndex = Math.floor(Math.random() * i);
      i--;
      temporaryValue = array[i];
      array[i] = array[randIndex];
      array[randIndex] = temporaryValue;
    }
    return array;
  }
  var shuffledData = shuffle(data);

  var each = function (coll, func) {
    if (Array.isArray(coll)) {
      for (var i = 0; i < coll.length; i++) {
        func(coll[i], i);
      }
    } else {
      for (var key in coll) {
        func(coll[key], key);
      }
    }
  };

  each(shuffledData, function (e, i) {
    // making the hidden elements
    var hidden = $("<div></div>");
    var image = $("<img>");
    image.attr("src", e.imgSrc);
    hidden.append(image);
    $(".hidee").append(hidden);
    // making the masks
    var mask = $("<div class='mask'></div>");
    var maskImg = $("<img src='./img/Mystery box.png'>");
    mask.addClass(e.name);
    mask.append(maskImg);
    $(".hider").append(mask);
  });

  var x = ""; //this is holding the first click item
  var y = ""; //this is holding the second click item
  var maskedClass1 = ""; //this is holding the name of the image inside
  // var gamestatus= $(".hider").children().hasClass("opacity")      //this a check if everything is clicked or not

  $(".mask").click(function () {
    var currentMask = $(this);
    if (oneclicked === false) {
      oneclicked = true;
      maskedClass1 = currentMask.attr("class").split(" ")[1];
      currentMask.addClass("opacity");
      x = currentMask;
    } else {
      oneclicked = false;
      var maskedClass2 = currentMask.attr("class").split(" ")[1];
      currentMask.addClass("opacity");
      y = currentMask;
      if (maskedClass1 == maskedClass2) {
        gamestopper += 2;
        score += 10;
        var highscore = sessionStorage.getItem("highscore");
        if (gamestopper === 12) {
          if (!highscore) {
            sessionStorage.setItem("highscore", score);
            $("a.reload").text("Play Again");
            $(".mainDiv").empty();
            var scoreDiv = $("<div class='score'></div>");
            var headline = $("<h1>Nicely done</h1>");
            var copy = $("<h3>You set a score of " + score + "</h3>");
            var tryAgain = $("<p>But the princess is in another castle.</p>");
            tryAgain.attr("class", "reload");
            $(".mainDiv").append(scoreDiv);
            scoreDiv.append(headline);
            scoreDiv.append(copy);
            scoreDiv.append(tryAgain);
          } else if (highscore < score) {
            sessionStorage.setItem("highscore", score);
            $("a.reload").text("Play Again");
            $(".mainDiv").empty();
            var scoreDiv = $("<div class='score'></div>");
            var headline = $("<h1>Congratulations!</h1>");
            var copy = $("<h3>You set a new highscore of " + score + "</h3>");
            var tryAgain = $("<p>But the princess is in another castle.</p>");
            tryAgain.attr("class", "reload");
            $(".mainDiv").append(scoreDiv);
            scoreDiv.append(headline);
            scoreDiv.append(copy);
            scoreDiv.append(tryAgain);
          } else if (highscore > score) {
            $("a.reload").text("Play Again");
            $(".mainDiv").empty();
            var scoreDiv = $("<div class='score'></div>");
            var headline = $("<h1>You can do better</h1>");
            var copy = $("<h3>Your current score is " +score + " and the highest score is " +highscore + "</h3>");
            var tryAgain = $("<p>But the princess is in another castle.</p>");
            tryAgain.attr("class", "reload");
            $(".mainDiv").append(scoreDiv);
            scoreDiv.append(headline);
            scoreDiv.append(copy);
            scoreDiv.append(tryAgain);
          }
        }
      } else {
        setTimeout(function () {
          //timeout so that the player gets to see the content of the second card
          $(x).removeClass("opacity");
          // console.log(x);
          $(y).removeClass("opacity");
          // console.log(y);
          // console.log("the else");
        }, 700);
        if (score > 0) {
          score -= 5;
        }
      }
    }
    // console.log(gamestopper,"stopping condition");
  });

  // function gamestatus() {
  //     for(var i=0;i<12;i++){

  //         if($(".mask").eq(i).hasClass("opacity")){
  //             gamestopper++
  //         }
  //     }
  //     console.log(gamestopper,"stopping condition");
  // }

  $("body").on("click", ".reload", function () {
    //reload all script
    location.reload(true);
  });

  $("img").on("dragstart", function (event) {
    event.preventDefault();
  });
});
