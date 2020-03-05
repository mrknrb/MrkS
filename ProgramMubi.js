let db = new PouchDB("NodesNet", {
    auto_compaction: true
})
let db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})

let detailsselectors = {
    divcontainer: "#detailsdiv",
}
let detailsbeallitasok = {
    automatavalto: true,
    divcontainerbebetoltes: true,
    manualtipus: "film"
}
let details = new ModulDetails(detailsselectors, detailsbeallitasok)
let fileid = window.frameElement.getAttribute("fileid")
if (fileid != undefined) {
    db.get(fileid, {attachments: true}).then(function (doc) {

        details.detailsfrissito(doc._id)

    });
}
elementhider("#detailsboxopen", "#detailsdiv")

db.get(fileid, {attachments: true}).then(function (doc) {

    if (doc._attachments == undefined) {
        let data = {}
        data.filmslist = []
        doc._attachments = {}
        doc._attachments.att = {}
        doc._attachments.att.content_type = "text/plain"
        doc._attachments.att.data = btoa(JSON.stringify(data))
        return db.put(doc);
    } else if (doc._attachments.att == undefined) {
        let data = {}
        data.filmslist = []
        doc._attachments.att = {}
        doc._attachments.att.data = btoa(JSON.stringify(data))
        return db.put(doc);
    }

})
document.querySelector("#megnyitas").addEventListener("click", function (e) {
    let url = document.querySelector("#url").value

    document.querySelector("#iframe").src = url
    //todo mentse el a keresés adatait
    /*
    db.get(fileid, {attachments: true}).then(function (doc) {

       if(!doc._attachments.att.keresesek){
            doc._attachments.att.keresesek=[]}

        doc._attachments.att.keresesek.push(btoa(JSON.stringify(url)))
            return db.put(doc);

})
    */
})

document.querySelector("#uzenet").addEventListener("click", function (e) {


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
let filmslist = []
window.addEventListener("message", function (message) {
        if (message.data.uzenettipus == "filmslist") {
            filmslist = message.data.data
            console.log("contentjsuzenet", message)
            db.get(fileid, {attachments: true}).then(function (doc) {
                if (doc.tipus == "mubi" && doc._attachments.att.data != undefined) {
                    console.log(JSON.parse(atob(doc._attachments.att.data)))
                    let filmschecklist = JSON.parse(atob(doc._attachments.att.data))
                    db.allDocs({
                        include_docs: true,
                    }).then(function (result) {
                        let mentettfilmek = []
                        result.rows.forEach(function (element) {
                            if (element.doc.tipus == "film") {
                                mentettfilmek.push(element)


                            }
                        })
                        console.log(mentettfilmek)
                        let adattablafilmek = []
                        filmslist.forEach(function (film1) {
                            film1.allapot="ismeretlen"
                            let bennevan = false
                            filmschecklist.filmslist.forEach(function (film3) {
                                if (film1.url == film3.url) {
                                    bennevan = true
                                    film1.allapot="checkolva"
                                }
                            })
                            mentettfilmek.forEach(function (film2) {

                                console.log(film2.id)
                                console.log(film1.url)
                                if (film1.url.toString == film2.id) {

                                    bennevan = true
                                    film1.allapot="mentve"
                                }
                            })

                            adattablafilmek.push(film1)
                        })

                        console.log(adattablafilmek)


                        $("#filmeklistatabla")
                            .dataTable()
                            .fnClearTable();
                        $("#filmeklistatabla")
                            .dataTable()
                            .fnAddData(adattablafilmek);


                    })
                }
            });
        }
    }


    , false)


let columns = [
    {
        title: "",
        defaultContent: ""
    },
    {
        title: "",
        defaultContent: ""
    },
    {
        title: "",
        defaultContent: ""
    },
    {
        title: "",
        defaultContent: ""
    }
];
let columndefs = [
    {
        width: 20,
        targets: [0, 3]
    },
    {
        width: "40%",
        targets: [1, 2]
    }
];


// Setup - add a text input to each footer cell
$(document).ready(function () {
    $("#filmeklistatabla").DataTable({
        initComplete: function () {

        },
        deferRender: true,
        scroller: {
            displayBuffer: 1.6,
            loadingIndicator: true,
            boundaryScale: 0.5
        },
        scrollY: 450,
        searching: false,
        ordering: false,
        paging: true, //kell a scrollerhez
        pageLength: 50,
        info: false,
        retrieve: true, //az elején el?jöv? bug ellen lehet, hogy jó most tesztelem  https://datatables.net/manual/tech-notes/3

        data: [],
        columns: columns,
        columnDefs: columndefs,
        createdRow: function (row, data, dataIndex) {
            let helyezes = document.createElement("b")
            helyezes.style.userSelect = "none"
            helyezes.innerText = data.pos

            let cim3 = document.createElement("b")
            cim3.style.userSelect = "none"
            cim3.innerText = data.title

            let rendezo = document.createElement("b")
            rendezo.style.userSelect = "none"
            rendezo.innerText = data.rendezo

            let datum = document.createElement("b")
            datum.style.userSelect = "none"
            datum.innerText = data.datum


            let col = row.querySelectorAll("td");
            col[0].appendChild(helyezes)
            col[1].appendChild(cim3)
            col[2].appendChild(rendezo)
            col[3].appendChild(datum)


            if(data.allapot=="checkolva" ){
            row.style.backgroundColor = "PINK"}else if(data.allapot=="mentve"){
                row.style.backgroundColor = "GREEN"
            }



            col[1].addEventListener("click", function (e) {

                chrome.tabs.query(
                    {
                        active: true,
                        currentWindow: true
                    },
                    function (tabs) {
                        chrome.tabs.update(tabs[0].id, {url: data.url, active: true})
                    })

                db.get(fileid, {attachments: true}).then(function (doc) {


                    let data3 = JSON.parse(atob(doc._attachments.att.data))
                    let megvan = false
                    data3.filmslist.forEach(function (film4) {
                        if (data.url == film4.url) {
                            megvan = true

                        }
                    })
                    if (!megvan) {
                        data3.filmslist.push(data)
                        doc._attachments.att.data = btoa(JSON.stringify(data3))
                        return db.put(doc);
                    }

                })


                row.style.backgroundColor = "PINK"


            })

        }
    });
});

