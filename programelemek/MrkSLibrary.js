function eszkozdetektalo() {
    window.mobilecheck = function () {
        var check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    if (window.mobilecheck()) {
        return "android";
    } else if (window.innerWidth > 860) {
        return "tab";
    } else {
        return "sidebar";
    }
}

function scrollbareltunteto() {
    let basicstyle = `
        body::-webkit-scrollbar {
            display: none;
        }

        div::-webkit-scrollbar {
            display: none;
        }`;

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = basicstyle;
    document.head.appendChild(styleSheet);
}

function datumkora(date1, interval) {
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    date1 = new Date(date1);
    let date2 = new Date();
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years":
            return date2.getFullYear() - date1.getFullYear();
        case "months":
            return date2.getFullYear() * 12 + date2.getMonth() - (date1.getFullYear() * 12 + date1.getMonth());
        case "weeks":
            return Math.floor(timediff / week);
        case "days":
            return Math.floor(timediff / day);
        case "hours":
            return Math.floor(timediff / hour);
        case "minutes":
            return Math.floor(timediff / minute);
        case "seconds":
            return Math.floor(timediff / second);
        default:
            return undefined;
    }
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === "string" && match[2].length > 0) {
        return match[2];
    } else {
        return null;
    }
}

function osszesadatlementese(db, db7) {
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        let osszesadat1 = [];
        console.log("result:", result);

        result.rows.forEach(element => {
            delete element.doc._rev;
            osszesadat1.push(element.doc);
        });

        db7
            .allDocs({
                include_docs: true,
                attachments: true
            })
            .then(function (result) {
                let osszesadat3 = [];
                result.rows.forEach(element => {
                    delete element.doc._rev;
                    /*
                              if (element.doc.window!=undefined) {
                              } else {
                              } */
                    osszesadat3.push(element.doc);
                    // console.log(element.doc)
                });
                let osszesadat4 = {};
                console.log("osszesadat1:", osszesadat1);
                osszesadat4.db = osszesadat1;
                osszesadat4.db7 = osszesadat3;
                var _myArray = JSON.stringify(osszesadat4, null, 4); //indentation in json format, human readable
                var vLink = document.createElement("a"),
                    vBlob = new Blob([_myArray], {
                        type: "octet/stream"
                    }),
                    vName = "Layer Nodes&Sessions mentes.json",
                    vUrl = window.URL.createObjectURL(vBlob);
                vLink.setAttribute("href", vUrl);
                vLink.setAttribute("download", vName);
                vLink.click();
            }).catch(function (error) {
            console.log(error)
        })
    }).catch(function (error) {
        console.log(error)
    })
}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return "j" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}

function getActualSession(callback) {
    if ("sidebar" == eszkozdetektalo()) {
        chrome.windows.getCurrent(
            {
                populate: true
            },
            function (win) {
                db7
                    .find({
                        selector: {
                            windowid: win.id
                        }
                    })
                    .then(function (session) {

                        if (session.docs[0] != undefined) {
                            callback(session.docs[0])
                        } else {

                            db7.get("jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b").then(function (doc) {
                                chrome.windows.getAll(
                                    {
                                        populate: true
                                    },
                                    function (openwins) {
                                        let vegyesnyitva = false
                                        openwins.forEach(function (win) {
                                            console.log(doc, win)
                                            if (doc.windowid == win.id) {
                                                vegyesnyitva = true
                                            }
                                        })
                                        if (vegyesnyitva == false) {

                                            vegyessession()
                                        } else {
                                            callback(undefined)
                                        }
                                    })
                            });


                        }

                        //a window cím mező, ha megváltozik, akkor azt mentse a megfelelő winidre pipa
                    }).catch(function (error) {
                    console.log(error)
                })


            }
        );
    } else {

        let sessionid = window.location.href
        if (sessionid.split('#')[1] == undefined) {
            sessionid = window.parent.location.href
        }
        let sessionid2 = sessionid.split('#')[1]
        if (sessionid2 == "") {
            sessionid2 = "jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b"
        }
        db7.get(sessionid2).then(function (doc) {
            if (doc != undefined) {
                callback(doc)
            } else {
                vegyessession()
            }

        }).catch(function (error) {
            console.log(error)
            vegyessession()
        })


    }

    function vegyessession() {
        db7.get("jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b").then(function (doc) {
            console.log(doc)
            callback(doc)
        }).catch(function (error) {
            console.log(error)
        })


    }

}


