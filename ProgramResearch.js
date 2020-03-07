var db = new PouchDB("NodesNet", {
    auto_compaction: true
})
var db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})

inputsuggestionoff()
let aktualiskerdesid = ""
let aktualiskeresesid = ""
let aktualistalalatid = ""
let fileid = window.frameElement.getAttribute("fileid")
//------------------------------------------------------------------------------detailsbox
let detailsselectors = {
    divcontainer: "#detailsdiv",
}
let detailsbeallitasok = {
    automatavalto: true,
    divcontainerbebetoltes: true
}
let details = new ModulDetails(detailsselectors, detailsbeallitasok)
document
    .querySelector("#detailsbox")
    .setAttribute(
        "style",
        " min-width: 385px;     width:100%;      margin:0;      padding:0 ;      min-width: 385px;      overflow-x: hidden;    overflow-y: auto;      height: 132px"
    );

document
    .querySelector("#megjegyzesmezo")
    .setAttribute("style", "height:120px;width:100%");

document.querySelector("#detailssajatadatok").addEventListener("click", function (e) {

    details.detailsfrissito(fileid)
})

if (fileid != undefined) {

    let attman =new AttachmentManager({fileid, tipus: "research"})
    details.detailsfrissito(fileid)
    attman.betoltes(function (att) {


        if (att !== "error") {
            let att2 = att
            if (att == "nincsattachment") {
                att2 = {}
                att2.kerdesek = []
                att2.talalatok = []
                attman.mentes(att2)
            }

            if (att.aktualiskerdesid) {
                aktualiskerdesid = att.aktualiskerdesid
                att.kerdesek.forEach(function (element, index) {
                    if (element.kerdesid === aktualiskerdesid) {
                        if (!element.keresesek) {
                            att.kerdesek[index].keresesek = []
                        }
                        let keresesek = att.kerdesek[index].keresesek
                        keresesekbetolto(keresesek)
                    }
                })
            } else {
                keresesekbetolto()
            }

            kerdesekbetolto(att2.kerdesek)
            talalatokbetolto()


        }
    })


}
elementhider("#detailsboxopen", "#detailsdiv")
//------------------------------------------------------------------------------detailsbox


//------------------------------------------------------------------------------kozos
function tablefrissito(adatok, selector) {

    $(selector)
        .DataTable()
        .clear();
    // console.log("tabsadatok:", tabsadatok);
    $(selector)
        .DataTable()
        .rows.add(adatok); // Add new data
    $(selector)
        .DataTable()
        .columns.adjust()
        .draw();
}

//------------------------------------------------------------------------------kozos

//------------------------------------------------------------------------------kerdesektable

document.querySelector("#ujkerdes").addEventListener("click", function (e) {

    let kerdescim = document.querySelector("#kerdescim").value


    let attman =new AttachmentManager({fileid, tipus: "research"})
    attman.betoltes(function (att) {

        if (att !== "error" || att !== "nincsattachment") {
            let att2 = att
            att2.kerdesek.unshift({kerdesid: guidGenerator(), kerdescim: kerdescim, datum: Date.now(), keresesek: []})

            tablefrissito(att2.kerdesek, "#kerdesektable")
            attman.mentes(att2)
        }
    })

})


function kerdesekbetolto(adatok) {
    let columns = [
        {
            title: "Keresesek",
            defaultContent: ""
        },
        {
            title: "Kerdes",
            defaultContent: ""
        },
        {
            title: "Rang",
            defaultContent: ""
        },
        {
            title: "Datum",
            defaultContent: ""
        }
    ];
    let columndefs = [
        {
            width: 20,
            targets: 0
        },
        {
            width: "120px",
            targets: 3
        }
    ]


    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $("#kerdesektable").DataTable({
            initComplete: function () {


            },
            scrollY: 180,
            searching: false,
            ordering: false,
            paging: false, //kell a scrollerhez
            // "pageLength": 50,
            info: false,
            data: adatok,
            columns: columns,
            columnDefs: columndefs,
            createdRow: function (row, data, dataIndex) {

                kerdesekrowadatbeilleszto(row, data)
            }
        });
    });
}

