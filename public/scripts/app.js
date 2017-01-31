/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  function createTweetElement(tweet) {

      var $tweet = $("<article>").addClass("tweet");
      var $header = $("<header>").appendTo($tweet);
      var $avatar = $(`<img src="${tweet.user.avatars.small}">`).addClass("face").appendTo($header);
      var $userName = $("<span>").text(tweet.user.name).addClass("name-handle").appendTo($header);
      var $userID = $("<span>").text(tweet.user.handle).addClass("handle").appendTo($header);
      var $section = $("<div>").addClass("tweet-content").appendTo($tweet);
      var $content = $("<p>").text(tweet.content.text).addClass("content").appendTo($section);
      var $footer = $("<footer>").appendTo($tweet);
      var $dateCreated = $("<span>").text(tweet.created_at).addClass("tweet-date").appendTo($footer);
      var $div = $("<div>").addClass("emoji").appendTo($footer);
      var $emoji = $("<i>").addClass("fa fa-flag").appendTo($div);
      var $emojiOne = $("<i>").addClass("fa fa-retweet").appendTo($div);
      var $emojiTwo = $("<i>").addClass("fa fa-heart").appendTo($div);
      return $tweet;
  }

  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
    var $tweetText = $("textarea").val();
    if ($tweetText.length === 0 ) {
      alert("JUST WRITE A MESSAGE ¯\_(ツ)_/¯ ");
      return;
    }
    if ($tweetText.length > 140) {
      alert("JUST SAY IT SMALLER  ¯\_(ツ)_/¯");
      return;
    }
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    }).then(function () {
      tweetCall();
    });
    $("textarea").val(" ");
  });

  var tweetCall = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function loadTweets(tweets) {
      for (var tweetObject of tweets) {
        $('.all-tweets').prepend(createTweetElement(tweetObject));
      }

    });
  }

  tweetCall();

  $("#nav-bar").find("button").on("click", function() {
    $(".new-tweet").slideToggle('slow').find("textarea").focus();
  })

  $("<i>").hover(function() {
      $(this).find(".dark-overlay").toggle();
   });

});





