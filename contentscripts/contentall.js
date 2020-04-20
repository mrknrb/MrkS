/*
chrome.runtime.sendMessage({greeting: "mrkteszt"}, function(response) {
    console.log(response.farewell);
  });
*/
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

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
                }, function (response) {
                })
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
                }, function (response) {
                })
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
                }, function (response) {
                })

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


    if (egerjobbnyomva == true && egerjobbnyomvadate > Date.now() - 2000) {
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
            }, function (response) {
            })
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
                $('#previoustabstabla tr:last').after(`<tr hanyadik=${i + 1} id="${menttab[0]}"><td> <img src="https://www.google.com/s2/favicons?domain=${menttab[2]}" name="${menttab[2]}" width="24" height="24" class="favicon"> </td><td>   <b>${menttab[1]}</b></td></tr>`)
            })
            document.querySelectorAll('#previoustabstabla tr')[hanyadik].style.backgroundColor = "white"


        }


    });

function start3() {
    if (document.querySelector(".modal-dialog-bg")) {
        if (document.querySelector(".modal-dialog-bg").style.display != "none") {

            document.querySelector(".modal-dialog-bg").style.display = "none"

            document.querySelector(".modal-dialog.docs-dialog").style.display = "none"
        }
    }
    setTimeout(start3, 5000);
}

if (window.location.host == "docs.google.com") {

    start3()
}

let youtube = false
if (window.location.host == "www.youtube.com" || window.location.host == "m.youtube.com") {
    youtube = true
}


//-------------------------------------------------Youtube subscriptions
if (youtube) {
    document.querySelector("#logo").innerHTML = '<a href="https://www.youtube.com/feed/subscriptions" style="font-size: 20px;color:black;font-weight:bold;text-decoration: none">YouTube</a>'

}

function oldalurlkuldes() {

    setTimeout(() => {
        let message3 = {}
        message3.url = window.location.href
        message3.cim = document.title
        message3.uzenettipus = "oldalurl"
        window.parent.postMessage(message3, "*");

    }, 400)
}

