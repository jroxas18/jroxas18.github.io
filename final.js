var location = $('#location');
var temperature = $('#temperature');
var description = $('#description');

function commentButton()
{
  var input = $("#locationInput").val();
  
  console.log(input);

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input+'&appid=3c1c7f97dad91531c9dba623495781dc')
    .then(response => response.json())
    .then(data => console.log(data));
};

function changeData(tag, newData) {
  
  tag.empty();

  tag.append("newData");
}
