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
    automatavalto: false,
    divcontainerbebetoltes: true,
    manualtipus: "link"
}
let details = new ModulDetails(detailsselectors, detailsbeallitasok)
elementhider("#detailsboxopen", "#detailsdiv")

let fileid = ""
if (window.frameElement.getAttribute("fileid")!="undefined") {
   fileid= window.frameElement.getAttribute("fileid")
    details.detailsfrissito(fileid)
}

let tabid = ""
if (window.frameElement.getAttribute("tabid")!=undefined) {
    tabid= window.frameElement.getAttribute("tabid")

}

setTimeout(() => {
    if(window.frameElement.getAttribute("browsercim")!=""&&document.querySelector("#urlcim").value==""){
        document.querySelector("#urlcim").value = window.frameElement.getAttribute("browsercim")
    }
}, 100)
document.querySelector("#iframe").src = fileid
document.querySelector("#urlmezo2").value = fileid
document.querySelector("#urlmezo2").addEventListener("change", function (e) {
    document.querySelector("#iframe").src = document.querySelector("#urlmezo2").value
    fileid = document.querySelector("#urlmezo2").value
    details.detailsfrissito(fileid)
    tabvaltozasmentes()
})
let cim=""
window.addEventListener("message", function (message) {
    console.log(message)
    if (message.data.uzenettipus == "oldalurl") {
        fileid= message.data.url
        cim= message.data.cim
        document.querySelector("#urlmezo2").value=fileid
        details.detailsfrissito(fileid)

        tabvaltozasmentes()
    }


})
function tabvaltozasmentes(){


    getActualSession(function (session) {
        db7
            .get(session._id)
            .then(function (doc) {
                if (doc.programs == undefined) {
                    doc.programs = []
                }
                doc.programs.forEach(function (program, i) {
                    console.log(program.fileid)

                    if (program.programtabid == tabid) {
                        //  program.fileid=fileid

                        console.log(fileid)
                        console.log(program.fileid)
                        doc.programs[i].fileid = fileid
                        doc.programs[i].forcetipus = "browser"
                        doc.programs[i].cim = cim
                        document.querySelector("#urlcim").value=cim
                        return db7.put(doc);
                    }

                })


            })
            .catch(function (error) {
                console.log(error)
            })
    })

}



details.detailsmentesevent(function () {
    tabvaltozasmentes()
})
