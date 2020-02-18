class Sessions extends MrkLibrary {
  constructor(sessionciminputtextselector) {
    this.sessionaktualis = sessioncimkiiras;
    this.sessionciminputtextselector = document.querySelector(
      sessionciminputtextselector
    );
  }

  kartyahattergenerator(rang, tipus) {
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
}

let tabstablemagassag = 348;
let databasemagassag = 348;
let eszkoz = eszkozdetektalo();
//let eszkoz = "android";
let aktivwindowid = 0;
let kategoriaszuro = undefined;
let alkategoriaszuro = undefined;
let alalkategoriaszuro = undefined;
let tabstablelathato = true;
let examplebetoltve = false;
let pageScrollPos = 0;
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

function sessiondelete(win, result) {
  document
    .querySelector("#sessiondelete")
    .addEventListener("click", function(e) {
      let biztosan = confirm("Biztosan Torlod?");
      if (biztosan) {
        let tabids = [];
        win.tabs.forEach(tab => {
          tabids.push(tab.id);
        });
        chrome.tabs.remove(tabids, function(params) {});
        db7.get(result.docs[0]._id).then(function(doc) {
          return db7.remove(doc);
        });
      }
    });
}

function sessioncimvaltozas() {
  document
    .querySelector("#sessionname")
    .addEventListener("change", function(params) {
      if (eszkoz != "android") {
        chrome.windows.getCurrent(function(win) {
          db7
            .find({
              selector: {
                windowid: win.id
              }
            })
            .then(function(result) {
              db7.get(result.docs[0]._id).then(function(doc) {
                doc.cim = document.querySelector("#sessionname").value;
                return db7.put(doc);
              });
            });
        });
      } else {
        db7
          .find({
            selector: {
              windowid: aktivwindowid
            }
          })
          .then(function(result) {
            db7.get(result.docs[0]._id).then(function(doc) {
              doc.cim = document.querySelector("#sessionname").value;
              return db7.put(doc);
            });
          });
      }
    });
}

function sessioncolor(result) {
  let sessioncolor = document.querySelector("#sessioncolor");

  if (result == undefined) {
    sessioncolor.value = "#a0bdd8";
  } else {
    if (result.docs[0].color == null) {
      sessioncolor.value = "#a0bdd8";
    } else {
      sessioncolor.value = result.docs[0].color;
    }
  }
  document
    .querySelector("body")
    .setAttribute(
      "style",
      "background-color:" + document.querySelector("#sessioncolor").value
    );
  // betölti a sessioncolort pipa

  document
    .querySelector("#sessioncolor")
    .addEventListener("change", function(params) {
      document
        .querySelector("body")
        .setAttribute(
          "style",
          "background-color:" + document.querySelector("#sessioncolor").value
        );

      if (eszkoz != "android") {
        chrome.windows.getCurrent(function(win) {
          db7
            .find({
              selector: {
                windowid: win.id
              }
            })
            .then(function(result) {
              db7.get(result.docs[0]._id).then(function(doc) {
                doc.color = document.querySelector("#sessioncolor").value;
                return db7.put(doc);
                //lementi a sessioncolort, ha megváltoztatod
              });
            });
        });
      } else {
        db7
          .find({
            selector: {
              windowid: aktivwindowid
            }
          })
          .then(function(result) {
            db7.get(result.docs[0]._id).then(function(doc) {
              doc.color = document.querySelector("#sessioncolor").value;
              return db7.put(doc);
              //lementi a sessioncolort, ha megváltoztatod
            });
          });
      }
    });
}
//todo nem torli a mobilon az adatot(nem jön fel a confirm)
function vegyesbetolto() {
  db7
    .find({
      selector: {
        _id: "jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b"
      }
    })
    .then(function(result) {
      sessionname.value = result.docs[0].cim;
      if (eszkoz != "android") {
        chrome.windows.getCurrent(
          {
            populate: true
          },
          function(win) {
            db7.get(result.docs[0]._id).then(function(doc) {
              doc.windowid = win.id;
              return db7.put(doc);
            });

            sessiondelete(win, result);
            sessioncimvaltozas();
            sessioncolor(result);
            sessiontabsfrissito();
            adattablafrissitobetolto();
          }
        );
      } else {
        aktivwindowid = result.docs[0].windowid;
        sessioncimvaltozas();
        sessioncolor(result);
        sessiontabsfrissito();
        adattablafrissitobetolto();
      }
    });
}

if (eszkoz != "android") {
  chrome.windows.getCurrent(
    {
      populate: true
    },
    function(win) {
      db7
        .find({
          selector: {
            windowid: win.id
          }
        })
        .then(function(result) {
          if (result == undefined || result.docs[0] == undefined) {
            vegyesbetolto();
          } else {
            sessionname.value = result.docs[0].cim;
            sessiondelete(win, result);
            sessioncimvaltozas();
            sessioncolor(result);
            kategoriaszuro = result.docs[0].kategoria;
            alkategoriaszuro = result.docs[0].alkategoria;
            alalkategoriaszuro = result.docs[0].alalkategoria;
            adattablafrissitobetolto();
          }

          //a window cím mező, ha megváltozik, akkor azt mentse a megfelelő winidre pipa
        });
    }
  );
} else {
  vegyesbetolto();
}

let adattablafrissitobetolto = function() {
  let selector = {};
  selector.datum = {};
  let fields = [];
  fields.push("datum");
  selector.datum.$gte = null;
  if (kategoriaszuro != undefined && kategoriaszuro != "") {
    selector.kategoria = kategoriaszuro;
    fields.push("kategoria");
  }
  if (alkategoriaszuro != undefined && alkategoriaszuro != "") {
    selector.alkategoria = alkategoriaszuro;
    fields.push("alkategoria");
  }
  if (alalkategoriaszuro != undefined && alalkategoriaszuro != "") {
    selector.alalkategoria = alalkategoriaszuro;
    fields.push("alalkategoria");
  }

  db.createIndex({
    index: {
      fields: fields
    }
  })
    .then(function() {
      return db.find({
        selector: selector,
        sort: [{ datum: "desc" }]
      });
    })
    .then(function(result) {
      if (examplebetoltve == false) {
        examplebetolto(result);
      } else {
        console.log(result);
        $("#example")
          .dataTable()
          .fnClearTable();
        $("#example")
          .dataTable()
          .fnAddData(result.docs);
      }
    });
};
//csak azért, hogy gyorsabban betöltsön
adattablafrissitobetolto();
$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $("#tabstable").DataTable({
    initComplete: function() {
      let tabsfrissitobutton = document.createElement("button");
      tabsfrissitobutton.type = "button";
      tabsfrissitobutton.innerText = "Frissites";
      tabsfrissitobutton.onclick = function(params) {
        sessiontabsfrissito();
        adattablafrissitobetolto();
      };
      tabsfrissitobutton.id = "tabsfrissitobutton";
      document
        .querySelector("#tabstable_filter")
        .appendChild(tabsfrissitobutton);
      sessiontabsfrissito();
    },
    // 'div.dataTables_scrollBody'
    preDrawCallback: function(settings) {
      pageScrollPos = $("#tabstable")
        .parent()
        .scrollTop();
    },
    drawCallback: function(settings) {
      $("#tabstable")
        .parent()
        .scrollTop(pageScrollPos);
      //$('#tabstable_wrapper').css('height', '400px')
    },
    searching: true,
    orderCellsTop: true,
    fixedHeader: true,
    fixedFooter: true,
    scrollY: tabstablemagassag,
    scrollCollapse: true,
    paging: false,
    info: false,
    ordering: false,
    contentPadding: "iii",
    data: sessiontabsfrissito(1),
    columns: [
      {
        title: "I",
        defaultContent: ""
      },
      {
        title: "Cim",
        defaultContent: ""
      },
      {
        title: "Date",
        defaultContent: ""
      },
      {
        title: "UNL",
        defaultContent: "//"
      },
      {
        title: "X",
        defaultContent: "×"
      }
    ],
    createdRow: function(row, data, dataIndex) {
      if (row.querySelector(".mentettlist") == undefined) {
        row.setAttribute(
          "tabid",
          row.querySelector(".tabslist").getAttribute("tabid")
        );
        row.setAttribute("class2", "tabssorok");

        row
          .querySelector(".tabslist")
          .parentElement.addEventListener("click", function() {
            let tabind = parseInt(
              row.querySelector(".tabslist").getAttribute("tabid")
            );
            chrome.tabs.get(tabind, function(Tab, tab) {
              chrome.tabs.highlight(
                {
                  tabs: Tab.index
                },
                function() {}
              );
            });
          });
      } else {
        let tabind = row
          .querySelector(".mentettlist")
          .getAttribute("tabidchrome");
        if (tabind == "-1") {
          row.setAttribute("style", "background-color:grey");
        } else {
          row.setAttribute("style", "background-color:rgb(160, 160, 160)");
        }

        // console.log("tabind:", tabind);
        row
          .querySelector(".mentettlist")
          .parentElement.addEventListener("click", function() {
            let tabind2 = row
              .querySelector(".mentettlist")
              .getAttribute("tabid");
            let windowid = row
              .querySelector(".mentettlist")
              .getAttribute("windowid");
            chrome.tabs.create(
              {
                url: row.querySelector(".mentettlist").getAttribute("taburl")
              },
              function(tab) {
                db7.get(windowid).then(function(doc) {
                  doc.tabs.forEach(menttab => {
                    if (menttab.id == tabind2) {
                      menttab.tabid = tab.id;
                    }
                  });
                  return db7.put(doc);
                });
              }
            );
          });
      }

      if (row.querySelector(".mentetttorlo") == undefined) {
        row
          .querySelector(".tabsbezaro")
          .parentElement.addEventListener("click", function() {
            let tabid = row.getAttribute("tabid");
            let tabid2 = parseInt(tabid);
            chrome.tabs.remove(tabid2, function() {});
            row.remove();
          });
      } else {
        row
          .querySelector(".mentetttorlo")
          .parentElement.addEventListener("click", function() {
            console.log("row:", row);
            console.log(
              'row.querySelector(".mentettlist"):',
              row.querySelector(".mentettlist")
            );
            let windowid = row
              .querySelector(".mentettlist")
              .getAttribute("windowid");
            let tabind2 = row
              .querySelector(".mentettlist")
              .getAttribute("tabid");
            db7.get(windowid).then(function(doc) {
              doc.tabs.forEach(function(menttab, index) {
                if (menttab.id == tabind2) {
                  doc.tabs.splice(index, 1);
                  return db7.put(doc);
                }
              });

              sessiontabsfrissito();
            });
          });
      }
      if (row.querySelector(".tabsunload") != undefined) {
        row
          .querySelector(".tabsunload")
          .parentElement.addEventListener("click", function() {
            console.log(":", "mukodik");
            let windowid = 0;
            if (eszkoz != "android") {
              windowid = row
                .querySelector(".tabslist")
                .getAttribute("windowid");
            } else {
              windowid = aktivwindowid;
            }

            let tabind2 = row.querySelector(".tabslist").getAttribute("tabid");
            let tabtitle = row.querySelector(".tabslist").innerText;
            let taburl = row.querySelector(".tabslist").getAttribute("taburl");
            //   console.log("windowid:", windowid);

            // console.log("tabind2:", tabind2);

            db7
              .find({
                selector: {
                  windowid: parseInt(windowid)
                }
              })
              .then(function(mentwin) {
                db7
                  .get(mentwin.docs[0]._id)
                  .then(function(doc) {
                    if (eszkoz != "android") {
                      doc.tabs.forEach(function(menttab, index) {
                        if (menttab.tabid == tabind2) {
                          console.log("tabind2:", tabind2);
                          console.log("menttab.id:", menttab.tabid);

                          console.log("doc:", doc);
                          doc.tabs[index].tabid = -1;
                          console.log("doc:", doc);
                          return db7.put(doc);
                        }
                      });
                    } else {
                      row
                        .querySelector(".tabsunload")
                        .setAttribute(
                          "style",
                          "background-color:black;font-style:bold"
                        );
                      doc.tabs.push({
                        id: jegyzetguidGenerator(),
                        tabid: -1,
                        url: taburl,
                        cim: tabtitle,
                        datum: Date(),
                        index: 0,
                        lastopen: Date()
                      });
                      return db7.put(doc);
                    }
                  })
                  .then(function(doc) {
                    if (eszkoz != "android") {
                      chrome.tabs.remove(
                        parseInt(
                          row.querySelector(".tabslist").getAttribute("tabid")
                        ),
                        function() {}
                      );
                    }

                    sessiontabsfrissito();
                  });
              });
          });
      }
      if (
        row.querySelector(".tabsunloadmentett") != undefined &&
        row.querySelector(".mentettlist") != undefined
      ) {
        row
          .querySelector(".tabsunloadmentett")
          .parentElement.addEventListener("click", function() {
            console.log(":", "mukodik");

            let windowid = row
              .querySelector(".mentettlist")
              .getAttribute("windowid");
            let tabind2 = row
              .querySelector(".mentettlist")
              .getAttribute("tabid");
            //   console.log("windowid:", windowid);

            // console.log("tabind2:", tabind2);

            db7
              .get(windowid)
              .then(function(doc) {
                doc.tabs.forEach(function(menttab, index) {
                  if (menttab.id == tabind2) {
                    doc.tabs[index].tabid = -1;
                    return db7.put(doc);
                  }
                });
              })
              .then(function(doc) {
                sessiontabsfrissito();
              });
          });
      }
    },
    columnDefs: [
      {
        width: "90%",
        targets: [1]
      }
    ]
  });
  tabsGroupingFrissito();
});
let columns = [];
let columndefs = [];
let szuro = [];
let order = [];
if (eszkoz != "tab") {
  //oldalsáv mód
  columns = [
    {
      title: "I",
      defaultContent: ""
    },
    {
      title: "Cim",
      defaultContent: ""
    },
    {
      title: "R",
      defaultContent: ""
    },
    {
      title: "Megjegyzes",
      defaultContent: ""
    },
    {
      title: "Kategoria",
      defaultContent: ""
    },
    {
      title: "AlKat",
      defaultContent: ""
    },
    {
      title: "AlalKat",
      defaultContent: ""
    },
    {
      title: "Tip",
      defaultContent: ""
    },
    {
      title: "Datumok",
      defaultContent: ""
    }
  ];
  columndefs = [
    {
      width: 20,
      targets: 0
    },
    {
      width: "50%",
      targets: [1]
    },
    {
      width: "50%",
      targets: [3],
      render: $.fn.dataTable.render.ellipsis(50)
    }
  ];
  szuro = [4, 5, 6, 7];
  order = [[8, "desc"]];
} else {
  //tab mód
  /*
      [icon, cim3, rang2, 
                element.doc.megjegyzes, element.doc.kategoria, element.doc.alkategoria, element.doc.stilus, 
                element.doc.tipus, element.doc.allapot, element.doc.alkotasallapot, 
                befejezdatum,datum2,  torlesgomb2])
      */
  columns = [
    {
      title: "I",
      defaultContent: ""
    },
    {
      title: "Cim",
      defaultContent: ""
    },
    {
      title: "R",
      defaultContent: ""
    },
    {
      title: "Megjegyzes",
      defaultContent: ""
    },
    {
      title: "Kategoria",
      defaultContent: ""
    },
    {
      title: "AlKategoria",
      defaultContent: ""
    },
    {
      title: "AlalKat",
      defaultContent: ""
    },
    {
      title: "Tip",
      defaultContent: ""
    },
    {
      title: "Allapot",
      defaultContent: ""
    },
    {
      title: "Alk Áll",
      defaultContent: ""
    },
    {
      title: "BefDatum",
      defaultContent: ""
    },
    {
      title: "Datumok",
      defaultContent: ""
    }
  ];
  columndefs = [
    {
      width: 20,
      targets: 0
    },
    {
      width: "40%",
      targets: [1]
    },
    {
      width: "40%",
      targets: [3],
      render: $.fn.dataTable.render.ellipsis(60)
    }
  ];
  szuro = [4, 5, 6, 7, 8, 9];
  order = [[11, "desc"]];
}

