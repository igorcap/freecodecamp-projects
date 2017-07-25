favorites();
streamsByGame("League of Legends")
streamsByGame("Hearthstone")
streamsByGame("Counter-Strike: Global Offensive")

function favorites() {
  var result = "";
  var streams = ["manalol", "freecodecamp", "imaqtpie", "rakin", "picoca"];
  for (let i = 0; i < streams.length; i++) {
    $.ajax({
      url: 'https://api.twitch.tv/kraken/streams/' + streams[i],
      headers: {
        "Client-ID": "fobdilcs5alzhn5k0x9jn377pu7yxuh"
      },
      success: function(data){
        if(data.stream){
          //result += '<div class="col s12 m6"><div class="card"><div class="card-image"><img src="'+ data.stream.preview.medium'"><span class="card-title">'+ data.stream.channel.display_name +'</span></div><div class="card-content"><p>'+ data.stream.channel.status +'</p><p>'+ data.stream.channel.game +'</p></div><div class="card-action"><a href="'+ data.stream.channel.url +'">Link</a></div></div></div>';
          result += `
          <div class="col s12 m4">
            <div class="card medium">
              <div class="card-image">
                <img src="`+ data.stream.preview.large +`" alt="`+data.stream.channel.status+`">
              </div>
              <div class="card-content">
                <p>`+ data.stream.channel.status +`</p>
                <p>`+ data.stream.viewers +` viewers on `+ data.stream.channel.name +`</p>
              </div>
              <div class="card-action">
                <a href="`+ data.stream.channel.url +`">Click to Watch</a>
              </div>
            </div>
          </div>

          `
          $('#favorites').html(result);
        }
      }
    });
  }
  if(result == ""){
    $('#favorites').html('<h4> Sorry, but all your favorite streamers are offline! </h4>');
  }

}

function streamsByGame(game) {
  var result = "";
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/?game='+game,
    headers: {
      "Client-ID": "fobdilcs5alzhn5k0x9jn377pu7yxuh"
    },
    success: function(data){
      console.log(data);
      for (let i = 0; i < data.streams.length; i++) {
        if(data.streams[i]){
          result += `
          <div class="col s12 m4">
            <div class="card medium">
              <div class="card-image">
                <img src="`+ data.streams[i].preview.large +`" alt="`+data.streams[i].channel.status+`">
              </div>
              <div class="card-content">
                <p>`+ data.streams[i].channel.status +`</p>
                <p>`+ data.streams[i].viewers +` viewers on `+ data.streams[i].channel.name +`</p>
              </div>
              <div class="card-action">
                <a href="`+ data.streams[i].channel.url +`">Click to Watch</a>
              </div>
            </div>
          </div>

          `
        }
        if(game == "League of Legends"){
          $('#league').html(result);
        } else if (game == "Hearthstone"){
          $('#hearthstone').html(result);
        } else if (game == "Counter-Strike: Global Offensive"){
          $('#csgo').html(result);
        }
      }
    }
  });
  return "<h3>Not working</h3>";
}
