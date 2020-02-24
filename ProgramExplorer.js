scrollbareltunteto()

let db = new PouchDB("NodesNet", {
    auto_compaction: true
})
let db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})



let tabstablemagassag = 348;
let databasemagassag = 348;
let eszkoz = eszkozdetektalo();
if(eszkoz=="android"){
var dbremote = new PouchDB(
    "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db"
);
var db7remote = new PouchDB(
    "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db7"
);

function start2() {
    db.sync(dbremote);

    db7.sync(db7remote);

    setTimeout(start2, 10000);
}

start2();
}

// eszkoz = "android";




let detailsselectors = {
    divcontainer: "#detailsdiv"
}
let detailsbeallitasok = {
    db: db,
    db7: db7,
    htmlpath: "programelemek/details.html",
    automatavalto: true,
    detailsboxlathato: true,
    divcontainerbebetoltes: true
}
let details = new ModulDetails( detailsselectors, detailsbeallitasok)

let sessionselectors={
    divselector:"#tabstablediv",
    tableselector:"#tabstable"
}
let sessionbeallitasok={
    magassag:tabstablemagassag
}
let session = new ModulSessions(sessionselectors, sessionbeallitasok)
//let datatable = new ModulFiles("#datatablediv", "datatable", databasemagassag)

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

        basicstyletables = `#example tbody th, #example tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 0px 0px;}`;
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

        basicstyletables = `#example tbody th, #example tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 0px 0px;}`;
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
        basicstyletables = `#example tbody th, #example tbody td, #tabstable tbody th, #tabstable tbody td{ padding: 8px 10px;}`;
    }
    var styleSheettables = document.createElement("style");
    styleSheettables.type = "text/css";
    styleSheettables.innerText = basicstyletables;
    document.head.appendChild(styleSheettables);
}

//stylebeallitasok();