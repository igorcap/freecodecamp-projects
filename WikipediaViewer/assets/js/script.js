$(document).ready(function() {
  var search;
  console.log("Oi");

  $('#search').keydown(function(event){
    if(event.keyCode == 13 || event.keyCode == 10){
      search = $('#search').val();
      console.log(search);
      if(search.length>0){
        searchWiki(search);
      }
    }
  });

  function searchWiki(search) {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: 'opensearch',
        search: search,
        data: 'json',
        origin: '*',
        limit: 20,
        formatversion: 2
      },
      /*fetchData takes in a searchTerm as parameter and makes an ajax call to the wikipedia opensearch api*/
      success: function(response) {
        console.log(response);
        var title = response[1],
            desc = response[2],
            link = response[3],
            result = "";
        if(title.length===0){
          return $('#results').html('<h2>Your search '+search+" did not return any results");
        } else {
          for (let i = 0; i < title.length; i++) {
            result+='<div class="col s12 m6"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <div class="card-title"> <span class="card-title">'+ title[i] +'</span> <p>'+ desc[i] +'</p> </div> <div class="card-action"> <a href="'+ link[i] +'">Click to Learn More</a></div></div></div></div>'
          }
        }
        $('#results').html(result);
      }
    });
  }
});
