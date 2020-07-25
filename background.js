// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//       console.log("The color is green.");
//     });

//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: {hostEquals: 'developer.chrome.com'},
//         })
//         ],  
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//       }]);
//     });
//   })

const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";

function getword(info,tab) {
  console.log("Word " + info.selectionText + " was clicked.");
  chrome.tabs.create({  
    url: "http://www.google.com/search?q=" + info.selectionText
  });
};

chrome.contextMenus.create({
  title: "Convert: %s",
  contexts: ['selection'],
  id: CONTEXT_MENU_ID
});

chrome.contextMenus.onClicked.addListener(getword);



