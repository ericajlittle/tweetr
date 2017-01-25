$(document).ready(function () {
  $('main.container textarea').on('input', function (event) {

    var max = 140;
    var count = $("main.container").find("textarea").val().length
    var left = max - $("main.container").find("textarea").val().length
    var number = $(this).parent().find(".counter").text(left)
    console.log(number);
    // var length = $(this).val().length
    if (left < 0) {
        number.css({"color":"red"});
    } else {
      number.css({"color":"black"});
    }


  });
});

