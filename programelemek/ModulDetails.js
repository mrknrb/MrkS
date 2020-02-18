class Details extends MrkLibrary {
  constructor(selectors, beallitasok) {
    this.data.id = ""
    this.data.cim = ""
    this.data.kategoria = ""
    this.data.alkategoria = ""
    this.data.alalkategoria = ""
    this.data.rang = ""
    this.data.allapot = ""
    this.data.alkotasallapot = ""

    this.beallitasok.htmlpath = beallitasok.htmlpath
    this.beallitasok.db = beallitasok.db
    this.beallitasok.db7 = beallitasok.db7
    this.beallitasok.automatavalto = beallitasok.automatavalto
    this.beallitasok.detailsboxlathato = beallitasok.detailsboxlathato

    this.selectors.divcontainer = selectors.divcontainer
    if (beallitasok.divcontainerbebetoltes == true) {
      this.dombetolto()
    }

    this.selectors.textareamegjegyzes = selectors.texareamegjegyzes
    this.selectors.inputlistkategoria = selectors.inputlistkategoria
    this.selectors.datalistkategoria = selectors.datalistkategoria
    this.selectors.inputlistalkategoria = selectors.inputlistalkategoria
    this.selectors.datalistalkategoria = selectors.datalistalkategoria
    this.selectors.inputlistalalkategoria = selectors.inputlistalalkategoria
    this.selectors.datalistalalkategoria = selectors.datalistalalkategoria

    this.init()
    this.megjegyzeselozoido = 0
  }
  dombetolto() {
    let self = this

    function readTextFile(file) {
      var rawFile = new XMLHttpRequest()
      rawFile.open("GET", file, false)
      rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            document.querySelector(self.divcontainerselector).innerHTML = rawFile.responseText
          }
        }
      }

      rawFile.send(null)
    }
    readTextFile(self.htmlpath)
  }
  init() {
    self = this

    function tabbetoltindulas() {
      if (document.querySelector("#detailsdiv").className == "automatavalto") {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true
          },
          function(tabs) {
            frissito(tabs[0])
          }
        )
      }
    }

    function tabschangeeventlistener() {
      chrome.tabs.onActivated.addListener(function(activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function(Tab, tab) {
          frissito(Tab)
        })
      })
      chrome.tabs.onUpdated.addListener(function(tabId, ChangeInfo) {
        chrome.tabs.query(
          {
            lastFocusedWindow: true,
            active: true
          },
          function(tabs) {
            if (tabs[0] != undefined) {
              if (tabs[0].url === ChangeInfo.url) {
                chrome.tabs.get(tabId, function(Tab, tab) {
                  frissito(Tab)
                })
                setTimeout(() => {
                  chrome.tabs.get(tabId, function(Tab, tab) {
                    document.body.querySelector("#urlcim").value = Tab.title
                    // console.log(Tab)
                  })
                }, 1000)
              }
            }
          }
        )
      })
    }

    function detailseltunteto() {
      document.querySelector("#detailsboxopen").addEventListener("click", function(e) {
        if (self.detailsboxlathato == true) {
          document.querySelector("#detailsbox").style.display = "none"
          self.detailsboxlathato = false
        } else {
          document.querySelector("#detailsbox").style.display = "block"
          self.detailsboxlathato = true
        }
      })
    }

    if (this.automatavalto == true) {
      tabbetoltindulas()
      tabschangeeventlistener()
    }
    detailseltunteto()
  }

  detailsfrissito() {}
  allapotgenerator(allapot, datum) {
    if (allapot === undefined) {
      if (datumkora(datum, "days") <= 1) {
        return "uj"
      } else if (datumkora(datum, "days") <= 5) {
        return "inaktiv"
      } else {
        return "regi"
      }
    } else {
      return allapot
    }
  }

  allapotgenerator(allapot, datum) {
    if (allapot === undefined) {
      if (datumkora(datum, "days") <= 1) {
        return "uj"
      } else if (datumkora(datum, "days") <= 5) {
        return "inaktiv"
      } else {
        return "regi"
      }
    } else {
      return allapot
    }
  }
  adatbazisboladatfrissito = function(db, db7, url) {
    db.get(url, function(error, doc) {
      console.log(doc)
      document.body.querySelector("#urlteljes").textContent = doc._id
      document.body.querySelector("#urlmezo").value = doc._id //.trunc(80)
      document.body.querySelector("#urllogo").innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${doc._id}" width="20" height="20" class="favicon">`
      document.body.querySelector("#kategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
      document.body.querySelector("#alkategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
      document.body.querySelector("#alalkategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
      // console.log(doc.megjegyzes)

      if (doc.megjegyzes === undefined) {
        document.body.querySelector("#megjegyzesmezo").value = ""
        // console.log(doc.megjegyzes)
      } else {
        document.body.querySelector("#megjegyzesmezo").value = doc.megjegyzes
        // console.log(doc.megjegyzes)
      }
      if (doc.cim === undefined) {
        document.body.querySelector("#urlcim").value = ""
        // console.log(doc.megjegyzes)
      } else {
        document.body.querySelector("#urlcim").value = doc.cim
        // console.log(doc.megjegyzes)
      }
      if (doc.rang === undefined) {
        document.body.querySelector("#rang").value = ""
        // console.log(doc.megjegyzes)
      } else {
        document.body.querySelector("#rang").value = doc.rang
        // console.log(doc.megjegyzes)
      }
      document.body.querySelector("#allapot").value = allapotgenerator(doc.allapot, doc.datum)
      document.body.querySelector("#alkotasallapot").value = doc.alkotasallapot
      if (doc.kategoria === undefined) {
        document.body.querySelector("#kategoria").value = ""
      } else {
        document.body.querySelector("#kategoria").value = doc.kategoria
      }
      if (doc.alkategoria === undefined) {
        document.body.querySelector("#alkategoria").value = ""
      } else {
        document.body.querySelector("#alkategoria").value = doc.alkategoria
      }
      if (doc.alalkategoria === undefined) {
        document.body.querySelector("#alalkategoria").value = ""
      } else {
        document.body.querySelector("#alalkategoria").value = doc.alalkategoria
      }

      if (doc.tipus === undefined) {
        document.body.querySelector("#tipus").value = ""
      } else {
        document.body.querySelector("#tipus").value = doc.tipus
      }
      if (doc.datum === "") {
        document.body.querySelector("#datum").value = ""
      } else {
        document.body.querySelector("#datum").value = new Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        }).format(doc.datum)
      }
    })
  }
  frissito(Tab) {
    const url2 = new URL(Tab.url)
    document.body.querySelector("#urlteljes").textContent = Tab.url
    document.body.querySelector("#urlmezo").value = Tab.url //.trunc(80)
    document.body.querySelector("#urllogo").innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${Tab.url}" width="20" height="20" class="favicon">`
    document.body.querySelector("#urlcim").value = Tab.title
    db.get(Tab.url, function(error, doc) {
      if (error) {
        document.body.querySelector("#megjegyzesmezo").value = ""
        document.body.querySelector("#rang").value = ""
        document.body.querySelector("#allapot").value = ""
        document.body.querySelector("#alkotasallapot").value = ""
        chrome.windows.getCurrent(function(win) {
          db7
            .find({
              selector: {
                windowid: win.id
              }
            })
            .then(function(result) {
              //console.log("result.docs:", result.docs);
              if (result.docs != "") {
                db7.get(result.docs[0]._id).then(function(doc) {
                  if (doc.kategoria != undefined) {
                    document.body.querySelector("#kategoria").value = doc.kategoria
                  }
                  if (doc.alkategoria != undefined) {
                    document.body.querySelector("#alkategoria").value = doc.alkategoria
                  }
                  if (doc.alalkategoria != undefined) {
                    document.body.querySelector("#alalkategoria").value = doc.alalkategoria
                  }
                })
              }
            })
        })
        document.body.querySelector("#kategoria").value = ""
        document.body.querySelector("#alkategoria").value = ""
        document.body.querySelector("#alalkategoria").value = ""
        document.body.querySelector("#tipus").value = ""
        document.body.querySelector("#kategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
        document.body.querySelector("#alkategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
        document.body.querySelector("#alalkategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
        document.body.querySelector("#datum").value = ""
        // console.log(document.body.querySelector("#datum").innerText)
      } else {
        document.body.querySelector("#kategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
        document.body.querySelector("#alkategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
        document.body.querySelector("#alalkategoria").setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
        if (doc.cim === undefined) {
        } else {
          document.body.querySelector("#urlcim").value = doc.cim
        }

        if (doc.megjegyzes === undefined) {
          document.body.querySelector("#megjegyzesmezo").value = ""
        } else {
          document.body.querySelector("#megjegyzesmezo").value = doc.megjegyzes
        }
        if (doc.rang === undefined) {
          document.body.querySelector("#rang").value = ""
        } else {
          document.body.querySelector("#rang").value = doc.rang
        }
        document.body.querySelector("#allapot").value = allapotgenerator(doc.allapot, doc.datum)
        document.body.querySelector("#alkotasallapot").value = doc.alkotasallapot
        //document.body.querySelector("#kategoria").value = doc.kategoria
        if (doc.kategoria === undefined) {
          document.body.querySelector("#kategoria").value = ""
        } else {
          document.body.querySelector("#kategoria").value = doc.kategoria
        }
        if (doc.alkategoria === undefined) {
          document.body.querySelector("#alkategoria").value = ""
        } else {
          document.body.querySelector("#alkategoria").value = doc.alkategoria
        }
        if (doc.alkategoria === undefined) {
          document.body.querySelector("#alalkategoria").value = ""
        } else {
          document.body.querySelector("#alalkategoria").value = doc.alalkategoria
        }
        //document.body.querySelector("#tipus").value = doc.tipus
        if (doc.tipus === undefined) {
          document.body.querySelector("#tipus").value = ""
        } else {
          document.body.querySelector("#tipus").value = doc.tipus
        }
        if (doc.datum === "") {
          document.body.querySelector("#datum").value = ""
        } else {
          document.body.querySelector("#datum").value = new Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }).format(doc.datum)
        }
      }
    })
  }
}

document.getElementById("urlcim").addEventListener("change", function() {
  //console.log("change")
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      //  console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.cim = document.body.querySelector("#urlcim").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //  console.log(doc);
          })
      } else {
        // some other error
      }
    })
})

