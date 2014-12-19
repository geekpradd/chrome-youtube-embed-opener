function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}
function doRest(code){
  var videos=0;

  $(code).find("iframe").each(function(){
      if ($(this).attr("src").indexOf("youtube.com")!=-1){

      $linkSplit=$(this).attr("src").split('/');
      $embedWithParams=$linkSplit[$linkSplit.length-1];
      $embed=$embedWithParams.split('?')[0];

      $url="https://www.youtube.com/watch?v=" + $embed;
      chrome.tabs.create({'url': $url});
      videos=videos+1;
    }
    });
  if (videos>=1){
  $('.dr').html("Success! Found " + videos + " YouTube videos and opened them in New Tabs");

}
  else{
    $('.dr').html("No Videos found in Source");
  }
}
function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}
$url=decodeURIComponent(GetUrlValue('url'));
$status=ValidUrl($url);
var code;
if($status){
  $('.dr').html("URL is valid. Downloading Source of URL");
  var get= $.get( $url, function( data ) {
  code =data;
  $('.dr').html("Source loaded. Finding Links");
  doRest(code);
})
  .fail(function(){
    $('.dr').html("Unable to get Source. Check your Network connection");
  });

}
else{
  $('.dr').html("Looks like the parameter passed is not a correct URL. Note that chrome:// URLs are not valid.");
}