function kerdesekrowadatbeilleszto(row, data) {

    let col = row.querySelectorAll("td");
    //col[0].innerHTML = icon;
    if (data.kerdesid == aktualiskerdesid) {
        row.style.backgroundColor = "#a0bdd8"
    }
    let kerdescim = document.createElement("a")

    kerdescim.innerText = data.kerdescim

    let datum = document.createElement("a")

    datum.innerText = new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(data.datum)


    col[1].appendChild(kerdescim)
    col[3].appendChild(datum)
    col[1].addEventListener("click", function (e) {

        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {

            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                att2.kerdesek.forEach(function (element, index) {
                    if (element.kerdesid === data.kerdesid) {
                        if (!element.keresesek) {
                            att2.kerdesek[index].keresesek = []
                        }
                        let keresesek = att2.kerdesek[index].keresesek
                        att2.aktualiskerdesid = data.kerdesid
                        aktualiskerdesid = data.kerdesid
                        tablefrissito(att2.kerdesek, "#kerdesektable")
                        tablefrissito(keresesek, "#keresesektable")
                        tablefrissito([], "#talalatoktable")

                        attman.mentes(att2)
                    }
                })

            }
        })


    })
    col[3].addEventListener("click", function (e) {

        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {

            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                att2.kerdesek.forEach(function (element, index) {
                    if (element.kerdesid === data.kerdesid) {
                        let biztosan = confirm("Biztosan Torlod?");
                        if (biztosan) {
                            att2.kerdesek.splice(index, 1);

                            attman.mentes(att2)
                        }
                    }
                })
                tablefrissito(att2.kerdesek, "#kerdesektable")
            }
        })
    })
}

//------------------------------------------------------------------------------kerdesektable

//------------------------------------------------------------------------------keresesektable

function keresesekbetolto(data = []) {

    let columns = [
        {
            title: "Kereso",
            defaultContent: ""
        },
        {
            title: "Talalatokszama",
            defaultContent: ""
        },
        {
            title: "Kereses szovege",
            defaultContent: ""
        },
        {
            title: "Datum",
            defaultContent: ""
        }
    ];
    let columndefs = [
        {
            width: 20,
            targets: [0, 1]
        },
        {
            width: "50%",
            targets: [2]
        }
    ];


    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $("#keresesektable").DataTable({
            initComplete: function () {
            },
            scrollY: 180,
            searching: false,
            ordering: false,
            paging: false, //kell a scrollerhez
            // "pageLength": 50,
            info: false,
            data: data,
            columns: columns,
            columnDefs: columndefs,
            createdRow: function (row, data, dataIndex) {
                console.log(data)
                console.log(row)
                keresesekrowadatbeilleszto(row, data)
            }
        })
    })
}

function keresesekrowadatbeilleszto(row, data) {

    let col = row.querySelectorAll("td");
    //col[0].innerHTML = icon;

    if (data.keresesid == aktualiskeresesid) {
        row.style.backgroundColor = "#a0bdd8"
    }
    let keresesszoveg = document.createElement("a")

    keresesszoveg.innerText = data.keresesszoveg

    let datum = document.createElement("a")

    datum.innerText = new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(data.datum)

    col[0].innerText = data.keresesengine
    col[2].appendChild(keresesszoveg)
    col[3].appendChild(datum)
    col[2].addEventListener("click", function (e) {

        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {

            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                att2.kerdesek.forEach(function (element, kerdesindex) {
                    if (element.kerdesid === aktualiskerdesid) {
                        element.keresesek.forEach(function (kereses, keresesindex) {
                            if (kereses.keresesid === data.keresesid) {
                                aktualiskeresesid = data.keresesid
                                att2.aktualiskeresesid = data.keresesid
                                tablefrissito(att2.kerdesek[kerdesindex].keresesek, "#keresesektable")

                                kereso(data.keresesszoveg, data.keresesengine, function (talalatok) {
                                    tablefrissito(talalatok, "#talalatoktable")

                                })

                                attman.mentes(att2)
                            }
                        })
                    }
                })
            }
        })


    })
    col[3].addEventListener("click", function (e) {
        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {

            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att

                att2.kerdesek.forEach(function (element, kerdesindex) {
                    if (element.kerdesid === aktualiskerdesid) {
                        element.keresesek.forEach(function (kereses, keresesindex) {
                            if (kereses.keresesid === data.keresesid) {
                                let biztosan = confirm("Biztosan Torlod?");
                                if (biztosan) {

                                    att2.kerdesek[kerdesindex].keresesek.splice(keresesindex, 1);

                                    attman.mentes(att2)

                                }
                            }
                        })
                        tablefrissito(att2.kerdesek[kerdesindex].keresesek, "#keresesektable")
                    }
                })


            }
        })

    })
}


