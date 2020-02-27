let tabcount = 0
let jelenlegitab = ""
let sessionid = ""
let eszkoz = eszkozdetektalo()

var db = new PouchDB("NodesNet", {
    auto_compaction: true
})
var db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})
getActualSession(function (session) {
    sessionid = session._id
})
if (eszkoz == "android") {


    var dbremote = new PouchDB(
        "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db"
    );
    var db7remote = new PouchDB(
        "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db7"
    );

    db.sync(dbremote);
    db7.sync(db7remote);

    function start2() {
        db.sync(dbremote);

        db7.sync(db7remote);

        setTimeout(start2, 10000);
    }

    start2();
}
//OK---------------------------------------------------------------------------------------------------------
function programstarter(adatok) {
    /**adatok:{fileid,tipus,programtabid}*/
//OK-----------------------------------------------------------------------------------------

    let programtabid2 = adatok.programtabid

    if (adatok.programtabid == undefined) {
        programtabid2 = guidGenerator()
    }
    function programmento(tipus,fileid) {

        getActualSession(function (session) {
            db7
                .get(session._id)
                .then(function (doc) {
                    let adatok2 = {}
                    adatok2.tipus = tipus
                    if(adatok.fileid){
                    adatok2.fileid = adatok.fileid
                    }else{ adatok2.fileid = fileid}
                    adatok2.programtabid = programtabid2

                    console.log("adatok2",adatok)
                    if (doc.programs == undefined) {
                        doc.programs = []
                    }
                    doc.programs.push(adatok2)
                    return db7.put(doc);
                })
                .catch(function (error) {
                    console.log(error)
                })
        })


    }


//OK----------------------------------------------------------------------------------------
    //todo
    if (adatok.fileid != undefined) {
        db.get(adatok.fileid).then(function (doc) {
            ProgramsData.forEach(function (program) {
                if (program.tipus === doc.tipus) {
                    if (adatok.programtabid == undefined) {
                        programmento(program.tipus)
                    }
                    programbetolto(program)

                }
            })

        }).catch(function (error) {
            alert("Load Failed!2")

            getActualSession(function (session) {
                db7
                    .get(session._id)
                    .then(function (doc) {
                        doc.programs.forEach(function (program, index) {
                            if (adatok.fileid == program.fileid) {
                                doc.programs.splice(index, 1);


                                return db7.put(doc);
                            }
                        })



                    }).catch(function (error) {
                    console.log(error)
                })


        })
        })
    } else if (adatok.tipus != undefined) {
        //a tipussal nyit egy új programot
        ProgramsData.forEach(function (program) {
            if (program.tipus === adatok.tipus) {

                if (program.startmentes == true) {
                    let adatok2 = {}
                    adatok2._id = guidGenerator()
                    adatok2.tipus = adatok.tipus
                    adatok2.datum = Date.now()
                    getActualSession(function (session) {
                        if (session != undefined) {
                            if (session.kategoria != undefined && session.kategoria != "") {
                                adatok2.kategoria = session.kategoria
                            }
                            if (session.alkategoria != undefined && session.alkategoria != "") {
                                adatok2.alkategoria = session.alkategoria
                            }
                            if (session.alalkategoria != undefined && session.alalkategoria != "") {
                                adatok2.alalkategoria = session.alalkategoria
                            }
                        }
                        db.put(adatok2).then(function (e) {
                            if (adatok.programtabid == undefined) {
                                programmento(adatok.tipus,adatok2._id)
                            }
                            programbetolto(program)

                        }).catch(function (err) {
                            alert("Load Failed!")
                        })
                    })
                } else {
                    programbetolto(program)

                }

            }
        })

    } else {
        alert("Load Failed!")
    }

//OK-----------------------------------------------------------------------------------------
    function programbetolto(program) {
        let iframehtml = `<iframe src="${program.htmlpath}" tipus="${adatok.tipus}" sessionid="${sessionid}" fileid="${adatok.fileid}" frameBorder="0" style="width: 100vw;height: 97vh;"></iframe>`

        tabcount++
        let tabnumber = tabcount
        let tab = document.createElement("li")
        tab.innerHTML = `<a class="tabbuttons" id="tabbutton${tabnumber}" href="#tab${tabnumber}" fileid="${adatok.fileid}" style="width:50px">${program.logo}</a><a id="tabbezarobutton${tabnumber}" programtabid="${programtabid2}"class="tabbezarobuttons" href="#tab${tabnumber}" style="width:20px; text-align: center;font-weight:900">×</a>`
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

//OK^--------------------------------------------------------------------------------------------------------A torlo meg van csinálva elvileg
        jQuery(".tabs .tab-links .tabbezarobuttons").on("click", function (e) {
            let xx = this
            getActualSession(function (session) {

                db7
                    .get(session._id)
                    .then(function (doc) {
                        console.log(doc)
                        let programtabid3 = jQuery(xx).attr("programtabid")
                        doc.programs.forEach(function (program, index) {
                            console.log(programtabid3, program.programtabid)
                            if (programtabid3 == program.programtabid) {
                                doc.programs.splice(index, 1);
                            }
                        })


                        return db7.put(doc);

                    }).catch(function (error) {
                    console.log(error)
                })

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
}

//OK---------------------------------------------------------------------------------------------------------
document.getElementById("dropdownbutton").addEventListener("click", function () {
    document.getElementById("myDropdown").classList.toggle("show")
})
//OK---------------------------------------------------------------------------------------------------------
document.getElementById("sidebarmenu").addEventListener("click", function () {
    document.getElementById("menumyDropdown").classList.toggle("show")
})
//OK---------------------------------------------------------------------------------------------------------
window.onclick = function (event) {
    // Close the dropdown menu if the user clicks outside of it
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

//OK---------------------------------------------------------------------------------------------------------
function programOpenerInit() {
    let myDropdown = document.querySelector("#myDropdown")
    ProgramsData.forEach(function (program) {
        let a = document.createElement("a")
        a.id = program.buttonid
        a.setAttribute("tipus", program.tipus)
        a.innerText = program.tipus
        myDropdown.appendChild(a)
        a.addEventListener("click", function (a2) {
            programstarter({tipus: a.getAttribute("tipus")})
        })
    })
}

programOpenerInit()

//OK---------------------------------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.sessionid == sessionid)
        if (request.kerestipus == "ujprogram") {

            programstarter({fileid: request.fileid})
        }
})
//OK---------------------------------------------------------------------------------------------------------
document.getElementById("opentab").addEventListener("click", function () {

    window.open("MainMrkS.html#jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b", "_blank")

})

//OK---------------------------------------------------------------------------------------------------------
function feltoltesbuttoninit() {
    let feltoltesbutton = document.querySelector("#feltoltesgomb")
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

//OK---------------------------------------------------------------------------------------------------------
document.getElementById("letoltesgomb").addEventListener("click", function () {
    osszesadatlementese(db, db7)
})

//OK---------------------------------------------------------------------------------------------------------
function sessioncolorinit(session) {
    document.querySelector("#SessionColorButton").addEventListener("click", function (e) {
        document.getElementById("sessioncolor").click()
    })

    let sessioncolor = document.querySelector("#sessioncolor");

    if (session == undefined) {
        sessioncolor.value = "#a0bdd8";
    } else {
        if (session.color == null) {
            sessioncolor.value = "#a0bdd8";
        } else {
            sessioncolor.value = session.color;
        }
    }
    document
        .querySelector("body")
        .setAttribute(
            "style",
            "background-color:" + document.querySelector("#sessioncolor").value
        );


    document
        .querySelector("#sessioncolor")
        .addEventListener("change", function (params) {
            console.log("color")
            document
                .querySelector("body")
                .setAttribute(
                    "style",
                    "background-color:" + document.querySelector("#sessioncolor").value
                );
            db7.get(session._id).then(function (doc) {
                doc.color = document.querySelector("#sessioncolor").value;
                return db7.put(doc);
            }).catch(function (error) {
                console.log(error)
            });
        });
}

function programsrestart(session) {
    if (session._id != "jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b") {

        console.log("session",session)
        if (session.programs != undefined) {
            session.programs.forEach(function (programadatok) {

                console.log("programadatok",programadatok)
                programstarter(programadatok)
            })
        } else {
            programstarter({tipus: "explorer"})
        }
    } else {

        programstarter({tipus: "explorer"})
    }
}

function sessionselectinit() {
    let self = this
    document
        .querySelector("#sessionselect")
        .addEventListener("change", function (params) {
            if (params.target.value != 0) {

                db7.get(params.target.value).then(function (doc) {
                    if (eszkoz == "sidebar") {
                        chrome.windows.create(
                            {
                                url: [],
                                state: "maximized"
                            },
                            function (wind) {
                                doc.windowid = wind.id;
                                return db7.put(doc);
                            }
                        );
                    } else {

                        window.open(`MainMrkS.html#${params.target.value}`, "_blank")


                    }

                });


            }
        });


}

//OK---------------------------------------------------------------------------------------------------------->>>>>>>>>

function sessionselectfrissitoinit() {
    document
        .querySelector("#sessionselect")
        .addEventListener("mouseover", function (params) {
            $("#sessionselect")
                .find("option")
                .remove()
                .end();
            document.getElementById("sessionselect").options.add(new Option("", 0));
            //üres option berak
            db7
                .allDocs({
                    include_docs: true,
                    attachments: true
                })
                .then(function (result) {
                    function szuro(row, win) {
                        let a = 0;
                        win.forEach(element2 => {
                            if (element2.id == row.doc.windowid) {
                                a = 1;
                            }
                        });
                        return a;
                    }

                    function berako(element) {
                        document
                            .getElementById("sessionselect")
                            .options.add(new Option(element.doc.cim, element.id));
                        //windows-ban ha nincs benne,a mentett db6 akkor berakja
                    }

                    function listbetolto(win) {
                        let resultrows = result.rows;
                        resultrows.sort((a, b) => a.doc.cim.localeCompare(b.doc.cim));
                        resultrows.forEach(element => {
                            if (eszkoz == "sidebar") {
                                if (szuro(element, win) == 0) {
                                    berako(element)
                                }
                            } else {
                                berako(element)
                            }
                        });
                    }

                    if (eszkoz == "sidebar") {
                        chrome.windows.getAll(function (win) {
                            listbetolto(win)
                        });
                    } else {
                        listbetolto()
                    }
                })
        })
}

//OK---------------------------------------------------------------------------------------------------------->>>>>>>>>

function sessioncimvaltozasinit(session) {
    document
        .querySelector("#sessionname")
        .addEventListener("change", function (params) {
            db7.get(session._id).then(function (doc) {
                doc.cim = document.querySelector("#sessionname").value;
                return db7.put(doc);
            })
        })
}

function sessiondeleteinit(session) {
    document
        .querySelector("#sessiondelete")
        .addEventListener("click", function (e) {
            let biztosan = confirm("Biztosan Torlod?");
            if (biztosan) {
                db7.get(session._id).then(function (doc) {
                    return db7.remove(doc);
                }).then(function () {
                    if (eszkoz == "sidebar") {
                        chrome.windows.getCurrent(
                            {
                                populate: true
                            },
                            function (win) {
                                chrome.windows.remove(win.id)
                            })
                    } else {
                        window.close();
                    }
                })
            }
        });
}

//OK---------------------------------------------------------------------------------------------------------->>>>>>>>>
function Init() {
    getActualSession(function (session) {
        if (session != undefined) {
            feltoltesbuttoninit()
            document.querySelector("#sessionname").value = session.cim;
            programsrestart(session)
            sessioncolorinit(session)
            sessionselectinit()
            sessionselectfrissitoinit()
            sessioncimvaltozasinit(session)
            sessiondeleteinit(session)
        }
    })
}

Init()


