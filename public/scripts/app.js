/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


$(document).ready(function () {

  function createTweetElement(tweet) {

  //TODO takes in tweet object
  //returns a tweet article element
  //element contains HTML structure of the tweet

      var $tweet = $("<article>").addClass("tweet");
      var $header = $("<header>").appendTo($tweet);
      var $avatar = $(`<img src="${tweet.user.avatars.small}">`).addClass("face").appendTo($header);
      var $userName = $("<span>").text(tweet.user.name).addClass("name-handle").appendTo($header);
      var $userID = $("<span>").text(tweet.user.handle).addClass("handle").appendTo($header);
      var $section = $("<div>").addClass("tweet-content").appendTo($tweet);
      var $content = $("<p>").text(tweet.content.text).addClass("content").appendTo($section);
      var $footer = $("<footer>").appendTo($tweet);
      var $dateCreated = $("<span>").text(tweet.created_at).addClass("tweet-date").appendTo($footer);
      var $div = $("<div>").appendTo($footer);
      var $emoji = $("<i>").addClass("fa fa-flag").appendTo($div);
      var $emojiOne = $("<i>").addClass("fa fa-retweet").appendTo($div);
      var $emojiTwo = $("<i>").addClass("fa fa-heart").appendTo($div);
      return $tweet;
  }


  $('#tweet-form').on("submit", function (event) {
    event.preventDefault();
  // console.log($(this).serialize());
    var $tweetText = $("textarea").val();
    console.log($tweetText);
    if ($tweetText.length === 0 ) {
      alert("no message");
    }
    if ($tweetText.length > 140) {
      alert("message too long");
    }
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    }).then(function () {
      tweetCall();
    });
  });
  var tweetCall = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      // data: $(this).serialize()
    }).then(function loadTweets(tweets) {
      for (var tweetObject of tweets) {
        $('.all-tweets').prepend(createTweetElement(tweetObject));
      }
      console.log('hello');
    });

  }
  // , function (err) {
  //   alert('no tweets!')

  // });
  tweetCall();

  $("#nav-bar").find("button").on("click", function() {
    $(".new-tweet").slideToggle('slow').find("textarea").focus();
  })

});