//------------------------------------------------------------------------------keresesektable


//------------------------------------------------------------------------------talalatoktable
function talalatokbetolto(data = []) {
    let columns = [
        {
            title: "V",
            defaultContent: ""
        },
        {
            title: "A",
            defaultContent: ""
        },
        {
            title: "Cim",
            defaultContent: ""
        },
        {
            title: "Leiras",
            defaultContent: ""
        },
        {
            title: "Tags",
            defaultContent: ""
        }
    ];
    let columndefs = [
        {
            width: 20,
            targets: 0
        },
        {
            width: "80%",
            targets: [2]
        }
    ];


    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $("#talalatoktable").DataTable({
            initComplete: function () {
            },
            scrollY: 300,
            searching: false,
            ordering: false,
            paging: false, //kell a scrollerhez
            // "pageLength": 50,
            info: false,
            data: data,
            columns: columns,
            columnDefs: columndefs,
            createdRow: function (row, data, dataIndex) {
                //row.querySelectorAll("td")[1].innerText = "000";
                talalatokrowadatbeilleszto(row, data)
            }
        });
    });
}

let elozorow
let elozocol

function talalatokrowadatbeilleszto(row, data) {
    let col = row.querySelectorAll("td");

//console.log(data)
    //  console.log(data.allapot)
    if (data.allapot == "megnyitott") {

        row.style.backgroundColor = "PINK"
    } else if (data.allapot == "fontos") {

        row.style.backgroundColor = "GREEN"
    }
    //col[0].innerHTML = icon;
    if (data.votes) {
        let votes = document.createElement("b")
        votes.innerText = data.votes
        col[1].appendChild(votes)
    }
    if (data.talalatcim) {
        let talalatcim = document.createElement("b")
        talalatcim.innerText = data.talalatcim
        col[2].appendChild(talalatcim)
    }

    col[2].addEventListener("click", function (e) {

        if (eszkoz == "sidebar") {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (tabs) {
                    chrome.tabs.update(tabs[0].id, {url: data.talalaturl, active: true})
                })
        } else {
            chrome.tabs.create({url: data.talalaturl})
        }
        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {
            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                let megvan = false
                att2.talalatok.forEach(function (element) {
                        if (element.talalaturl === data.talalaturl) {
                            megvan = true

                        }
                    }
                )
                if (!megvan) {
                    data.allapot = "megnyitott"
                    att2.talalatok.unshift(data)
                    attman.mentes(att2)
                }


            }
        })


        if (data.allapot != "fontos") {
            data.allapot = "megnyitott"
            row.style.backgroundColor = "PINK"
        }
        col[0].style.backgroundColor = "#a0bdd8"
        if (elozocol) {

            elozocol.style.backgroundColor = elozorow.style.backgroundColor
        }

        elozorow = row
        elozocol = col[0]

    })
    col[3].addEventListener("click", function (e) {
        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {
            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                att2.talalatok.forEach(function (element) {
                        if (element.talalaturl === data.talalaturl) {
                            if (element.allapot == "fontos") {
                                element.allapot = "megnyitott"
                                row.style.backgroundColor = "PINK"
                            } else {
                                element.allapot = "fontos"
                                row.style.backgroundColor = "GREEN"
                            }
                            attman.mentes(att2)
                        }
                    }
                )
            }
        })





    })
}

function objectkereso(object, elementbenkeresendo, keresokifejezes) {
    let megvan = false
    let talalat = undefined
    object.forEach(function (element, index) {
        if (element[elementbenkeresendo] === keresokifejezes) {
            megvan = true
            let talalat = element
        }
    })
}

let searchengine = "google.com"
$("#searchselect").on('change', function () {
    searchengine = this.value
})
let stackhtml = ""
let googlehtml = ""