oldalurlkuldes()
if (window.location.host == "www.youtube.com") {
    window.addEventListener('yt-navigate-finish', function () {
        oldalurlkuldes()
    });

}
/*
let youtubeartistadatok = {}
youtubeartistadatok.artist = {}
youtubeartistadatok.albums = []
youtubeartistadatok.music = []


youtubeartistadatok.artist.id = window.location.href
youtubeartistadatok.artist.csatornanev = document.querySelector("#channel-header-container #channel-name yt-formatted-string.style-scope.ytd-channel-name").innerText
youtubeartistadatok.artist.profilkep = document.querySelector("#channel-header-container #avatar img").src
youtubeartistadatok.artist.subscribercount = document.querySelector("#subscriber-count").innerText

youtubeartistadatok.albums[aktualisplaylistszam] = {}
youtubeartistadatok.albums[aktualisplaylistszam].id = window.location.href
youtubeartistadatok.albums[aktualisplaylistszam].cim = document.querySelector("#title a").innerText
youtubeartistadatok.albums[aktualisplaylistszam].stats = document.querySelector("#stats").innerText
youtubeartistadatok.albums[aktualisplaylistszam].boritokep =
    document.querySelector("ytd-playlist-sidebar-renderer #playlist-thumbnails .style-scope.yt-img-shadow").src
youtubeartistadatok.albums[aktualisplaylistszam].eloadoid = youtubeartistadatok.artist.id

let music = {}
music.id = e.querySelector("#content a").href
music.hanyadik = i + 1
if(e.querySelector("#overlays span")){
    music.hossz = e.querySelector("#overlays span").innerText
}
music.cim = e.querySelector("span#video-title").innerText

music.reszletek= e.querySelector("span#video-title").getAttribute("aria-label")
music.eloadoid = youtubeartistadatok.artist.id
music.albumid = youtubeartistadatok.albums[aktualisplaylistszam].id
youtubeartistadatok.music.push(music)

let elozoplaylistszam = 0
let aktualisplaylistszam = 0
//-----------------musicplayerscraper
let href = window.location.href
if (youtube && inIframe && href.slice(href.length - 6) == "musicc") {
    console.log("siker")
    setTimeout(() => {
        console.log("siker2")
        //$("#header .yt-simple-endpoint.style-scope.ytd-watch-card-rich-header-renderer").click()
        $("#watch-card-subtitle").click()

        setTimeout(() => {

            youtubeartistadatok.artist.id = window.location.href
            youtubeartistadatok.artist.csatornanev = document.querySelector("#channel-header-container #channel-name yt-formatted-string.style-scope.ytd-channel-name").innerText
            youtubeartistadatok.artist.profilkep = document.querySelector("#channel-header-container #avatar img").src
            youtubeartistadatok.artist.subscribercount = document.querySelector("#subscriber-count").innerText
            let k = document.querySelector("[title='Albums & Singles']").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            let morebutton
            if(k.querySelector("#right-arrow #button")){
                morebutton=k.querySelector("#right-arrow #button")
            }else{
                morebutton=k.querySelector("[aria-role='button']")
            }
                function start2() {

                    if (k.querySelectorAll("ytd-grid-playlist-renderer").length != elozoplaylistszam) {
                        elozoplaylistszam = k.querySelectorAll("#view-more a").length
                        morebutton.click()

                        console.log("siker3")
                        setTimeout(start2, 500);
                    } else {
                        console.log("siker4")
                        console.log(aktualisplaylistszam)
                        console.log(elozoplaylistszam)

                        function lejatszasilistamegnyito() {
                            if (aktualisplaylistszam != elozoplaylistszam) {
                                k.querySelectorAll("#view-more a")[aktualisplaylistszam].click()

                                setTimeout(() => {
                                    youtubeartistadatok.albums[aktualisplaylistszam] = {}
                                    youtubeartistadatok.albums[aktualisplaylistszam].id = window.location.href
                                    youtubeartistadatok.albums[aktualisplaylistszam].cim = document.querySelector("#title a").innerText
                                    youtubeartistadatok.albums[aktualisplaylistszam].stats = document.querySelector("#stats").innerText
                                    youtubeartistadatok.albums[aktualisplaylistszam].boritokep =
                                        document.querySelector("ytd-playlist-sidebar-renderer #playlist-thumbnails .style-scope.yt-img-shadow").src
                                    youtubeartistadatok.albums[aktualisplaylistszam].eloadoid = youtubeartistadatok.artist.id
                                    document.querySelectorAll("ytd-playlist-video-renderer.style-scope.ytd-playlist-video-list-renderer").forEach(function (e, i) {
                                        // console.log(e.querySelector("#index").innerText)
                                        let music = {}
                                        music.id = e.querySelector("#content a").href
                                        music.hanyadik = i + 1
                                        if(e.querySelector("#overlays span")){
                                            music.hossz = e.querySelector("#overlays span").innerText
                                        }
                                        music.cim = e.querySelector("span#video-title").innerText

                                        music.reszletek= e.querySelector("span#video-title").getAttribute("aria-label")
                                        music.eloadoid = youtubeartistadatok.artist.id
                                        music.albumid = youtubeartistadatok.albums[aktualisplaylistszam].id

                                        youtubeartistadatok.music.push(music)

                                    })

                                    aktualisplaylistszam++

                                    lejatszasilistamegnyito()
                                }, 2000)

                            } else {
                                console.log(youtubeartistadatok)

                            }
                        }

                        lejatszasilistamegnyito()
                    }


                }

// boot up the first call
                start2();



        }, 4000)

    }, 2000)

}
*/


