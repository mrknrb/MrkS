document.querySelector("#megnyitas").addEventListener("click",function (e) {


    document.querySelector("#iframe").src= document.querySelector("#urlmezo").value
})
document.querySelector("#uzenet").addEventListener("click",function (e) {



    document.querySelector("#iframe").contentWindow.postMessage("111", "*");
})
/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.kerestipus == "previoustab") {


    }
})

chrome.runtime.sendMessage(
    {
        kerestipus: "ujprogram",
        tipus: filetipus,
        fileid: fileid,
        sessionid: session._id
    }
)
*/
window.addEventListener("message", function(message){

    console.log(message)

}, false);