const isValidUrl = string => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};
String.prototype.trunc =
    String.prototype.trunc ||
    function (n) {
        return this.length > n ? this.substr(0, n - 1) + "..." : this;
    };
String.prototype.truncnopont =
    String.prototype.truncnopont ||
    function (n) {
        return this.length > n ? this.substr(0, n - 1) : this;
    };

function ranghattergenerator(rang, tipus) {
    if (tipus == "jegyzet") {
        return "rgb(193, 132, 243)";
    } else {
        if (rang == 1) {
            return "rgb(255,189,189)";
        } else if (rang == 2) {
            return "rgb(255,215,176)";
        } else if (rang == 3) {
            return "rgb(255,252,173)";
        } else if (rang == 4) {
            return "rgb(221,255,153)";
        } else if (rang == 5) {
            return "rgb(204,228,255)";
        } else {
            return "#f4f6ff";
        }
    }
}

let elementhideobject = {}

function elementhider(buttonselector, elementselector) {
    document.querySelector(buttonselector).addEventListener("click", function (e) {
        if (elementhideobject[elementselector]) {

            document.querySelector(elementselector).style.display = "block"
            elementhideobject[elementselector] = false
        } else {

            document.querySelector(elementselector).style.display = "none"
            elementhideobject[elementselector] = true
        }
    })
}


function pouchkategoriaszuro(kategoriak, callback) {

    let ido = Date.now()
    db.allDocs({
        include_docs: true,
    }).then(function (result) {
        let talalatok = []

        function keresoszoszuro(element) {
            if (kategoriak.keresoszo) {
                let cim = ""
                if(element.doc.cim){
                    cim = element.doc.cim.toLowerCase()}
                let megjegyzes = ""
                if(element.doc.megjegyzes){
                    megjegyzes =  element.doc.megjegyzes.toLowerCase()}


                let keresoszo = kategoriak.keresoszo.toLowerCase()
                if (cim.includes(keresoszo) || megjegyzes.includes(keresoszo)) {
                    talalatok.push(element)
                }
            } else {
                talalatok.push(element)
            }
        }

        result.rows.forEach(element => {
            if (element.doc.tipus == kategoriak.tipus || !kategoriak.tipus) {
                if (kategoriak.kategoria) {
                    if (kategoriak.alkategoria) {
                        if (kategoriak.alalkategoria) {
                            if (element.doc.kategoria == kategoriak.kategoria && element.doc.alkategoria == kategoriak.alkategoria && element.doc.alalkategoria == kategoriak.alalkategoria) {
                                keresoszoszuro(element)
                            }
                        } else {
                            if (element.doc.kategoria == kategoriak.kategoria && element.doc.alkategoria == kategoriak.alkategoria) {
                                keresoszoszuro(element)
                            }
                        }
                    } else {
                        if (element.doc.kategoria == kategoriak.kategoria) {
                            keresoszoszuro(element)
                        }
                    }
                } else {
                    keresoszoszuro(element)
                }
            }
        })


        talalatok.sort(function (a, b) {
            if (!b.doc.datum) {
                b.doc.datum = 0
            }
            if (!a.doc.datum) {
                a.doc.datum = 0
            }
            return b.doc.datum - a.doc.datum;
        });
        //talalatok.sort((b, a) => (a.doc.datum > b.doc.datum) - (a.doc.datum < b.doc.datum))
        console.log(Date.now() - ido)
        callback(talalatok)
    })

}

function pouchkategoriadropdown(kategoriak, kategoriatipus, callback) {

    console.log(kategoriak)
    let ido = Date.now()
    db.allDocs({
        include_docs: true,
    }).then(function (result) {
        let talalatok = []
        result.rows.forEach(element => {

            if (kategoriatipus == "kategoria" && element.doc.kategoria) {
                let bennevan = false
                talalatok.forEach(talalat => {
                    if (talalat == element.doc.kategoria) {
                        bennevan = true
                    }
                })
                if (!bennevan) {
                    talalatok.push(element.doc.kategoria)
                }
            }
            if (kategoriatipus == "alkategoria" && kategoriak.kategoria && kategoriak.kategoria == element.doc.kategoria && element.doc.alkategoria) {

                let bennevan = false
                talalatok.forEach(talalat => {
                    if (talalat == element.doc.alkategoria) {
                        bennevan = true
                    }
                })
                if (!bennevan) {
                    talalatok.push(element.doc.alkategoria)
                }
            }
            if (kategoriatipus == "alalkategoria" && kategoriak.kategoria && kategoriak.alkategoria && kategoriak.kategoria == element.doc.kategoria && kategoriak.alkategoria == element.doc.alkategoria && element.doc.alalkategoria) {

                let bennevan = false
                talalatok.forEach(talalat => {
                    if (talalat == element.doc.alalkategoria) {
                        bennevan = true
                    }
                })
                if (!bennevan) {
                    talalatok.push(element.doc.alalkategoria)
                }
            }
            if (kategoriatipus == "tipus" && element.doc.tipus) {
                let bennevan = false
                talalatok.forEach(talalat => {
                    if (talalat == element.doc.tipus) {
                        bennevan = true
                    }
                })
                if (!bennevan) {
                    talalatok.push(element.doc.tipus)
                }
            }
        })
        console.log(talalatok)
        talalatok.sort((a, b) => (a > b) - (a < b))
        console.log(Date.now() - ido)
        console.log(talalatok)
        callback(talalatok)
    })


}