if (window.location.host == "music.youtube.com") {
    let albumok
    let albumokszama
    let aktualisalbumszam = 0

    let i = document.createElement("iframe")
    i.style.height = "500px"
    i.style.width = "800px"
    i.src = ""
    function albummegnyito() {
        let albumok2 = document.querySelectorAll("ytmusic-section-list-renderer a.yt-simple-endpoint.style-scope.ytmusic-responsive-list-item-renderer")

        albumok2[aktualisalbumszam].click()
        setTimeout(() => {
            let youtubeurl = window.location.href.replace("music.youtube", "youtube");

            i.src = youtubeurl


        }, 1000)
        //window.history.back()


    }
    let youtubeartistadatok = {}
    youtubeartistadatok.artist = {}
    youtubeartistadatok.albums = []
    youtubeartistadatok.music = []


    let r = document.createElement("button")
    r.style.fontSize = "16"
    r.innerText = "Mentés"

    document.querySelector("#left-content").appendChild(r)
    r.addEventListener("click", function () {
        document.querySelector("[title=Artist]").parentElement.parentElement.parentElement.querySelector("a").click()
        setTimeout(() => {

            document.querySelector("#left-content").appendChild(i)
            document.querySelectorAll(".header a").forEach(function (e) {
                if (e.innerText == "Albums") {
                    e.click()
                }
            })


            setTimeout(() => {
                albumok = document.querySelectorAll("ytmusic-section-list-renderer a.yt-simple-endpoint.style-scope.ytmusic-responsive-list-item-renderer")
                albumokszama = albumok.length

                albummegnyito()

            }, 1000)
        }, 1000)
    })


    window.addEventListener("message", function (message) {
        if (message.data.uzenettipus == "youtubeartistadatok"&&message.data.youtubeartistadatok.album.cim) {

            console.log("contentjsuzenet", message)
            youtubeartistadatok.albums.push(message.data.youtubeartistadatok.album)

            youtubeartistadatok.music.push(message.data.youtubeartistadatok.music)
            console.log("youtubeartistadatok", youtubeartistadatok)

            aktualisalbumszam++
            if (aktualisalbumszam <= albumokszama) {

                console.log("aktualisalbumszam", aktualisalbumszam)
                console.log("albumokszama", albumokszama)



                setTimeout(() => {
                    window.history.back()
                    setTimeout(() => {    albummegnyito()
                    }, 1000)

                }, 1000)

            } else {

            }
        }

    },{passive: true})

}
if (window.location.host == "www.youtube.com" && window.location.pathname == "/playlist" && inIframe()) {
    console.log("true")

    let youtubeartistadatok = {}
    youtubeartistadatok.music = []

    youtubeartistadatok.album = {}
    youtubeartistadatok.album.id = window.location.href
    youtubeartistadatok.album.cim = document.querySelector("#title a").innerText
    youtubeartistadatok.album.stats = document.querySelector("#stats").innerText
    youtubeartistadatok.album.boritokep =
        document.querySelector("ytd-playlist-sidebar-renderer #playlist-thumbnails .style-scope.yt-img-shadow").src
    //youtubeartistadatok.album.eloadoid = youtubeartistadatok.artist.id
    document.querySelectorAll("ytd-playlist-video-renderer.style-scope.ytd-playlist-video-list-renderer").forEach(function (e, i) {
        // console.log(e.querySelector("#index").innerText)
        let music = {}
        music.id = e.querySelector("#content a").href
        music.hanyadik = i + 1
        if (e.querySelector("#overlays span")) {
            music.hossz = e.querySelector("#overlays span").innerText
        }
        music.cim = e.querySelector("span#video-title").innerText

        music.reszletek = e.querySelector("span#video-title").getAttribute("aria-label")
        //music.eloadoid = youtubeartistadatok.artist.id
        music.albumid = window.location.href

        youtubeartistadatok.music.push(music)

    })

if(youtubeartistadatok.album.cim){
    let message = {}
    message.youtubeartistadatok = youtubeartistadatok
    message.uzenettipus = "youtubeartistadatok"
    window.parent.postMessage(message, "*");
    /*
    chrome.runtime.sendMessage(message, function(response) {
       // console.log(response.farewell);

    });*/
}

}