//chrome.tabs.query({active: true, currentWindow: true})
//`<img src="https://www.google.com/s2/favicons?domain=${Tab.url}" width="24" height="24" class="favicon">`
document.getElementById("rang").addEventListener("change", function() {
  let kategoriaseged = document.getElementById("kategoria").value
  let alkategoriaseged = document.getElementById("alkategoria").value
  let adatok = {}
  if (kategoriaseged != "" && alkategoriaseged != "" && alkategoriaseged != "") {
    adatok = {
      _id: document.querySelector("#urlteljes").textContent,
      rang: document.body.querySelector("#rang").value,
      cim: document.body.querySelector("#urlcim").value,
      kategoria: document.getElementById("kategoria").value,
      alkategoria: document.getElementById("alkategoria").value,
      alalkategoria: document.getElementById("alalkategoria").value,
      datum: Date.now()
    }
  } else if (kategoriaseged != "" && alkategoriaseged != "" && alalkategoriaseged == "") {
    adatok = {
      _id: document.querySelector("#urlteljes").textContent,
      rang: document.body.querySelector("#rang").value,
      cim: document.body.querySelector("#urlcim").value,
      kategoria: document.getElementById("kategoria").value,
      alkategoria: document.getElementById("alkategoria").value,
      datum: Date.now()
    }
  } else if (kategoriaseged != "" && alkategoriaseged == "" && alalkategoriaseged == "") {
    adatok = {
      _id: document.querySelector("#urlteljes").textContent,
      rang: document.body.querySelector("#rang").value,
      cim: document.body.querySelector("#urlcim").value,
      kategoria: document.getElementById("kategoria").value,
      datum: Date.now()
    }
  } else {
    adatok = {
      _id: document.querySelector("#urlteljes").textContent,
      rang: document.body.querySelector("#rang").value,
      cim: document.body.querySelector("#urlcim").value,
      datum: Date.now()
    }
  }
  db.put(adatok)
    .then(function() {
      //   console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.rang = document.body.querySelector("#rang").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //  console.log(doc);
          })
      } else {
        // some other error
      }
    })
})
document.getElementById("allapot").addEventListener("change", function() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    allapot: document.body.querySelector("#allapot").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      //   console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.allapot = document.body.querySelector("#allapot").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //  console.log(doc);
          })
      } else {
        // some other error
      }
    })
})
document.getElementById("alkotasallapot").addEventListener("change", function() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    alkotasallapot: document.body.querySelector("#alkotasallapot").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      //   console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.alkotasallapot = document.body.querySelector("#alkotasallapot").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //  console.log(doc);
          })
      } else {
        // some other error
      }
    })
})
document.getElementById("kategoria").addEventListener("mouseover", function() {
  //  console.log("ff")
  let kategoriaosszes = []
  db.find({
    selector: {
      kategoria: {
        $exists: true
      }
    },
    fields: ["kategoria"]
  })
    .then(function(result) {
      // console.log(result)
      // console.log(result.docs[0])
      result.docs.forEach(element => {
        element.kategoria
        // console.log(element.kategoria)
        kategoriaosszes.push(element.kategoria)
      })
      //console.log(kategoriaosszes)
      let kategoriaarray = kategoriaosszes.filter(function(item, pos) {
        return kategoriaosszes.indexOf(item) == pos
      })

      // kategoriaarray.sort()

      var select = document.getElementById("kategorialista")
      $("#kategorialista").empty()
      //select.children().remove();
      for (var i = 0; i < kategoriaarray.length; i++) {
        var opt = kategoriaarray[i]
        var el = document.createElement("option")
        el.textContent = opt
        el.value = opt
        select.appendChild(el)
      }
    })
    .catch(function(err) {
      //console.log(err);
    })
})

