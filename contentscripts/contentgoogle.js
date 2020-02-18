//ha nem működik nézd meg, hogy engedélyezve van-e a kiegészítők beállításainál a hozzáférés engedélyeztése keresési eredményekhez beállítás.
let googleurls = []
let TalalatokElements = document.querySelectorAll('.rc,.VNLkW,.related-question-pair')

function duplikaltkiszedo(index) {
  if (index == 0) {
    return false
  } else {
    if (TalalatokElements.item(index).querySelector("a") == TalalatokElements.item(index - 1).querySelector("a")) {
      return true
    } else {
      return false
    }
  }
}
//:not(.related-question-pair)
let TalalatArray = []
for (let index = 0; index < TalalatokElements.length; index++) {
  if (TalalatokElements.item(index).querySelector("a") === null || duplikaltkiszedo(index)) {} else {
    console.log(TalalatokElements.item(index).querySelector("a"))
    let link = ""
    let host = document.createElement("a")
    let cim = ""
    let leiras = ""
    let megjegyzesmezo = ""
    let megjegyzes = document.createElement("textarea")
    for (let index = 0; index < TalalatokElements.length; index++) {
      if (TalalatokElements.item(index).querySelector("a") === null) {} else {
        let link = TalalatokElements.item(index).querySelector("a").href
        googleurls.push(link)
      }
    }
    link = TalalatokElements.item(index).querySelector("a").href
    host.textContent = TalalatokElements.item(index).querySelector("a").host
    host.setAttribute("style", 'style="max-width: 25px;  min-width: 10px;  word-wrap: break-word;"')
    let hostmezo = host.outerHTML
    if (TalalatokElements.item(index).querySelector("h3") === null) {
      cim = TalalatokElements.item(index).querySelector("a").innerText
    } else if (TalalatokElements.item(index).querySelector("h3").innerText === "") {
      cim = TalalatokElements.item(index).querySelector("h3").innerHTML
      if (TalalatokElements.item(index).querySelector(".e24Kjd") === null) {
        leiras = ""
      } else {
        leiras = TalalatokElements.item(index).querySelector(".e24Kjd").innerHTML
      }
    } else {
      cim = TalalatokElements.item(index).querySelector("h3").innerText
      if (TalalatokElements.item(index).querySelector(".st") === null) {
        leiras = ""
      } else {
        leiras = TalalatokElements.item(index).querySelector(".st").innerHTML
      }
    }
    megjegyzes.setAttribute("id", link)
    megjegyzesmezo = megjegyzes.outerHTML
    let cimlinkkel = `<a target="_blank" class="cimlinkkel" href=${link}>${cim}</a>`
    let icon = `<img src="https://www.google.com/s2/favicons?domain=${link}" name="${link}" width="24" height="24" class="favicon">`
    //let preview = `<img src="https://eu1.searchpreview.de/preview?s=${link}" height="60" class="favicon">` //111 széles és 82 magas eredetileg
    let rang = document.createElement("select")
    rang.setAttribute("id", link)
    rang.setAttribute("style", "color:blue;text-align:center;font-weight: bold;font-size: 30px")
    rang.innerHTML = '<option value="1">1</option>  <option value="2">2</option>  <option value="3">3</option>  <option value="4">4</option>  <option value="5">5</option>  <option selected="selected" value=""></option></select>'
    let rangmezo = rang.outerHTML
    TalalatArray.push([icon, cimlinkkel, leiras, megjegyzesmezo, rangmezo])
  }
}



