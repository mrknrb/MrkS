var db = new PouchDB("NodesNet", {
  revs_limit: 50,
  auto_compaction: true
});

var db7 = new PouchDB("SessionsNet", {
  revs_limit: 50,
  auto_compaction: true
});
var dbremote = new PouchDB(
  "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db"
);
var db7remote = new PouchDB(
  "https://7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix:abd57bfe15284685f7743dbb910fb99a69fc822826bd3c94746c7b60b1c308f2@7404efff-b043-4c34-a8c5-c0dc859a5c46-bluemix.cloudantnosqldb.appdomain.cloud/db7"
);
//Infó az adatbázisról
/*
let serverinfo = remoteDB.info().then(function (info) {
console.log("info:", info);
})
*/

db.sync(dbremote);
db7.sync(db7remote);

function jegyzetguidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    "jegyzet" +
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function start2() {
  console.log("mukodik");
  db.sync(dbremote);

  db7.sync(db7remote);

  setTimeout(start2, 10000);
}
// boot up the first call
start2();


//**ha androidos kikapcsol
if (LibraryMain.eszkozdetektalo() == "sidebar") {
  let googledocs = [];
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "serveradatai0") {
      request.googleurls.forEach(element => {
        db.get(element, function(error, doc) {
          if (error) {
            // oh noes! we got an error
          } else {
            googledocs.push(doc);
            console.log(doc);
          }
        });
      });
      sendResponse({
        valasz: "mindjartpillanat"
      });
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "serveradatai") {
      sendResponse({
        valasz: googledocs
      });
      googledocs = [];
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    /*
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    console.log(request.adat)
                    */
    if (request.kerestipus == "ujadat") {
      db.put(request.adat);
      sendResponse({
        valasz: request.adat + "mentve új adatként"
      });
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    /*
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    console.log(request.adat)
                    */
    if (request.kerestipus == "adatupdate") {
      db.get(request.adat._id)
        .then(function(doc) {
          // update their age
          console.log(doc);
          doc.megjegyzes = request.adat.megjegyzes;
          // put them back
          return db.put(doc);
        })
        .then(function() {
          // fetch mittens again
          return db.get(request.adat._id);
        })
        .then(function(doc) {
          console.log(doc);
        });
      sendResponse({
        valasz: request.adat + "mentve új adatként"
      });
    }
  });
  //aktív tab száma (nem az url)
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    // console.log(activeInfo.tabId);
  });
  //ujadat2
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    /*
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    console.log(request.adat)
            */
    if (request.kerestipus == "ujmegjegyzes") {
      console.log("req");
      db.put({
        _id: request.id,
        megjegyzes: request.megjegyzes,
        cim: request.cim
      })
        .then(function() {
          console.log("success");
          // success
        })
        .catch(function(err) {
          if (err.name === "conflict") {
            console.log("modify");
            db.get(request.id)
              .then(function(doc) {
                // update their age
                doc.megjegyzes = request.megjegyzes;
                // put them back
                return db.put(doc);
              })
              .then(function() {
                // fetch mittens again
                return db.get("NodesNet");
              })
              .then(function(doc) {
                console.log(doc);
              });
          } else {
            // some other error
          }
        });
      sendResponse({
        valasz: request.adat + "mentve új adatként"
      });
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    /*
                    console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
                    console.log(request.adat)
            */
    if (request.kerestipus == "ujrang") {
      db.put({
        _id: request.id,
        rang: request.rang,
        cim: request.cim
      })
        .then(function() {
          console.log("success");
          // success
        })
        .catch(function(err) {
          if (err.name === "conflict") {
            console.log("modify");
            db.get(request.id)
              .then(function(doc) {
                // update their age
                console.log(doc);
                doc.rang = request.rang;
                // put them back
                return db.put(doc);
              })
              .then(function() {
                // fetch mittens again
                return db.get("NodesNet");
              })
              .then(function(doc) {
                console.log(doc);
              });
          } else {
            // some other error
          }
        });
      sendResponse({
        valasz: request.adat + "mentve új adatként"
      });
    }
  });
  /*
        chrome.windows.getAll({populate : true}, function (window_list) {
        console.log("window_list:", window_list);
        })
    */

  function tabszuro(url) {
    if (
      url != "chrome://startpage/" &&
      url.substring(0, 20) != "https://open.spotify.com/".substring(0, 20) &&
      url.substring(0, 20) != "https://www.facebook.com".substring(0, 20) &&
      url.substring(0, 15) != "https://mail.google.com/mail".substring(0, 15) &&
      url.substring(0, 15) != "chrome://startpageshared/".substring(0, 15) &&
      url.substring(0, 15) != "opera://extensions".substring(0, 15)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function windowszuro(tabs) {
    let a = false;
    tabs.forEach(tab => {
      if (tab.url != undefined) {
        if (
          tab.url != "chrome://startpage/" &&
          tab.url.substring(0, 20) !=
            "https://open.spotify.com/".substring(0, 20) &&
          tab.url.substring(0, 20) !=
            "https://www.facebook.com".substring(0, 20) &&
          tab.url.substring(0, 15) !=
            "https://mail.google.com/mail".substring(0, 15) &&
          tab.url.substring(0, 15) !=
            "chrome://startpageshared/".substring(0, 15) &&
          tab.url.substring(0, 15) != "opera://extensions".substring(0, 15)
        ) {
          a = true;
        }
      }
    });
    return a;
  }

  chrome.tabs.onRemoved.addListener(function(tabid, removeInfo) {
    if (removeInfo.isWindowClosing == false) {
      db7
        .find({
          selector: {
            windowid: removeInfo.windowId
          }
        })
        .then(function(result) {
          result.docs[0].tabs.forEach(function(element, index) {
            if (element.tabid == tabid) {
              db7.get(result.docs[0]._id).then(function(doc) {
                doc.tabs.splice(index, 1);
                return db7.put(doc);
              });
            }
          });
        });
    }
  });

  chrome.windows.onRemoved.addListener(function(windowid){
    db7
        .find({
          selector: {
            windowid: windowid
          }
        })
        .then(function(result) {
          db7.get(result.docs[0]._id).then(function(doc) {
            doc.windowid=-1
            return db7.put(doc);
          });

        });



  })
  function start3() {
    console.log("allDocs:", "allDocs");
    db7
      .allDocs({
        include_docs: true,
        attachments: true
      })
      .then(function(mentwins) {
        console.log("mentwins:", mentwins);
        chrome.windows.getAll(
          {
            populate: true
          },
          function(openwins) {
            console.log(openwins);
            openwins.forEach(openwin => {
              let nincsilyenwindow = 0;
              mentwins.rows.forEach(mentwin => {
                if (openwin.id == mentwin.doc.windowid) {
                  nincsilyenwindow = 1;
                  db7.get(mentwin.id).then(function(doc) {
                    openwin.tabs.forEach(function(opentab) {
                      let nincsbenneawindowban = 0;
                      mentwin.doc.tabs.forEach(function(mentab, i) {
                        if (opentab.id == mentab.tabid) {
                          // console.log("mentab.tabid:", mentab.tabid);
                          // console.log("  opentab.id:",   opentab.id);

                          nincsbenneawindowban = 1;
                          if (opentab.index != mentab.index) {
                            doc.tabs[i].index = opentab.index;
                          }
                          if (opentab.cim != mentab.cim) {
                            doc.tabs[i].cim = opentab.title;
                          }
                          if (opentab.url != mentab.url) {
                            doc.tabs[i].url = opentab.url;
                          }
                        }
                        doc.tabs[i].lastopen = Date();
                      });
                      if (nincsbenneawindowban == 0 && tabszuro(opentab.url)) {
                        // console.log("nincsbenneawindowban:", nincsbenneawindowban);
                        doc.tabs.push({
                          id: jegyzetguidGenerator(),
                          tabid: opentab.id,
                          url: opentab.url,
                          cim: opentab.title,
                          datum: Date(),
                          index: opentab.index,
                          lastopen: Date()
                        });
                      }
                    });
                    return db7.put(doc);
                  });
                }
              });
              if (nincsilyenwindow == 0 && windowszuro(openwin.tabs)) {
                db7
                  .put({
                    _id: jegyzetguidGenerator(),
                    windowid: openwin.id,
                    datum: Date(),
                    cim: "Nevtelen" + openwin.id,
                    color: "#a0bdd8",
                    tabs: []
                  })
                  .then(function() {})
                  .catch(function(err) {});
              }
            });
          }
        );
      });
    setTimeout(start3, 10000);
  }

  setTimeout(() => {
    start3();
  }, 10000);

  let a = {};
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "spotifymute") {
      console.log("sender:", sender);
      chrome.tabs.update(
        sender.tab.id,
        {
          muted: true
        },
        function(tab1) {}
      );
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "spotifyunmute") {
      console.log("sender:", sender);
      chrome.tabs.update(
        sender.tab.id,
        {
          muted: false
        },
        function(tab1) {}
      );
    }
  });
  chrome.commands.onCommand.addListener(function(command) {
    console.log("Command:", command);
    if (command == "spotifypause") {
      console.log('"tabs":', "tabs");
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          console.log("tab:", tab);
          if (
            tab.url.substring(0, 20) ==
            "https://open.spotify.com/".substring(0, 20)
          ) {
            chrome.tabs.sendMessage(tab.id, "pause", function(response) {});
          }
        });
      });
    } else if (command == "spotifyactivate") {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        function(tabs) {
          console.log("tabs[0]:", tabs[0]);
          if (
            tabs[0].url.substring(0, 20) !=
            "https://open.spotify.com/".substring(0, 20)
          ) {
            a.index = tabs[0].index;
            a.windowId = tabs[0].windowId;
            chrome.tabs.query({}, function(tabs) {
              tabs.forEach(tab => {
                if (
                  tab.url.substring(0, 20) ==
                  "https://open.spotify.com/".substring(0, 20)
                ) {
                  console.log("tab.id:", tab.id);
                  chrome.windows.update(
                    tab.windowId,
                    {
                      focused: true
                    },
                    function() {
                      chrome.tabs.highlight(
                        {
                          tabs: tab.index
                        },
                        function() {}
                      );
                    }
                  );
                }
              });
            });
          } else {
            console.log("a:", a);
            if (a.index != null) {
              chrome.windows.update(
                a.windowId,
                {
                  focused: true
                },
                function() {
                  chrome.tabs.highlight(
                    {
                      tabs: a.index
                    },
                    function() {}
                  );
                }
              );
            }
          }
        }
      );
    } else if (command == "spotifynext") {
      console.log('"tabs":', "tabs");
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          console.log("tab:", tab);
          if (
            tab.url.substring(0, 20) ==
            "https://open.spotify.com/".substring(0, 20)
          ) {
            chrome.tabs.sendMessage(tab.id, "next", function(response) {});
          }
        });
      });
    } else if (command == "previoustab") {
      chrome.windows.getCurrent({}, function(openwin) {
        let windowidszoveg = "a" + openwin.id;
        if (tabshistoryarray[windowidszoveg]) {
          let datekul = Date.now() - tabshistoryarray[windowidszoveg].allasdate;
          if (
            tabshistoryarray[windowidszoveg].allas > 8 ||
            tabshistoryarray[windowidszoveg].allas + 2 >
              tabshistoryarray[windowidszoveg].tabs.length
          ) {
            tabshistoryarray[windowidszoveg].allas = 0;
          } else {
            tabshistoryarray[windowidszoveg].allas =
              tabshistoryarray[windowidszoveg].allas + 1;
          }
          let tabidindex = tabshistoryarray[windowidszoveg].allas;
          let tabid = tabshistoryarray[windowidszoveg].tabs[tabidindex];
          tabshistoryarray[windowidszoveg].allasdate = Date.now();
          chrome.tabs.get(tabid, function(Tab, tab) {
            chrome.tabs.highlight(
              {
                tabs: Tab.index
              },
              function() {}
            );
          });
        }
      });
    }
  });

  let tabshistoryarray = {};
  chrome.tabs.onActivated.addListener(function(tab, ChangeInfo) {
    let windowidszoveg = "a" + tab.windowId;
    if (tabshistoryarray[windowidszoveg] == undefined) {
      tabshistoryarray[windowidszoveg] = {};
      tabshistoryarray[windowidszoveg].allas = 0;
      tabshistoryarray[windowidszoveg].allasdate = Date.now();
      tabshistoryarray[windowidszoveg].tabs = [];
    }
    let datekul = Date.now() - tabshistoryarray[windowidszoveg].allasdate;
    console.log("datekul:", datekul);
    console.log("tabshistoryarray:", tabshistoryarray);

    if (datekul > 100) {
      tabshistoryarray[windowidszoveg].allas = 0;
      console.log("ment");
      tabshistoryarray[windowidszoveg].tabs.unshift(tab.tabId);
      if (tabshistoryarray[windowidszoveg].tabs.length > 10) {
        tabshistoryarray[windowidszoveg].tabs.pop();
      }
    } else {
      console.log("nemment");
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "previoustab") {
      console.log("sender:", sender);

      chrome.windows.getCurrent({}, function(openwin) {
        let windowidszoveg = "a" + openwin.id;
        if (tabshistoryarray[windowidszoveg]) {
          let datekul = Date.now() - tabshistoryarray[windowidszoveg].allasdate;
          if (
            tabshistoryarray[windowidszoveg].allas > 8 ||
            tabshistoryarray[windowidszoveg].allas + 2 >
              tabshistoryarray[windowidszoveg].tabs.length
          ) {
            tabshistoryarray[windowidszoveg].allas = 0;
          } else {
            tabshistoryarray[windowidszoveg].allas =
              tabshistoryarray[windowidszoveg].allas + 1;
          }
          let tabidindex = tabshistoryarray[windowidszoveg].allas;
          let tabid = tabshistoryarray[windowidszoveg].tabs[tabidindex];
          tabshistoryarray[windowidszoveg].allasdate = Date.now();
          chrome.tabs.get(tabid, function(Tab, tab) {
            chrome.tabs.highlight(
              {
                tabs: Tab.index
              },
              function() {}
            );
          });
        }
      });
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.kerestipus == "previoustabstabla") {
      console.log("sender2:", sender);

      let tabshistoryrows = [];

      let windowidszoveg = "a" + sender.tab.windowId;

      if (tabshistoryarray[windowidszoveg]) {
        console.log(
          "tabshistoryarray[windowidszoveg]:",
          tabshistoryarray[windowidszoveg]
        );
        let tabshistoryrows = [];
        chrome.windows.getCurrent(
          {
            populate: true
          },
          function(openwin) {
            let tabs = openwin.tabs;
            let windowid = openwin.id;
            console.log("openwin:", openwin);

            tabshistoryarray[windowidszoveg].tabs.forEach(function(menttab, i) {
              openwin.tabs.forEach(function(opentab, i) {
                if (opentab.id == menttab) {
                  console.log("opentab.id:", opentab);
                  let nincs = true;
                  tabshistoryrows.forEach(function(e, i) {
                    if (e[0] == menttab) {
                      nincs = false;
                    }
                  });

                  if (nincs == true) {
                    tabshistoryrows.push([menttab, opentab.title, opentab.url]);
                  }
                }
              });
            });

            console.log("tabshistoryrows:", tabshistoryrows);

            chrome.tabs.sendMessage(
              sender.tab.id,
              {
                kerestipus: "tabshistoryrows",
                tabla: tabshistoryrows
              },
              function(response) {}
            );
          }
        );
      }
    }
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("request:", request);
    if (request.kerestipus == "previoustabshighlight") {
      chrome.tabs.get(parseInt(request.adat), function(Tab, tab) {
        chrome.tabs.highlight(
          {
            tabs: Tab.index
          },
          function() {}
        );
      });
    }
  });

  /*

                    let datekul = Date.now() - tabshistoryarray[windowidszoveg].allasdate
                    if (tabshistoryarray[windowidszoveg].allas > 8 || tabshistoryarray[windowidszoveg].allas + 2 > tabshistoryarray[windowidszoveg].tabs.length) {
                        tabshistoryarray[windowidszoveg].allas = 0
                    } else {
                        tabshistoryarray[windowidszoveg].allas = tabshistoryarray[windowidszoveg].allas + 1
                    }
                    let tabidindex = tabshistoryarray[windowidszoveg].allas
                    let tabid = tabshistoryarray[windowidszoveg].tabs[tabidindex]
                    tabshistoryarray[windowidszoveg].allasdate = Date.now()
                    chrome.tabs.get(tabid, function (Tab, tab) {
                        chrome.tabs.highlight({
                            'tabs': Tab.index
                        }, function () {});
                    })

    */
}