function kategoriamento() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    kategoria: document.body.querySelector("#kategoria").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      // console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.kategoria = document.body.querySelector("#kategoria").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //console.log(doc);
          })
      } else {
        // some other error
      }
    })
}
document.getElementById("kategoria").addEventListener("change", function() {
  kategoriamento()
})
document.getElementById("alkategoria").addEventListener("mouseover", function() {
  //  console.log("ff")
  let alkategoriaosszes = []
  db.find({
    selector: {
      alkategoria: {
        $exists: true
      }
    },
    fields: ["kategoria", "alkategoria"]
  })
    .then(function(result) {
      // console.log(result)
      // console.log(result.docs[0])
      result.docs.forEach(element => {
        if (element.kategoria === document.querySelector("#kategoria").value) {
          alkategoriaosszes.push(element.alkategoria)
        }
      })
      let alkategoriaarray = alkategoriaosszes.filter(function(item, pos) {
        return alkategoriaosszes.indexOf(item) == pos
      })
      var select = document.getElementById("alkategorialista")
      $("#alkategorialista").empty()
      //select.children().remove();
      for (var i = 0; i < alkategoriaarray.length; i++) {
        var opt = alkategoriaarray[i]
        var el = document.createElement("option")
        el.textContent = opt
        el.value = opt
        select.appendChild(el)
      }
    })
    .catch(function(err) {
      //console.log(err);
    })
})