document.getElementById("searchform").setAttribute("style", "width:900px; min-width:900px")
document.getElementById("gstyle").innerHTML = document.getElementById("gstyle").innerHTML.replace("#foot{width:632px}", "#foot{width:60vw}")
document.querySelector('#rhscol').innerHTML = ''
document.querySelector('#rso').innerHTML = ''
document.querySelector('#center_col').style.margin = "0px";
//document.body.querySelector("#rso").appendChild(document.createElement('table')).setAttribute("id", "example")
document.body.querySelector("#rso").insertAdjacentElement('afterbegin', document.createElement('table')).setAttribute("id", "example")
document.querySelector("#main").setAttribute("style", "height: 100%;width: 50vw;position: fixed;z-index: 1;top: 0;overflow-x: auto;padding-top: 0px;left: 0")
let oldalsav = document.createElement("div")
oldalsav.display = "block"
oldalsav.position = "absolute"
oldalsav.pane = "center"
oldalsav.id = "oldalsav"
oldalsav.style = 'height: 100%;width: 50vw;position: fixed;z-index: 1;top: 0;overflow-x: hidden;padding-top: 0px;right: 0;background-color: white'
document.querySelector("body").appendChild(oldalsav);
let oldalsavframe = document.createElement("iframe")
oldalsavframe.pane = "west"
oldalsavframe.id = "oldalframe"
oldalsavframe.width = "100%"
oldalsavframe.height = "99%"
oldalsavframe.border = "0"
oldalsavframe.src = "about:blank"
oldalsavframe.pane = "center"
oldalsavframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation"
oldalsavframe.style = "visibility: visible; display: block; position: absolute; margin: 0px; z-index: 2"
document.querySelector("#oldalsav").appendChild(oldalsavframe);
document.querySelector("table").setAttribute("class", "display compact")
document.querySelector("table").setAttribute("style", "width:100%")
$(document).ready(function () {
  let elementregi = ""
  let elementcolorregi = "rgb(179, 179, 179)"
  $('#example').DataTable({
    data: TalalatArray,
    "paging": false,
    "ordering": false,
    "info": false,
    columns: [{
        title: "I"
      },
      {
        title: "Cím"
      },
      {
        title: "Leírás"
      },
      {
        title: "Megjegyzes"
      },
      {
        title: "R"
      }
    ],
    "columnDefs": [{
        "width": "1%",
        "targets": [0]
      },
      {
        "width": "30%",
        "targets": 1
      }
    ],
    "pageLength": 50,
    initComplete: function () {
      chrome.runtime.sendMessage({
        kerestipus: "serveradatai0",
        googleurls: googleurls
      }, function (response) {
        console.log(response)
        setTimeout(() => {
          chrome.runtime.sendMessage({
            kerestipus: "serveradatai"
          }, function (response) {
            console.log(response)
            let osszesadat = response.valasz
            // console.log(osszesadat)
            document.querySelector("tbody").querySelectorAll("tr").forEach(function (e) {
              //console.log(osszesadat)
              let xyz = osszesadat.find(function (tm) {
                // console.log(tm.id)
                return tm._id === e.querySelector("textarea").id
              })
              if (xyz) {
                e.querySelector("textarea").value = xyz.megjegyzes
              } else {
                e.querySelector("textarea").value = ""
              }
              let zzz = osszesadat.find(function (tm) {
                // console.log(tm.id)
                return tm._id === e.querySelector("select").id
              })
              //console.log(xyz)
              if (zzz) {
                e.querySelector("select").value = zzz.rang
              } else {
                e.querySelector("select").value = ""
              }
            })
            // console.log(document.querySelectorAll("tr"))
            document.querySelector("tbody").querySelectorAll("tr").forEach(function (e) {
              e.querySelector("textarea").addEventListener('change', function (mezo) {
                console.log("change")
                chrome.runtime.sendMessage({
                  kerestipus: "ujmegjegyzes",
                  megjegyzes: e.querySelector("textarea").value,
                  id: e.querySelector("textarea").id,
                  cim: e.querySelector("a").innerText
                }, function (response) {})
              })
            })
            document.querySelector("tbody").querySelectorAll("tr").forEach(function (e) {
              e.querySelector("select").addEventListener('change', function (mezo) {
                console.log("change")
                chrome.runtime.sendMessage({
                  kerestipus: "ujrang",
                  rang: e.querySelector("select").value,
                  id: e.querySelector("select").id,
                  cim: e.querySelector("a").innerText
                }, function (response) {})
              })
            })
          })
        }, 200);
      })
    },
    "createdRow": function (row, data, dataIndex) {
      //console.log("row:", row);
      let element = row.querySelector(".favicon")
      row.addEventListener('click', function (mezo) {
        console.log("mezo:", mezo);
        document.querySelector('#oldalframe').src = element.name
        if (elementregi == "") {} else {
          elementregi.style.backgroundColor = elementcolorregi
        }
        elementcolorregi = element.parentElement.parentElement.style.backgroundColor
        element.parentElement.parentElement.setAttribute("style", "background-color:rgb(179, 179, 179)")
        elementregi = element.parentElement.parentElement
      })
    }
  });
});