document
  .querySelector("#sessionselect")
  .addEventListener("change", function(params) {
    if (params.target.value != 0) {
      db7
        .find({
          selector: {
            windowid: parseInt(params.target.value)
          }
        })
        .then(function(mentwin) {
          if (eszkoz != "android") {
            chrome.windows.create(
              {
                url: [],
                state: "maximized"
              },
              function(wind) {
                db7.get(mentwin.docs[0]._id).then(function(doc) {
                  doc.windowid = wind.id;
                  return db7.put(doc);
                });
              }
            );
          } else {
            aktivwindowid = parseInt(params.target.value);
            kategoriaszuro = mentwin.docs[0].kategoria;
            alkategoriaszuro = mentwin.docs[0].alkategoria;
            alalkategoriaszuro = mentwin.docs[0].alalkategoria;

            sessionname.value = mentwin.docs[0].cim;
            sessioncimvaltozas();
            sessioncolor(mentwin);
            sessiontabsfrissito();
            adattablafrissitobetolto();
          }
        });
    }
  });

function sessionfrissito() {
  $("#sessionselect")
    .find("option")
    .remove()
    .end();
  document.getElementById("sessionselect").options.add(new Option("", 0));
  //üres option berak

  chrome.windows.getAll(function(win) {
    console.log("win:", win);
    db7
      .allDocs({
        include_docs: true,
        attachments: true
      })
      .then(function(result) {
        function szuro(row, win) {
          let a = 0;
          win.forEach(element2 => {
            if (element2.id == row.doc.windowid) {
              a = 1;
            }
          });
          return a;
        }
        let resultrows = result.rows;
        resultrows.sort((a, b) => a.doc.cim.localeCompare(b.doc.cim));
        resultrows.forEach(element => {
          if (szuro(element, win)) {
          } else {
            document
              .getElementById("sessionselect")
              .options.add(new Option(element.doc.cim, element.doc.windowid));
            //windows-ban ha nincs benne,a mentett db6 akkor berakja
          }
        });
      });
  });
}

