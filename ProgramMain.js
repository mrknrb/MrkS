mrklibraryscrollbareltunteto()

var db = new PouchDB("NodesNet", {
  auto_compaction: true
})
var db2 = new PouchDB("FileNet", {
  auto_compaction: true
})
var db7 = new PouchDB("SessionsNet", {
  auto_compaction: true
})

let session = new Sessions("#sessionname")

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
