doIt();
function doIt() {
 var output = $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
        console.log(data);
        document.getElementById("outputCategory").innerHTML = data.category;
        document.getElementById("outputAuthor").innerHTML = data.author;
        document.getElementById("outputQuote").innerHTML = data.quote;
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Key", "yOgiid6OSWmsh01MAHAOQKmtxmdKp1PvpLQjsntt0G0VLouvZ3"); // Enter here your Mashape key

    }
  });
}