function ablakInit(ablakid, width, height, headerlegyen, callback) {

    let ablak = document.createElement("div")
    ablak.style.width = width
    ablak.style.height = height
    ablak.style.position = "absolute"
    ablak.style.top = "10%"
    ablak.style.left = "10%"
    ablak.style.zIndex = "9"
    ablak.style.backgroundColor = "#f1f1f1"
    ablak.style.border = "1px solid #d3d3d3"

    ablak.id = ablakid
    let headermagassag = ""
    if (headerlegyen) {
        headermagassag = "20px"
    } else {
        headermagassag = "0px"
    }
    let header = document.createElement("div")
    header.style.width = "100%"
    header.style.height = headermagassag
    header.style.backgroundColor = "#b5d3f1"
    header.id = ablakid + "header"
    let bezarasgomb = document.createElement("div")

    bezarasgomb.style.cssFloat = "right"
    bezarasgomb.style.width = headermagassag
    bezarasgomb.style.height = headermagassag
    bezarasgomb.style.backgroundColor = "#f16d7a"
    bezarasgomb.id = ablakid + "bezarasgomb"
    let body = document.createElement("div")
    body.style.width = "100%"
    body.style.backgroundColor = "#eaecf1"
    body.style.overflow = "auto"
    body.id = ablakid + "body"

    header.appendChild(bezarasgomb)
    ablak.appendChild(header)

    ablak.appendChild(body)
    document.querySelector("body").appendChild(ablak)


    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(ablak.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(ablak.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        ablak.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        ablak.style.top = (ablak.offsetTop - pos2) + "px";
        ablak.style.left = (ablak.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    bezarasgomb.addEventListener("click", function () {

        ablak.remove()


    })


    callback()
}

function inputsuggestionoff() {

    document.querySelectorAll("input").forEach(function (inputs) {
        inputs.autocomplete = "off"
    })
}

let ProgramsData = [
    {
        tipus: "conceptmap",
        logo: "C",
        htmlpath: "./ProgramConceptMap.html",
        buttonid: "ConceptMapButton",
        startmentes: true
    },
    {
        tipus: "explorer",
        logo: "E",
        htmlpath: "./ProgramExplorer.html",
        buttonid: "ExplorerButton",
        startmentes: false
    },
    {
        tipus: "research",
        logo: "R",
        htmlpath: "./ProgramResearch.html",
        buttonid: "ResearchButton",
        startmentes: true
    },
    {
        tipus: "naptar",
        logo: "N",
        htmlpath: "./ProgramNaptar.html",
        buttonid: "NaptarButton",
        startmentes: false
    }
]

function filebetolto(fileid, filetipus) {

    let talalat = false
    ProgramsData.forEach(function (program) {
        if (program.tipus === filetipus) {
            talalat = true
            getActualSession(function (session) {

                chrome.runtime.sendMessage(
                    {
                        kerestipus: "ujprogram",
                        tipus: filetipus,
                        fileid: fileid,
                        sessionid: session._id
                    },
                    function (response) {
                    }
                );
            })
        }
    })
    if (!talalat) {
        window.open(fileid, "_blank");
    }

}

function loadfilesamewindow(fileid) {
    db.get(fileid).then(function (file) {
        if (file.tipus == window.frameElement.getAttribute("tipus")) {
            window.frameElement.setAttribute("fileid", fileid)
            let src = window.frameElement.getAttribute("src")
            window.frameElement.setAttribute("src", src)


        }
    }).catch(function (err) {

    })

}
