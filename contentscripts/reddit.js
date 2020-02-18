var port = chrome.runtime.connect({name: 'test'});
port.onMessage.addListener(function(msg, port) {

   // console.log(msg);

   console.log( window.frameElement.baseURI)
   console.log( window)
    window.history.back();
      /*
    console.log(window.href)
    console.log(window)
    console.log(this.frameElement.origin)
*/


/*
if(msg==="redditback"&&window.frameElement.baseURI==="https://old.reddit.com/"){
    window.history.back();
    console.log(window.frameElement.baseURI)
    console.log("1")
}

if(msg==="redditcimback"&&window.frameElement.baseURI==="https://old.reddit.com/search?"){
    console.log(window.frameElement.baseURI)
    console.log("2")
    window.history.back();
}


*/
});


port.postMessage('from-iframe');


document.querySelector(".side").remove()


/*
window.addEventListener('message', function(event) { 
console.log(event.data)




}); 

*/
