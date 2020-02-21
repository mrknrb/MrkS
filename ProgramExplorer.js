mrklibraryscrollbareltunteto()

var db = new PouchDB("NodesNet", {
  auto_compaction: true
})
var db7 = new PouchDB("SessionsNet", {
  auto_compaction: true
})


let sessionselectors={


}

let session = new Sessions()

let selectors = {
  divcontainer: "#detailsdiv",
  textareamegjegyzes: "#megjegyzesmezo",
  inputlistkategoria: "#kategoria",
  inputlistalkategoria: "#alkategoria",
  inputlistalalkategoria: "#alalkategoria"
}

let beallitasok = {
  db: db,
  db7: db7,
  htmlpath: "programelemek/details.html",
  automatavalto: true,
  detailsboxlathato: true,
  divcontainerbebetoltes: true
}
let details = new Details(data, selectors, beallitasok)


let tabstablemagassag = 348;
let databasemagassag = 348;
let eszkoz = eszkozdetektalo();
//let eszkoz = "android";

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
stylebeallitasok();


    let session = new Sessions(data, selectors, beallitasok)
