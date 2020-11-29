function search()
{
  var input = $("#locationInput").val();
  
  console.log(input);

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=imperial&appid=3c1c7f97dad91531c9dba623495781dc')
    .then(response => response.json())
    .then(data => {
      var icon = data['weather'][0]['icon'];

      changeData($('#location'), data['name']);

      changeData($('#temperature'), data['main']['temp'] + " °F");

      changeData($('#description'), data['weather'][0]['description']);

      $('#icon').attr('src', 'http://openweathermap.org/img/wn/'+icon+'@4x.png');
    })
};

function changeData(tag, newData) {
  
  tag.empty();

  tag.append(newData);
}
