/*
chrome.runtime.sendMessage({greeting: "mrkteszt"}, function(response) {
    console.log(response.farewell);
  });
*/
function addcss(css) {
  var head = document.getElementsByTagName('head')[0];
  var s = document.createElement('style');
  s.setAttribute('type', 'text/css');
  if (s.styleSheet) { // IE
    s.styleSheet.cssText = css;
  } else { // the world
    s.appendChild(document.createTextNode(css));
  }
  head.appendChild(s);
}
addcss("a:visited {  color: pink;  background-color: transparent;  text-decoration: none}")
/*
 chrome.tabs.getCurrent(function (Tab, tab){
console.log(Tab)
console.log(tab)
 })
 */
function callClickEvent(element) {
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);
  element.dispatchEvent(evt);
}
if (window.location.host == "open.spotify.com") {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      if (request == "pause") {
        //$(".control-button--circled").click()
        callClickEvent(document.querySelector('.control-button--circled'))
      } else if (request == "next") {
        callClickEvent(document.querySelector('.spoticon-skip-forward-16'))

      }



    });
  setTimeout(() => {
    document.querySelector('.Root__ads-container').setAttribute("style", "height:0px")
    document.querySelector('.AdsContainer__inner').setAttribute("style", "margin-top: 100px")
  }, 10000);
  let a = 0
  $("body").on('DOMSubtreeModified', ".playback-bar__progress-time:nth-child(3)", function () {
    console.log("body:", "mukodik");
    // body
    if (document.querySelector('.playback-bar__progress-time:nth-child(3)').innerText == "0:30" || document.querySelector('.playback-bar__progress-time:nth-child(3)').innerText == "0:29") {
      console.log("body:", "0:30");
      if (a == 0) {
        chrome.runtime.sendMessage({
          kerestipus: "spotifymute"
        }, function (response) {})
      }
      a = 1
      console.log("body:", "0:30");
      /* $('.volume-bar__icon').click()
  }else if($('.spoticon-volume-off-16')!=null){
    $('.volume-bar__icon').click()*/
    } else {
      if (a == 1) {
        chrome.runtime.sendMessage({
          kerestipus: "spotifyunmute"
        }, function (response) {})
      }
      a = 0
    }
  });
}


let gorgetesvolt = false
let bodystyle = document.querySelector('body').style.overflow
let hanyadik = 2
let egerjobbnyomva = false
let egerjobbnyomvadate = Date.now()
$('body').mousedown(function (event) {
  switch (event.which) {
    case 3:
      gorgetesvolt = false
      console.log('Right Mouse button pressed.');
      egerjobbnyomva = true
      egerjobbnyomvadate = Date.now()
      break;
    default:
  }
})
$('body').mouseup(function (event) {
  switch (event.which) {
    case 3:
      console.log('Right Mouse button pressed.');
      if (bodystyle == undefined) {
        document.querySelector('body').style.overflow = "auto"
      } else {
        document.querySelector('body').style.overflow = bodystyle
      }
      // document.querySelector('body').style.height = "100%"

      document.querySelector("#previoustabsdiv").style.display = "none"
      egerjobbnyomva = false
      if (gorgetesvolt == true) {
        let tabid = document.querySelectorAll('#previoustabstabla tr')[hanyadik].id
        chrome.runtime.sendMessage({
          kerestipus: "previoustabshighlight",
          adat: tabid
        }, function (response) {})

      }

      gorgetesvolt = false
      break;
    default:
  }
})




var previoustabsdiv = document.createElement('div')
previoustabsdiv.style.cssText = 'position:fixed;width:500px;height:300px;top:25%;left:25%;background:#dadada'
previoustabsdiv.style.display = "none"
previoustabsdiv.setAttribute("id", "previoustabsdiv")


var previoustabstabla = document.createElement('table')

//previoustabstabla.style.width = '100%';
previoustabstabla.setAttribute('border', '1');
previoustabstabla.setAttribute('id', 'previoustabstabla');
previoustabstabla.insertRow()
previoustabsdiv.appendChild(previoustabstabla)
document.body.appendChild(previoustabsdiv)


//látható
//document.querySelector("#previoustabstabla").style.display = "block"
//nem látható
//document.querySelector("#previoustabstabla").style.display = "none"

window.addEventListener('wheel', function (e) {


  if (egerjobbnyomva == true&&egerjobbnyomvadate > Date.now()-2000) {
    gorgetesvolt = true
    if (document.querySelector("#previoustabsdiv").style.display == "none") {
      hanyadik = 2
      document.querySelector("#previoustabsdiv").style.display = "block"
      document.querySelector('body').style.overflow = "hidden"
      // document.querySelector('body').style.height = "100%"
      $("#previoustabstabla tr").remove()
      document.querySelector('#previoustabstabla').insertRow()

      // console.log("e:", e);
      chrome.runtime.sendMessage({
        kerestipus: "previoustabstabla"
      }, function (response) {})
    } else {
      if (e.deltaY < 0) {
        console.log('scrolling up');
        document.querySelectorAll('#previoustabstabla tr').forEach(function (e, i) {

          e.style.backgroundColor = "#dadada"
        })
        hanyadik--
        document.querySelectorAll('#previoustabstabla tr')[hanyadik].style.backgroundColor = "white"
      }
      if (e.deltaY > 0) {
        console.log('scrolling down');
        hanyadik++
        console.log("hanyadik:", hanyadik);
        document.querySelectorAll('#previoustabstabla tr').forEach(function (e, i) {

          e.style.backgroundColor = "#dadada"
        })
        document.querySelectorAll('#previoustabstabla tr')[hanyadik].style.backgroundColor = "white"

      }
    }
  }

});


//$('#previoustabstabla tr:last').after('<tr>...</tr><tr>...</tr>')


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    console.log("request:", request);
    if (request.kerestipus == "tabshistoryrows") {


      console.log("request:", request);
      request.tabla.forEach(function (menttab, i) {
        $('#previoustabstabla tr:last').after(`<tr hanyadik=${i+1} id="${menttab[0]}"><td> <img src="https://www.google.com/s2/favicons?domain=${menttab[2]}" name="${menttab[2]}" width="24" height="24" class="favicon"> </td><td>   <b>${menttab[1]}</b></td></tr>`)
      })
      document.querySelectorAll('#previoustabstabla tr')[hanyadik].style.backgroundColor = "white"



    }


  });