function alkategoriamento() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    alkategoria: document.body.querySelector("#alkategoria").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      // console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.alkategoria = document.body.querySelector("#alkategoria").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //console.log(doc);
          })
      } else {
        // some other error
      }
    })
}
document.getElementById("alkategoria").addEventListener("change", function() {
  alkategoriamento()
})
document.getElementById("alalkategoria").addEventListener("mouseover", function() {
  //  console.log("ff")
  let alalkategoriaosszes = []
  db.find({
    selector: {
      alalkategoria: {
        $exists: true
      }
    },
    fields: ["kategoria", "alkategoria", "alalkategoria"]
  })
    .then(function(result) {
      // console.log(result)
      // console.log(result.docs[0])
      result.docs.forEach(element => {
        if (document.querySelector("#kategoria").value === element.kategoria && document.querySelector("#alkategoria").value === element.alkategoria) {
          alalkategoriaosszes.push(element.alalkategoria)
        }
      })
      let alalkategoriaarray = alalkategoriaosszes.filter(function(item, pos) {
        return alalkategoriaosszes.indexOf(item) == pos
      })
      var select = document.getElementById("alalkategorialista")
      $("#alalkategorialista").empty()
      //select.children().remove();
      for (var i = 0; i < alalkategoriaarray.length; i++) {
        var opt = alalkategoriaarray[i]
        var el = document.createElement("option")
        el.textContent = opt
        el.value = opt
        select.appendChild(el)
      }
    })
    .catch(function(err) {
      //console.log(err);
    })
})

