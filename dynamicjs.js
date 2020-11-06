function commentButton()
{
  var comment = $("#comment").val();
  
  $("#comment-area").append("Annonymous Comment: " + comment + "<br>");

  $("#comment").val("");

};

function clearComment()
{
  $("#comment-area").empty();
}

function max()
{
  $("#pet-name").empty();

  $("#pet-name").append("Max");

  $("img").attr("src", "https://media.discordapp.net/attachments/341266683941486594/773801663457787914/IMG-20190821-WA0003.jpeg?width=381&height=677");
}

function tisoy()
{
  $("#pet-name").empty();

  $("#pet-name").append("Tisoy");

  $("img").attr("src", "https://cdn.discordapp.com/attachments/341266683941486594/773801693145071617/received_1295128774170736.jpeg");
}
