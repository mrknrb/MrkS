scrollbareltunteto()

let db = new PouchDB("NodesNet", {
    auto_compaction: true
})
let db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})


let tabstablemagassag = 348;
let databasemagassag = 348;

function stylebeallitasok1() {
    if (eszkoz == "sidebar") {
        tabstablemagassag = 330;
        databasemagassag = 330;
    } else if (eszkoz == "tab") {
        tabstablemagassag = 250;
        databasemagassag = 500;

    } else if (eszkoz == "android") {
        tabstablemagassag = 330;
        databasemagassag = 330;
    }
}

stylebeallitasok1();
//----------------------------------------------------------------------------------------------------------------------Details
let detailsselectors = {
    divcontainer: "#detailsdiv",
}
let detailsbeallitasok = {
    automatavalto: true,
    divcontainerbebetoltes: true
}
let details = new ModulDetails(detailsselectors, detailsbeallitasok)
//--------------------------------------------------------------------------------------------------------------------------Sessions
let session = new ModulSessions("#tabstable", tabstablemagassag)
//----------------------------------------------------------------------------------------------------------------------Database
let datatable = new ModulFiles("#datatable", databasemagassag,"#kategoriaszurodiv")

datatable.rowclickevent(function (id) {
    details.detailsfrissito(id)
})
document.querySelector("#szuromentes").addEventListener("click", function (e) {
    datatable.sessionkategoriamento()
})

document.querySelector("#datatablefrissites").addEventListener("click", function (e) {
    datatable.datatablefrissitobetolto()
})

document.querySelector("#keresoszo").addEventListener("keyup", function () {

    let megjegyzeskovetkezoido = Date.now()
    self.megjegyzeselozoido = megjegyzeskovetkezoido
    setTimeout(() => {
        if (megjegyzeskovetkezoido - self.megjegyzeselozoido === 0) {

            datatable.datatablefrissitobetolto(document.querySelector("#keresoszo").value)
        }
    }, 50)
})

//--------------------------------------------------------------------------------------------------------------------
function stylebeallitasok() {
    let basicstyletables = "";
    if (eszkoz == "sidebar") {
        tabstablemagassag = 330;
        databasemagassag = 330;
        document
            .querySelector("#detailsbox")
            .setAttribute(
                "style",
                " min-width: 385px;     width:100%;      margin:0;      padding:0 ;      min-width: 385px;      overflow-x: hidden;    overflow-y: auto;      height: 132px"
            );

        document
            .querySelector("#megjegyzesmezo")
            .setAttribute("style", "height:120px;width:100%");

        basicstyletables = `#datatable tbody th, #datatable tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 0px 0px;}`;
    } else if (eszkoz == "tab") {
        document
            .querySelector("#megjegyzesmezo")
            .setAttribute("style", "height:200px;width:100%");

        document
            .querySelector("#detailsdiv")
            .setAttribute("style", "width:500px;float:left;margin-right:10px");

        document
            .querySelector("#detailsbox")
            .setAttribute("style", "height:100%;width:100%");
        tabstablemagassag = 250;
        databasemagassag = 500;

        basicstyletables = `#datatable tbody th, #datatable tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 0px 0px;}`;
    } else if (eszkoz == "android") {
        tabstablemagassag = 330;
        databasemagassag = 330;
        document
            .querySelector("#detailsbox")
            .setAttribute(
                "style",
                " min-width: 385px;     width:100%;      margin:0;      padding:0 ;      min-width: 385px;      overflow-x: hidden;    overflow-y: auto;      height: 132px"
            );

        document
            .querySelector("#megjegyzesmezo")
            .setAttribute("style", "height:120px;width:100%");
        document
            .querySelector("#tabstablediv")
            .setAttribute("style", "display:none");

        basicstyletables = `#datatable tbody th, #datatable tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 8px 10px;}`;
    }
    var styleSheettables = document.createElement("style");
    styleSheettables.type = "text/css";
    styleSheettables.innerText = basicstyletables;
    document.head.appendChild(styleSheettables);
}

stylebeallitasok();
elementhider("#detailsboxopen", "#detailsdiv")
elementhider("#tabstableopen", "#tabstablediv")

inputsuggestionoff()
