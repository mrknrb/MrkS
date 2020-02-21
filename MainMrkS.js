let tabcount = 0
let jelenlegitab = ""
let sessionid = ""
let ProgramsData = {
    ConceptMap: {
        logo: "",
        htmlpath: "./ProgramConceptMap.html"
    },
    Explorer: {
        logo: "",
        htmlpath: "./ProgramExplorer.html"
    },
    Naptar: {
        logo: "",
        htmlpath: "./ProgramNaptar.html"
    }
}

getActualSession(function (session) {
    sessionid = session._id

})

/**  OK   */
function programstarter(fileid_false_ha_nincs_file, tipus_ha_uj_fajl) {
    function programmento() {
        db7
            .get(sessionid)
            .then(function (doc) {
                doc.programs.push({fileid_false_ha_nincs_file, tipus_ha_uj_fajl})
                return db7.put(doc);
            })
    }
    if (fileid != false) {
        db.get(fileid).then(function (doc) {
            if (doc.tipus == "ConceptMap") {


            }else if(doc.tipus == "Explorer"){


            }else if(doc.tipus == "Naptar"){


            }
        })
    } else if (tipus_ha_uj_fajl != undefined) {
        //a tipussal nyit egy új programot

    }


    let iframehtml = `<iframe src="${htmlpath}" sandbox="allow-scripts allow-modals" sessionid="${sessionid}" fileid="${fileid}" frameBorder="0" style="width: 100vw;height: 97vh;"></iframe>`

    tabcount++
    let tabnumber = tabcount
    getActualSession(function (session) {


    })
    let tab = document.createElement("li")
    tab.innerHTML = `<a class="tabbuttons" id="tabbutton${tabnumber}" href="#tab${tabnumber}" fileid="${fileid}">${cim}</a><a id="tabbezarobutton${tabnumber}" class="tabbezarobuttons" href="#tab${tabnumber}" style="width:20px; text-align: center;font-weight:900">×</a>`
    document.querySelector(".tab-links").appendChild(tab)

    let page = document.createElement("div")
    page.id = `tab${tabnumber}`
    page.class = "tab"
    page.style = "display: block;"

    document.querySelector(".tab-content").appendChild(page)

    document.querySelector(`#tab${tabnumber}`).innerHTML = iframehtml

    jQuery(".tabs " + `#tab${tabnumber}`)
        .show()
        .siblings()
        .hide()
    jQuery(`.tabs .tab-links [href="#tab${tabnumber}"]`)
        .parent("li")
        .addClass("active")
        .siblings()
        .removeClass("active")

    jelenlegitab = jQuery(`.tabs .tab-links [href="#tab${tabnumber}"]`).attr("href")

    jQuery(".tabs .tab-links .tabbuttons").on("click", function (e) {
        jelenlegitab = jQuery(this).attr("href")
        var currentAttrValue = jQuery(this).attr("href")
        // Show/Hide Tabs
        jQuery(".tabs " + currentAttrValue)
            .show()
            .siblings()
            .hide()
        // Change/remove current tab to active
        jQuery(this)
            .parent("li")
            .addClass("active")
            .siblings()
            .removeClass("active")
        e.preventDefault()
    })

    jQuery(".tabs .tab-links .tabbezarobuttons").on("click", function (e) {

        db7
            .get(sessionid)
            .then(function (doc) {

                doc.programs.forEach(function (program) {

                })

                push({fileid})

                return db7.put(doc);

            })


        var currentAttrValue = jQuery(this).attr("href")
        // Show/Hide Tabs
        jQuery(".tabs " + currentAttrValue).remove()
        // Change/remove current tab to active
        jQuery(this)
            .parent()
            .remove()
        e.preventDefault()

        if (jelenlegitab == currentAttrValue) {
            jQuery(".tab-content")
                .children()
                .first()
                .show()
                .siblings()
                .hide()
            let a = jQuery(".tab-content")
                .children()
                .first()
                .attr("id")
            jQuery(`.tabs .tab-links [href="#${a}"]`)
                .parent("li")
                .addClass("active")
                .siblings()
                .removeClass("active")
            jelenlegitab = jQuery(`.tabs .tab-links [href="#${a}"]`).attr("href")
        }
    })
}

document.getElementById("dropdownbutton").addEventListener("click", function () {
    document.getElementById("myDropdown").classList.toggle("show")
})
// Close the dropdown menu if the user clicks outside of it

document.getElementById("sidebarmenu").addEventListener("click", function () {
    document.getElementById("menumyDropdown").classList.toggle("show")
})
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content")
        var i
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i]
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show")
            }
        }
    }

    if (!event.target.matches(".menubtn")) {
        var dropdowns = document.getElementsByClassName("menudropdown-content")
        var i
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i]
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show")
            }
        }
    }
}

programstarter("./programsessiondatabase.html", "Session&Files")
document.getElementById("tabsanddatastartbutton").addEventListener("click", function () {
    programstarter("./programsessiondatabase.html", "Session&Files")
})
document.getElementById("conceptmapstartbutton").addEventListener("click", function () {
    programstarter("./programconceptmap.html", "Conceptmap")
})
document.getElementById("naptarstartbutton").addEventListener("click", function () {
    programstarter("./programnaptar.html", "Naptar")
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sessionid == sessionid)
        if (request.kerestipus == "ujprogram") {
            if (request.tipus == "conceptmap") {
                programstarter(request.fileid)
            } else if (false) {
            } else {
            }
        }
})

document.getElementById("opentab").addEventListener("click", function () {
    window.open("main.html", "_blank")
})

/*
chrome.tabs.create({
  url: chrome.runtime.getURL("sidebar.html")
})

*/

function loaddatabasebuttoninit(buttonselector) {
    let feltoltesbutton = document.querySelector(buttonselector)
    let feltoltesrejtett = document.createElement("file")
    feltoltesrejtett.id = "feltoltesrejtett"
    feltoltesrejtett.accept = ".json"
    feltoltesrejtett.style.display = "none"
    feltoltesbutton.parentNode.insertBefore(feltoltesrejtett, feltoltesbutton.nextSibling)

    document.getElementById("feltoltesrejtett").addEventListener("change", loaddatabase, false)
    feltoltesbutton.addEventListener("click", function (e) {
        document.getElementById("feltoltesrejtett").click()
    })

    function loaddatabase(e) {
        function importFun(e) {
            var files = e.target.files,
                reader = new FileReader()
            reader.onload = _imp
            reader.readAsText(files[0])
        }

        importFun(e)

        function _imp() {
            var _myImportedData = JSON.parse(this.result)
            //here is your imported data, and from here you should know what to do with it (save it to some storage, etc.)
            // console.log(_myImportedData);
            db.bulkDocs(_myImportedData.db)
            db7.bulkDocs(_myImportedData.db7)
            document.getElementById("feltoltesrejtett").value = "" //make sure to clear input value after every import
        }
    }
}

document.getElementById("letoltes").addEventListener("click", function () {
    osszesadatlementese()
})