function kereso(szo, keresesengine, callback) {
    function mentettetekbenkereso(att, talalaturl) {
        let allapot = ""
        att.talalatok.forEach(function (element) {


            if (element.talalaturl == talalaturl) {
                console.log(talalaturl)

                if (element.allapot == "megnyitott") {
                    allapot = "megnyitott"
                } else if (element.allapot == "fontos") {
                    allapot = "fontos"
                }


            }
        })

        return allapot
    }
    let attman =new AttachmentManager({fileid, tipus: "research"})
    attman.betoltes(function (att) {
        let queryurl = ""
        if (keresesengine == "stack") {
            queryurl = "https://stackoverflow.com/search?q="
            $.get(queryurl + szo, function (html) {
                stackhtml = html
                var elements = $(html).find("div.question-summary.search-result")
                let talalatok = []

                elements.each(function (e) {
                    //console.log(this.innerText)
                    // $(this).find("vote-count-post ")
                    let votes = $(this).find(".vote-count-post strong")[0].innerText
                    let talalatcim = $(this).find(".result-link a")[0].title
                    let talalaturl = "https://stackoverflow.com" + $(this).find(".result-link a").attr("data-searchsession")
                    let allapot = mentettetekbenkereso(att, talalaturl)
                    console.log(allapot)
                    let talalat = {votes, talalatcim, talalaturl, allapot}

                    talalatok.push(talalat)

                })
                callback(talalatok)
            });
        } else if (keresesengine == "google.com") {
            queryurl = "https://www.google.hu/search?q="
            $.get(queryurl + szo, function (html) {
                googlehtml = html
                var elements = $(html).find("div.g")
                let talalatok = []
                elements.each(function (e) {
                    //console.log(this.innerText)
                    // $(this).find("vote-count-post ")
                    let talalatcim = ""
                    if ($(this).find("h3")[0]) {
                        talalatcim = $(this).find("h3")[0].innerText
                    }

                    let talalaturl = $(this).find("a")[0].href
                    let allapot = mentettetekbenkereso(att, talalaturl)
                    console.log(allapot)
                    // let talalatcim = $(this).find(".result-link a")[0].title
                    let talalat = {talalatcim, talalaturl, allapot}

                    talalatok.push(talalat)
                })
                callback(talalatok)
            });
        } else if (keresesengine == "mubi") {

            document.querySelector("#iframe").src = szo
            let talalatok = []
            window.addEventListener("message", function (message) {
                if (message.data.uzenettipus == "filmslist") {
                    talalatok = message.data.data
                    console.log("contentjsuzenet", message)
                }
                talalatok.forEach(function (element) {

                    element.allapot = mentettetekbenkereso(att, element.talalaturl)
                })

                callback(talalatok)

            })

        }
    })
}

document.querySelector("#search").addEventListener("click", function (e) {
    let keresesszoveg = document.querySelector("#searchtext").value
    kereso(keresesszoveg, searchengine, function (talalatok) {
        tablefrissito(talalatok, "#talalatoktable")

        let attman =new AttachmentManager({fileid, tipus: "research"})
        attman.betoltes(function (att) {
            if (att !== "error" || att !== "nincsattachment") {
                let att2 = att
                att2.kerdesek.forEach(function (element, index) {
                    if (element.kerdesid === aktualiskerdesid) {
                        if (!element.keresesek) {
                            att2.kerdesek[index].keresesek = []
                        }
                        let id = guidGenerator()
                        aktualiskeresesid = id
                        att2.aktualiskeresesid = id
                        att2.kerdesek[index].keresesek.unshift({
                            keresesid: id,
                            keresesszoveg: keresesszoveg,
                            keresesengine: searchengine,
                            datum: Date.now()
                        })
                        let keresesek = att2.kerdesek[index].keresesek
                        tablefrissito(keresesek, "#keresesektable")
                        attman.mentes(att2)
                    }
                })
            }
        })

    })
})

//------------------------------------------------------------------------------talalatoktable


/*
ablakInit("test","500px","500px",true,function () {
    let table=document.createElement("table")
    table.class="display compact"
    table.id="datatable"
    document.querySelector("#test").appendChild(table)

    let datatable = new ModulFiles("#datatable", 400)
})
*/


let basicstyletables = `#datatable2 tbody th, #datatable2 tbody td, #datatable tbody th, #datatable tbody td{ padding: 0px 0px;}`
var styleSheettables = document.createElement("style")
styleSheettables.type = "text/css"
styleSheettables.innerText = basicstyletables
document.head.appendChild(styleSheettables)