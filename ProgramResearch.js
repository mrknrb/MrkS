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
    db.get(fileid).then(function (doc) {


        console.log(doc)
        if (doc.tipus == "research") {
            details.detailsfrissito(doc._id)
            if (doc.data === undefined) {
                doc.data = {}
            } else {
                if (doc.data.aktualiskerdesid) {
                    aktualiskerdesid = doc.data.aktualiskerdesid
                    doc.data.kerdesek.forEach(function (element, index) {
                        if (element.kerdesid === aktualiskerdesid) {
                            if (!element.keresesek) {
                                doc.data.kerdesek[index].keresesek = []
                            }
                            let keresesek = doc.data.kerdesek[index].keresesek
                            keresesekbetolto(keresesek)
                        }
                    })
                } else {
                    keresesekbetolto()
                }
                if (doc.data.aktualiskeresesid) {

                    aktualiskeresesid = doc.data.aktualiskeresesid

                    doc.data.kerdesek.forEach(function (element, kerdesindex) {
                        if (element.kerdesid === aktualiskerdesid) {

                            element.keresesek.forEach(function (kereses, keresesindex) {
                                if (kereses.keresesid === aktualiskeresesid) {
                                    let talalatok = doc.data.kerdesek[kerdesindex].keresesek[keresesindex].talalatok
                                    talalatokbetolto(talalatok)
                                }
                            })
                        }
                    })
                } else {
                    talalatokbetolto()
                }

            }
            if (doc.data.kerdesek === undefined) {
                doc.data.kerdesek = []
            }
            kerdesekbetolto(doc.data.kerdesek)
            return db.put(doc);
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

    db.get(fileid).then(function (doc) {

        console.log("uuuu", doc)
        doc.data.kerdesek.unshift({kerdesid: guidGenerator(), kerdescim: kerdescim, datum: Date.now(), keresesek: []})

        tablefrissito(doc.data.kerdesek, "#kerdesektable")

        return db.put(doc)

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
        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element, index) {
                if (element.kerdesid === data.kerdesid) {
                    if (!element.keresesek) {
                        doc.data.kerdesek[index].keresesek = []
                    }
                    let keresesek = doc.data.kerdesek[index].keresesek
                    doc.data.aktualiskerdesid = data.kerdesid
                    aktualiskerdesid = data.kerdesid
                    tablefrissito(doc.data.kerdesek, "#kerdesektable")
                    tablefrissito(keresesek, "#keresesektable")
                    tablefrissito([], "#talalatoktable")
                    return db.put(doc);
                }
            })
        })

    })
    col[3].addEventListener("click", function (e) {
        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element, index) {
                console.log(index)
                console.log(element.kerdesid)
                if (element.kerdesid === data.kerdesid) {
                    let biztosan = confirm("Biztosan Torlod?");
                    if (biztosan) {
                        doc.data.kerdesek.splice(index, 1);
                        return db.put(doc);
                    }
                }
            })
            tablefrissito(doc.data.kerdesek, "#kerdesektable")
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
        });
    });
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


    col[2].appendChild(keresesszoveg)
    col[3].appendChild(datum)
    col[2].addEventListener("click", function (e) {
        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element, kerdesindex) {
                if (element.kerdesid === aktualiskerdesid) {
                    element.keresesek.forEach(function (kereses, keresesindex) {
                        if (kereses.keresesid === data.keresesid) {
                            aktualiskeresesid = data.keresesid
                            doc.data.aktualiskeresesid = data.keresesid
                            tablefrissito(doc.data.kerdesek[kerdesindex].keresesek, "#keresesektable")
                            tablefrissito(doc.data.kerdesek[kerdesindex].keresesek[keresesindex].talalatok, "#talalatoktable")
                            return db.put(doc);
                        }
                    })
                }
            })
        })

    })
    col[3].addEventListener("click", function (e) {

        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element, kerdesindex) {
                if (element.kerdesid === aktualiskerdesid) {
                    element.keresesek.forEach(function (kereses, keresesindex) {
                        if (kereses.keresesid === data.keresesid) {
                            let biztosan = confirm("Biztosan Torlod?");
                            if (biztosan) {

                                doc.data.kerdesek[kerdesindex].keresesek.splice(keresesindex, 1);
                                return db.put(doc);

                            }
                        }
                    })
                    tablefrissito(doc.data.kerdesek[kerdesindex].keresesek, "#keresesektable")
                }
            })

        });
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

    function talalatmodosito(modositandoadat, ertek) {
        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element) {
                if (element.kerdesid === aktualiskerdesid) {

                    element.keresesek.forEach(function (element2) {
                        if (element2.keresesid === aktualiskeresesid) {
                            console.log(element2)
                            element2.talalatok.forEach(function (element3) {
                                if (element3.talalatid === data.talalatid) {
                                    element3[modositandoadat] = ertek


                                    return db.put(doc);
                                }
                            })
                        }
                    })
                }
            })
        })
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
        if (data.allapot != "fontos") {
            talalatmodosito("allapot", "megnyitott")
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
        if (data.allapot == "fontos") {
            talalatmodosito("allapot", "megnyitott")
            data.allapot = "megnyitott"
            row.style.backgroundColor = "PINK"
        } else {
            data.allapot = "fontos"
            talalatmodosito("allapot", "fontos")
            row.style.backgroundColor = "GREEN"
        }
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

function kereso(szo, callback) {
    let queryurl = ""
    if (searchengine == "stack") {
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
                let talalatid = guidGenerator()
                let talalat = {talalatid, votes, talalatcim, talalaturl}

                talalatok.push(talalat)
            })
            callback(talalatok)
        });
    } else if (searchengine == "google.com") {
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
                // let talalatcim = $(this).find(".result-link a")[0].title
                let talalatid = guidGenerator()
                let talalat = {talalatid, talalatcim, talalaturl}

                talalatok.push(talalat)
            })
            callback(talalatok)
        });
    }else if(searchengine == "mubi"){
        let url = document.querySelector("#url").value
        document.querySelector("#iframe").src = url
        



    }
}

document.querySelector("#search").addEventListener("click", function (e) {
    let keresesszoveg = document.querySelector("#searchtext").value
    kereso(keresesszoveg, function (talalatok) {
        tablefrissito(talalatok, "#talalatoktable")
        db.get(fileid).then(function (doc) {
            doc.data.kerdesek.forEach(function (element, index) {
                if (element.kerdesid === aktualiskerdesid) {
                    if (!element.keresesek) {
                        doc.data.kerdesek[index].keresesek = []
                    }
                    let id = guidGenerator()
                    aktualiskeresesid = id
                    doc.data.aktualiskeresesid = id
                    doc.data.kerdesek[index].keresesek.unshift({
                        keresesid: id,
                        keresesszoveg: keresesszoveg,
                        talalatok: talalatok,
                        datum: Date.now()
                    })
                    let keresesek = doc.data.kerdesek[index].keresesek
                    tablefrissito(keresesek, "#keresesektable")
                    return db.put(doc);
                }
            })
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