document
  .querySelector("#sessionselect")
  .addEventListener("mouseover", function(params) {
    sessionfrissito();
  });

let tabsGroupingFrissito = function() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      if (document.querySelector(`[tabid="${tabs[0].id}"]`) != null) {
        document.querySelector(
          `[tabid="${tabs[0].id}"]`
        ).style.backgroundColor = "#a0bdd8";
      }
    }
  );
};

let adatfrissito2 = function(row, element) {
  if (element != undefined) {
    let icon = `<img src="https://www.google.com/s2/favicons?domain=${element._id}" width="20" height="20" class="datafavicon">`;

    let cim = "";
    if (element.cim !== undefined) {
      cim = `<b style="font-weight:bold;line-height: 1" >${element.cim.trunc(
        50
      )}</b>`;
      // console.log(cim2)
    }

    let rang = document.createElement("b");
    if (element.rang !== undefined) {
      rang.innerText = element.rang;
      rang.setAttribute("style", "font-size: 15px");
      rang.setAttribute("class", "rangtablazat");
    }
    let rang2 = rang.outerHTML;

    let megjegyzes = "";
    if (element.megjegyzes !== undefined) {
      megjegyzes = element.megjegyzes;
    }
    let kategoria = "";
    if (element.kategoria !== undefined) {
      kategoria = element.kategoria;
    }
    let alkategoria = "";
    if (element.alkategoria !== undefined) {
      alkategoria = element.alkategoria;
    }
    let alalkategoria = "";
    if (element.alalkategoria !== undefined) {
      alalkategoria = element.alalkategoria;
    }

    let datum2 = "";
    if (element.datum !== undefined) {
      //datum2 = new Intl.DateTimeFormat().format(element.datum)
      let datumseg = new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      }).format(element.datum);

      datum2 = `<a style="font-size: 0">${element.datum}</a>` + datumseg;
    }

    let tipusnev = "";
    if (element.tipus != undefined) {
      tipusnev = element.tipus;
    }
    let tipus = `<b style="font-weight:bold;line-height: 1" >${tipusnev}</b>`;

    let allapot = "";
    if (element.allapot !== undefined) {
      allapot = element.allapot;
    }

    let alkotasallapot = "";
    if (element.alkotasallapot !== undefined) {
      alkotasallapot = element.alkotasallapot;
    }

    if (eszkoz != "tab") {
      //oldalsáv mód
      let col = row.querySelectorAll("td");
      col[0].innerHTML = icon;
      col[1].innerHTML = cim;
      col[2].innerHTML = rang2;
      col[3].innerHTML = megjegyzes;
      col[4].innerHTML = kategoria;
      col[5].innerHTML = alkategoria;
      col[6].innerHTML = alalkategoria;
      col[7].innerHTML = tipus;
      col[8].innerHTML = datum2;
    } else {
      //tab mód
      let befejezdatum = "";
      if (element.befejezdatum === undefined) {
        befejezdatum = "";
      } else {
        //datum2 = new Intl.DateTimeFormat().format(element.datum)
        befejezdatum = new Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        }).format(element.befejezdatum);
      }

      let col = row.querySelectorAll("td");
      col[0].innerHTML = icon;
      col[1].innerHTML = cim;
      col[2].innerHTML = rang2;
      col[3].innerHTML = megjegyzes;
      col[4].innerHTML = kategoria;
      col[5].innerHTML = alkategoria;
      col[6].innerHTML = alalkategoria;
      col[7].innerHTML = tipus;
      col[8].innerHTML = allapot;
      col[9].innerHTML = alkotasallapot;
      col[10].innerHTML = befejezdatum;
      col[11].innerHTML = datum2;
    }

    row.setAttribute(
      "style",
      "background-color:" + kartyahattergenerator(element.rang)
    );

    row.addEventListener("click", function() {
      adatbazisboladatfrissito(db, element._id);
    });

    row.querySelectorAll("td")[1].addEventListener("click", function() {
      console.log("element.tipus:", element.tipus);
      filebetolto(element._id, element.tipus);
    });

    row.querySelectorAll("td")[0].addEventListener("click", function() {
      let biztosan = confirm("Biztosan Torlod?");
      if (biztosan) {
        db.get(element._id).then(function(doc) {
          //  console.log(e.id)
          return db.remove(doc);
        });
        row.remove();
      }
    });
  }
};
//todo sessions ne lassuljon le
function sessiontabsfrissito(elso = 0) {
  let tabsadatok = [];

  chrome.windows.getCurrent(
    {
      populate: true
    },
    function(openwin) {
      let windowid = 0;
      if (eszkoz != "android") {
        windowid = openwin.id;
      } else {
        windowid = aktivwindowid;
      }

      db7
        .find({
          selector: {
            windowid: windowid
          }
        })
        .then(function(mentwin) {
          //console.log("mentwin:", mentwin);
          let tabsadatokopen = [];
          let tabsadatokhagyott = [];
          let tabsadatokmentett = [];

          if (mentwin.docs[0] != undefined) {
            mentwin.docs[0].tabs.forEach(mentab => {
              let open = false;
              openwin.tabs.forEach(element => {
                if (mentab.tabid == element.id) {
                  open = true;
                }
              });
              if (open == false) {
                let i = `<img src="https://www.google.com/s2/favicons?domain=${mentab.url}" width="16" height="16" class="datafavicon">`;
                let cim = mentab.cim;
                if (mentab.cim == undefined) {
                  cim = mentab.url;
                }
                cim = mentab.cim;
                let cim2 = "";
                if (cim !== undefined && cim !== null) {
                  cim2 = cim.trunc(110);
                }
                let cim3 = `<a class="mentettlist" windowid="${mentwin.docs[0]._id}" tabid="${mentab.id}" tabidchrome="${mentab.tabid}" taburl="${mentab.url}" style="user-select: none;  color:white;text-decoration: none">${cim2}</a>`;
                let datum = datumkora(mentab.datum, "days");
                let unload = "<a></a>";
                if (mentab.tabid != "-1") {
                  unload = `<a class="tabsunloadmentett" tabid=${mentab.id} style="user-select: none;  text-decoration: none;font-weight: bold">▢</a>`;
                }
                let bezaras = `<a class="mentetttorlo" mentabid=${mentab.id} tabid=${undefined} style="user-select: none; color:white; text-decoration: none;font-weight: bold">╳</a>`;

                let tabadatok = [i, cim3, datum, unload, bezaras, mentab.url];
                if (mentab.tabid == "-1") {
                  tabsadatokmentett.unshift(tabadatok);
                } else {
                  tabsadatokhagyott.unshift(tabadatok);
                }
              }
            });
          }

          openwin.tabs.forEach(element => {
            let i = `<img src="https://www.google.com/s2/favicons?domain=${element.url}" width="16" height="16" class="datafavicon">`;
            let cim = element.title;
            let cim2 = "";
            if (cim !== undefined) {
              cim2 = cim.trunc(110);
            }
            let datum = undefined;
            let windowid;
            if (mentwin.docs[0] != undefined) {
              mentwin.docs[0].tabs.forEach(element2 => {
                if (element2.tabid == element.id) {
                  datum = datumkora(element2.datum, "days");
                } else {
                }
              });
            } else {
            }

            let cim3 = `<a class="tabslist" windowid="${openwin.id}" tabid=${element.id} taburl="${element.url}" style="user-select: none;  text-decoration: none">${cim2}</a>`;
            let unload = `<a class="tabsunload"  tabid=${element.id} style="user-select: none;  text-decoration: none;font-weight: bold">▢</a>`;
            let bezaras = `<a class="tabsbezaro" tabid=${element.id} style="user-select: none;  text-decoration: none;font-weight: bold">╳</a>`;
            tabsadatokopen.push([i, cim3, datum, unload, bezaras, element.url]);
          });

          tabsadatok = tabsadatokopen.concat(
            tabsadatokhagyott.concat(tabsadatokmentett)
          );

          //console.log("tabsadatok:", tabsadatok);

          if (elso == 1) {
            return tabsadatok;
          } else {
            $("#tabstable")
              .DataTable()
              .clear();
            // console.log("tabsadatok:", tabsadatok);
            $("#tabstable")
              .DataTable()
              .rows.add(tabsadatok); // Add new data
            $("#tabstable")
              .DataTable()
              .columns.adjust()
              .draw();
            tabsGroupingFrissito();
            setTimeout(() => {
              if (
                document.querySelector("#tabstablediv .dataTables_empty") !=
                null
              ) {
                sessiontabsfrissito();
              } else {
              }
            }, 1000);
          }
        });
    }
  );
}
function kategoriadropdownfrissito() {
  //  console.log("ff")
  //todo folytasd a kategoriaszurot(lehet, hogy az alldocsszal kéne megoldani ezt is és talán a tábla betöltőt is)

  let kategoriaosszes = [];
  db.find({
    selector: {
      kategoria: {
        $exists: true
      }
    },
    fields: ["kategoria"]
  })
    .then(function(result) {
      console.log("result:", result);
      result.docs.forEach(element => {
        kategoriaosszes.push(element.kategoria);
      });
      let kategoriaarray = kategoriaosszes.filter(function(item, pos) {
        return kategoriaosszes.indexOf(item) == pos;
      });

      $(`#select4`)
        .find("option")
        .remove()
        .end();

      kategoriaarray.forEach(function(eg, i) {
        var el = document.createElement("option");
        el.textContent = eg;
        el.value = eg;
        document.querySelector(`#select4`).appendChild(el);
      });
    })
    .catch(function(err) {
      //console.log(err);
    });
}
function alkategoriadropdownfrissito() {
  //  console.log("ff")
  //todo folytasd a kategoriaszurot(lehet, hogy az alldocsszal kéne megoldani ezt is és talán a tábla betöltőt is)

  let alkategoriaosszes = [];
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
        if (element.kategoria === kategoriaszuro) {
          alkategoriaosszes.push(element.alkategoria);
        }
      });
      let alkategoriaarray = alkategoriaosszes.filter(function(item, pos) {
        return alkategoriaosszes.indexOf(item) == pos;
      });

      $(`#select5`)
        .find("option")
        .remove()
        .end();
      alkategoriaarray.forEach(function(eg, i) {
        var el = document.createElement("option");
        console.log("eg:", eg);
        el.textContent = eg;
        el.value = eg;
        document.querySelector(`#select5`).appendChild(el);
      });
    })
    .catch(function(err) {
      //console.log(err);
    });
}
//default szuro visszaálítása és jelenlegi szuro mentese berak
function alalkategoriadropdownfrissito() {
  //  console.log("ff")
  let alalkategoriaosszes = [];
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
        if (
          kategoriaszuro === element.kategoria &&
          alkategoriaszuro === element.alkategoria
        ) {
          alalkategoriaosszes.push(element.alalkategoria);
        }
      });
      let alalkategoriaarray = alalkategoriaosszes.filter(function(item, pos) {
        return alalkategoriaosszes.indexOf(item) == pos;
      });

      $(`#select6`)
        .find("option")
        .remove()
        .end();
      alalkategoriaarray.forEach(function(eg, i) {
        var el = document.createElement("option");
        console.log("eg:", eg);
        el.textContent = eg;
        el.value = eg;
        document.querySelector(`#select6`).appendChild(el);
      });
    })
    .catch(function(err) {
      //console.log(err);
    });
}

