window.addEventListener("message", function(message){

    console.log(message)

}, false);


console.log("mukodik")

window.parent.postMessage("222", "*");