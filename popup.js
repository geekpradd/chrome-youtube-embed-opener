chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var code = request.source;


    $(code).find("iframe").each(function(){
      if ($(this).attr("src").indexOf("youtube.com")!=-1){

      $linkSplit=$(this).attr("src").split('/');
      $embedWithParams=$linkSplit[$linkSplit.length-1];
      $embed=$embedWithParams.split('?')[0];

      $url="https://www.youtube.com/watch?v=" + $embed;
      chrome.tabs.create({'url': $url});
    }
    });

    string="<p>No YouTube videos are embedded in this webpage</p>";
    message.innerHTML=string;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {

    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