//todo adattablafrissitot csinald meg

function examplebetolto(result) {
  examplebetoltve = true;
  // Setup - add a text input to each footer cell
  $(document).ready(function() {
    $("#example").DataTable({
      initComplete: function() {
        this.api()
          .columns([4, 5, 6])
          .every(function(e) {
            let column2 = this;

            //szuro variablebe mentés
            var column = this;
            var select = $(
              `<select id="select${e}" class="adattablaselect" style="width: 35px"><option value=""></option></select>`
            )
              .appendTo($(column.header()))
              .on("change", function() {
                //Cannot read property 'replace' of null
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                console.log("val:", val);
                if (e == 4) {
                  if (val != undefined) {
                    kategoriaszuro = val;
                    alkategoriaszuro = "";
                    alalkategoriaszuro = "";
                  }
                } else if (e == 5) {
                  if (val != undefined) {
                    alkategoriaszuro = val;
                    alalkategoriaszuro = "";
                  }
                } else if (e == 6) {
                  if (val != undefined) {
                    alalkategoriaszuro = val;
                  }
                }
                adattablafrissitobetolto();
              });

            select.on("mouseover", function() {
              if (e == 4) {
                kategoriadropdownfrissito();
              } else if (e == 5) {
                alkategoriadropdownfrissito();
              } else if (e == 6) {
                alalkategoriadropdownfrissito();
              }
            });
          });
        let szuromentesebutton = document.createElement("button");
        szuromentesebutton.type = "button";
        szuromentesebutton.innerText = "Szuro mentese";
        szuromentesebutton.onclick = function(params) {
          var column = this;

          chrome.windows.getCurrent(function(win) {
            db7
              .find({
                selector: {
                  windowid: win.id
                }
              })
              .then(function(result) {
                if (result.docs != "") {
                  db7.get(result.docs[0]._id).then(function(doc) {
                    if (kategoriaszuro != "-1") {
                      doc.kategoria = kategoriaszuro;
                    }
                    if (alkategoriaszuro != "-1") {
                      doc.alkategoria = alkategoriaszuro;
                    }
                    if (alalkategoriaszuro != "-1") {
                      doc.alalkategoria = alalkategoriaszuro;
                    }
                    return db7.put(doc);
                  });
                }
              });
          });
        };
        szuromentesebutton.id = "szuromentesebutton";
        document
          .querySelector("#exampletablediv")
          .insertAdjacentElement("afterbegin", szuromentesebutton);

        let tabstablelathatosagbutton = document.createElement("button");
        tabstablelathatosagbutton.type = "button";
        tabstablelathatosagbutton.innerText = "TabsTable Hide";
        tabstablelathatosagbutton.onclick = function(params) {
          if (tabstablelathato == true) {
            document.querySelector("#tabstablediv").style.display = "none";
            tabstablelathato = false;
          } else {
            document.querySelector("#tabstablediv").style.display = "block";
            tabstablelathato = true;
          }
        };
        tabstablelathatosagbutton.id = "tabstablelathatosagbutton";
        document
          .querySelector("#exampletablediv")
          .insertAdjacentElement("afterbegin", tabstablelathatosagbutton);
      },
      deferRender: true,
      scroller: {
        displayBuffer: 1.6,
        loadingIndicator: true,
        boundaryScale: 0.5
      },
      scrollY: databasemagassag,
      searching: false,
      ordering: false,
      paging: true, //kell a scrollerhez
      // "pageLength": 50,
      info: false,
      retrieve: true, //az elején előjövő bug ellen lehet, hogy jó most tesztelem  https://datatables.net/manual/tech-notes/3

      data: result.docs,
      columns: columns,
      columnDefs: columndefs,
      createdRow: function(row, data, dataIndex) {
        //row.querySelectorAll("td")[1].innerText = "000";
        adatfrissito2(row, data);
      }
    });
  });
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
chrome.tabs.onActivated.addListener(function(tabId, ChangeInfo) {
  setTimeout(() => {
    sessiontabsfrissito();
  }, 50);
});
chrome.tabs.onCreated.addListener(function(tabId, ChangeInfo) {
  setTimeout(() => {
    sessiontabsfrissito();
  }, 200);
  setTimeout(() => {
    sessiontabsfrissito();
  }, 500);
});

chrome.tabs.onRemoved.addListener(function(tabid, removeInfo) {
  sessiontabsfrissito();

  setTimeout(() => {
    sessiontabsfrissito();
  }, 500);
  setTimeout(() => {
    sessiontabsfrissito();
  }, 1000);
});

document.querySelector("#teszt").addEventListener("click", function(e) {
  async function mrkasync(a) {
    console.log(a);
  }
  mrkasync("mrk");
});