function alalkategoriamento() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    alalkategoria: document.body.querySelector("#alalkategoria").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      // console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.alalkategoria = document.body.querySelector("#alalkategoria").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            //console.log(doc);
          })
      } else {
        // some other error
      }
    })
}
document.getElementById("alalkategoria").addEventListener("change", function() {
  alalkategoriamento()
})
document.getElementById("tipus").addEventListener("mouseover", function() {
  let tipusosszes = []
  db.find({
    selector: {
      tipus: {
        $exists: true
      }
    },
    fields: ["tipus"]
  })
    .then(function(result) {
      //console.log(result)
      // console.log(result.docs[0])
      result.docs.forEach(element => {
        element.tipus
        //console.log(element.tipus)
        tipusosszes.push(element.tipus)
      })
      //console.log(tipusosszes)
      let tipusarray = tipusosszes.filter(function(item, pos) {
        return tipusosszes.indexOf(item) == pos
      })
      var select = document.getElementById("tipuslista")
      $("#tipuslista").empty()
      //select.children().remove();
      for (var i = 0; i < tipusarray.length; i++) {
        var opt = tipusarray[i]
        var el = document.createElement("option")
        el.textContent = opt
        el.value = opt
        select.appendChild(el)
      }
    })
    .catch(function(err) {
      console.log(err)
    })
})
document.getElementById("tipus").addEventListener("change", function() {
  db.put({
    _id: document.querySelector("#urlteljes").textContent,
    tipus: document.body.querySelector("#tipus").value,
    cim: document.body.querySelector("#urlcim").value,
    datum: Date.now()
  })
    .then(function() {
      //console.log("success")
      // success
    })
    .catch(function(err) {
      if (err.name === "conflict") {
        // console.log("modify")
        db.get(document.querySelector("#urlteljes").textContent)
          .then(function(doc) {
            // update their age
            doc.tipus = document.body.querySelector("#tipus").value
            // put them back
            return db.put(doc)
          })
          .then(function() {
            // fetch mittens again
            return db.get("NodesNet")
          })
          .then(function(doc) {
            console.log(doc)
          })
      } else {
        // some other error
      }
    })
})

document.getElementById("torlesgomb").addEventListener("click", function() {
  db.get(document.getElementById("urlteljes").textContent).then(function(doc) {
    return db.remove(doc)
  })
  setTimeout(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function(tabs) {
        frissito(tabs[0])
      }
    )
  }, 50)
})

