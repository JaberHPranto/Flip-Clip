$(document).ready(function () {
  console.log("hello");
  $("#flashcard").click(function () {
    $(this).toggleClass("flipped");
    console.log("clicked");
  });
});
