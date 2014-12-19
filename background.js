chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Find YouTube Videos and Play";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context,"link","page"],
                                         "id": "context" + context});
});

chrome.contextMenus.onClicked.addListener(onClickHandler);


function onClickHandler(info, tab) {
  var sText = info.linkUrl;
  if (sText!=undefined){


  var url = "extract.html?url=" + encodeURIComponent(sText);
  window.open(url, '_blank');
}
else{
chrome.tabs.getSelected(null, function(tab) {
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.chrome.browserAction.onClicked.dispatch(tab);
  });
}
};
//https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&cad=rja&uact=8&ved=0CDUQFjAD&url=http%3A%2F%2Fwebapps.stackexchange.com%2Fquestions%2F22291%2Fturning-off-google-search-results-indirection&ei=3tqTVLjXD4a7mAW7_YHABQ&usg=AFQjCNH00rbvbIpriwokYMearDrkLSSCpw&sig2=FJBM9TKvcOVC2EbuBth_yg&bvm=bv.82001339,d.dGY