document.getElementById("jegyzetgomb").addEventListener("click", function() {
  chrome.windows.getCurrent(function(win) {
    db7
      .find({
        selector: {
          windowid: win.id
        }
      })
      .then(function(result) {
        let doc = result.docs[0]
        console.log("result:", result)

        let jegyzetadatok = {}
        jegyzetadatok._id = jegyzetguidGenerator()
        if (result.docs[0] != undefined) {
          if (doc.kategoria != undefined) {
            jegyzetadatok.kategoria = doc.kategoria
            document.body.querySelector("#kategoria").value = doc.kategoria
          }
          if (doc.alkategoria != undefined) {
            jegyzetadatok.alkategoria = doc.alkategoria
            document.body.querySelector("#alkategoria").value = doc.alkategoria
          }
          if (doc.alalkategoria != undefined) {
            jegyzetadatok.alalkategoria = doc.alalkategoria
            document.body.querySelector("#alalkategoria").value = doc.alalkategoria
          }
        }
        jegyzetadatok.datum = Date.now()

        db.put(jegyzetadatok).then(function(doc) {
          adatbazisboladatfrissito(db, jegyzetadatok._id)
        })
      })
  })
})
function inputeventmentoinit() {
  let self = this
  let s = this.selectors
  function eventlistenerinit(selectortype, selector, eventtype) {
    document.querySelector(selector).addEventListener(eventtype, function(e) {
      let data = {}
      data._id = self.data.id
      data[selectortype] = document.body.querySelector(selector).value
      if (self.data.cim != undefined) {
        data.cim = self.data.cim
      }
      data.datum = Date.now()
      self.db.put(data).catch(function(err) {
        if (err.name === "conflict") {
          db.get(self.data.id).then(function(doc) {
            doc[selectortype] = document.body.querySelector(selector).value
            return db.put(doc)
          })
        }
      })
    })
  }
  function szovegeventlistenerinit(selectortype, selector, eventtype) {
    document.querySelector(selector).addEventListener("keyup", function() {
      let megjegyzeskovetkezoido = Date.now()
      self.megjegyzeselozoido = megjegyzeskovetkezoido

      function megjegyzesmento() {
        let kategoriaseged = document.querySelector(s.inputlistkategoria).value
        let alkategoriaseged = document.querySelector(s.inputlistalkategoria).value
        let alalkategoriaseged = document.querySelector(s.inputlistalalkategoria).value
        let adatok = {}
        adatok._id = self.data.id
        adatok[selectortype] = document.querySelector(selector).value
        if (kategoriaseged != "") {
          adatok.kategoria = kategoriaseged
        }
        if (alkategoriaseged != "") {
          adatok.alkategoria = alkategoriaseged
        }
        if (alalkategoriaseged != "") {
          adatok.alalkategoria = alalkategoriaseged
        }
        adatok.datum = Date.now()
        db.put(adatok).catch(function(err) {
          if (err.name === "conflict") {
            db.get(self.data.id).then(function(doc) {
              doc[selectortype] = document.querySelector(selector).value
              return db.put(doc)
            })
          }
        })
      }
      setTimeout(() => {
        if (megjegyzeskovetkezoido - megjegyzeselozoido == 0) {
          megjegyzesmento()
        }
      }, 1000)
    })

    document.querySelector(selector).addEventListener(eventtype, function(e) {
      let data = {}
      data._id = self.data.id
      data[selectortype] = document.body.querySelector(selector).value
      if (self.data.cim != undefined) {
        data.cim = self.data.cim
      }
      data.datum = Date.now()
      self.db.put(data).catch(function(err) {
        if (err.name === "conflict") {
          db.get(self.data.id).then(function(doc) {
            doc[selectortype] = document.body.querySelector(selector).value
            return db.put(doc)
          })
        }
      })
    })
  }
  if (self.selectors.textaremegjegyzes != undefined) {
    let eventtype = "change"

    szovegeventlistenerinit("kategoria", self.selectors.inputlistkategoria, eventtype)
  }
  if (self.selectors.inputlistkategoria != undefined) {
    let eventtype = "change"
    eventlistenerinit("kategoria", self.selectors.inputlistkategoria, eventtype)
  }
  if (self.selectors.inputlistalkategoria != undefined) {
    let eventtype = "change"
    eventlistenerinit(self.selectors.inputlistalkategoria, eventtype)
  }
  if (self.selectors.inputlistalalkategoria != undefined) {
    let eventtype = "change"
    eventlistenerinit(self.selectors.inputlistalalkategoria, eventtype)
  }
  if (self.selectors.inputlistalalkategoria != undefined) {
    let eventtype = "change"
    eventlistenerinit(self.selectors.inputlistalalkategoria, eventtype)
  }
}
function adatoklekerdezo(params) {
  let s = this.selectors
  this.data.id = document.querySelector(s.textareamegjegyzes).value
  this.data.cim = document.querySelector(s.textareamegjegyzes).value
  this.data.megjegyzes = document.querySelector(s.textareamegjegyzes).value
  this.data.kategoria = ""
  this.data.alkategoria = ""
  this.data.alalkategoria = ""
  this.data.tipus = ""
  this.data.allapot = ""
  this.data.alkotasallapot = ""
  this.data.rang = ""
  this.data.datum = ""

  this.selectors.textareamegjegyzes = selectors.textareamegjegyzes
  this.selectors.inputlistkategoria = selectors.inputlistkategoria
  this.selectors.datalistkategoria = selectors.datalistkategoria
  this.selectors.inputlistalkategoria = selectors.inputlistalkategoria
  this.selectors.datalistalkategoria = selectors.datalistalkategoria
  this.selectors.inputlistalalkategoria = selectors.inputlistalalkategoria
  this.selectors.datalistalalkategoria = selectors.datalistalalkategoria
}
/*
id
megjegyzes
cim
kategoria 
alkategoria
alalkategoria
tipus
allapot
alkotasallapot
rang
datum




*/
