var db = new PouchDB("NodesNet", {
    revs_limit: 50,
    auto_compaction: true
});
var db2 = new PouchDB("NodesNet2", {
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

function start2() {
    console.log("mukodik");
    db.sync(dbremote);

    db7.sync(db7remote);

    setTimeout(start2, 10000);
}

// boot up the first call
start2();

if (eszkozdetektalo() != "android") {

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

//* nincs használatban*/
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

    function ismeretlenablakkezelo(openwin) {
        db7.get("jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b").then(function (doc) {

            chrome.windows.getAll(
                {
                    populate: true
                },
                function (openwins) {

                    let vegyesnyitva = false
                    openwins.forEach(function (win) {
                        console.log(doc, win)
                        if (doc.windowid == win.id) {
                            vegyesnyitva = true
                        }
                    })

                    if (vegyesnyitva == false) {

                        doc.windowid = openwin.id;
                        return db7.put(doc);

                    } else {


                        db7
                            .put({
                                _id: guidGenerator(),
                                windowid: openwin.id,
                                datum: Date(),
                                cim: "Nevtelen" + openwin.id,
                                color: "#a0bdd8",
                                tabs: []
                            })

                    }


                })

        });
    }

    chrome.windows.onRemoved.addListener(function (windowid) {
        db7
            .find({
                selector: {
                    windowid: windowid
                }
            })
            .then(function (result) {
                db7.get(result.docs[0]._id).then(function (doc) {
                    doc.windowid = -1
                    return db7.put(doc);
                });

            });


    })

    chrome.tabs.onRemoved.addListener(function (tabid, removeInfo) {
        if (removeInfo.isWindowClosing == false) {
            db7
                .find({
                    selector: {
                        windowid: removeInfo.windowId
                    }
                })
                .then(function (result) {
                    result.docs[0].tabs.forEach(function (element, index) {
                        if (element.tabid == tabid) {
                            db7.get(result.docs[0]._id).then(function (doc) {
                                doc.tabs.splice(index, 1);
                                return db7.put(doc);
                            });
                        }
                    });
                });
        }
    });

    function elsoindulasellenorzo() {


    }

    let elsoindulas = true

    function start5() {

        db7
            .allDocs({
                include_docs: true,
                attachments: true
            })
            .then(function (mentwins) {
                chrome.windows.getAll(
                    {
                        populate: true
                    },
                    function (openwins) {
                        openwins.forEach(openwin => {
                            let nincsilyenwindow = 0
                            mentwins.rows.forEach(mentwin => {
                                if (openwin.id == mentwin.doc.windowid) {
                                    nincsilyenwindow = 1
                                    db7.get(mentwin.id).then(function (doc) {
                                        //---------------------------------------------------------------------------
                                        let tortentvaltozas = false
                                        let menttabsarray = doc.tabs

                                        openwin.tabs.forEach(function (opentab) {
                                            let nincsbenneawindowban = 0
                                            doc.tabs.forEach(function (menttab, i) {
                                                if (opentab.id == menttab.tabid) {
                                                    // ----------------------------------------------------ha az openwin benne van a mentwinben
                                                    nincsbenneawindowban = 1
                                                    if (opentab.title != menttab.cim) {
                                                        tortentvaltozas = true
                                                        if (elsoindulas == false) {
                                                            doc.tabs[i].cim = opentab.title
                                                        }

                                                    }
                                                    if (opentab.url != menttab.url) {
                                                        tortentvaltozas = true
                                                        if (elsoindulas) {
                                                            elsoindulas = false
                                                            doc.tabs.push({
                                                                id: guidGenerator(),
                                                                tabid: opentab.id,
                                                                url: opentab.url,
                                                                cim: opentab.title,
                                                                datum: Date()
                                                            });
                                                        } else {
                                                            doc.tabs[i].url = opentab.url
                                                        }

                                                    }
                                                }
                                            })
                                            if (nincsbenneawindowban == 0 && tabszuro(opentab.url)) {
                                                //------------------------------------------------------- ha az openwin, nincs benne a mentwinben

                                                tortentvaltozas = true

                                                doc.tabs.push({
                                                    id: guidGenerator(),
                                                    tabid: opentab.id,
                                                    url: opentab.url,
                                                    cim: opentab.title,
                                                    datum: Date()
                                                });
                                            }


                                        });

                                        doc.tabs.forEach(function (menttab, i) {
                                            let megnyitva = false
                                            openwin.tabs.forEach(function (opentab) {
                                                if (opentab.id == menttab.tabid) {
                                                    megnyitva = true
                                                }
                                            })
                                            if (megnyitva == false) {

                                                if (menttab.tabid != -1) {
                                                    doc.tabs[i].tabid = -1
                                                    tortentvaltozas = true
                                                    console.log("csakment")
                                                }

                                            }
                                        })

                                        console.log(tortentvaltozas)
                                        if (tortentvaltozas) {
                                            console.log(doc)
                                            return db7.put(doc);
                                        }
                                        //------------------------------------------------------------------------------------------------------------------------------------------------------
                                    });
                                }
                            });
                            if (nincsilyenwindow == 0) {
                                ismeretlenablakkezelo(openwin)
                            }
                        });
                    }
                );
            });
        setTimeout(start5, 10000);
    }

    setTimeout(() => {
        start5();
    }, 10000);

//todo ez miért is jó?
    /*
    setTimeout(() => {
        start3();
    }, 10000);*/


    chrome.windows.onCreated.addListener(function (openwin) {

        db7
            .find({
                selector: {
                    windowid: openwin.id
                }
            })
            .then(function (result) {

            }).catch(function () {
            ismeretlenablakkezelo(openwin)
        })
    })


    let a = {};
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.kerestipus == "spotifymute") {
            console.log("sender:", sender);
            chrome.tabs.update(
                sender.tab.id,
                {
                    muted: true
                },
                function (tab1) {
                }
            );
        }
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.kerestipus == "spotifyunmute") {
            console.log("sender:", sender);
            chrome.tabs.update(
                sender.tab.id,
                {
                    muted: false
                },
                function (tab1) {
                }
            );
        }
    });
    chrome.commands.onCommand.addListener(function (command) {
        console.log("Command:", command);
        if (command == "spotifypause") {
            console.log('"tabs":', "tabs");
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(tab => {
                    console.log("tab:", tab);
                    if (
                        tab.url.substring(0, 20) ==
                        "https://open.spotify.com/".substring(0, 20)
                    ) {
                        chrome.tabs.sendMessage(tab.id, "pause", function (response) {
                        });
                    }
                });
            });
        } else if (command == "spotifyactivate") {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (tabs) {
                    console.log("tabs[0]:", tabs[0]);
                    if (
                        tabs[0].url.substring(0, 20) !=
                        "https://open.spotify.com/".substring(0, 20)
                    ) {
                        a.index = tabs[0].index;
                        a.windowId = tabs[0].windowId;
                        chrome.tabs.query({}, function (tabs) {
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
                                        function () {
                                            chrome.tabs.highlight(
                                                {
                                                    tabs: tab.index
                                                },
                                                function () {
                                                }
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
                                function () {
                                    chrome.tabs.highlight(
                                        {
                                            tabs: a.index
                                        },
                                        function () {
                                        }
                                    );
                                }
                            );
                        }
                    }
                }
            );
        } else if (command == "spotifynext") {
            console.log('"tabs":', "tabs");
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(tab => {
                    console.log("tab:", tab);
                    if (
                        tab.url.substring(0, 20) ==
                        "https://open.spotify.com/".substring(0, 20)
                    ) {
                        chrome.tabs.sendMessage(tab.id, "next", function (response) {
                        });
                    }
                });
            });
        } else if (command == "previoustab") {
            chrome.windows.getCurrent({}, function (openwin) {
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
                    chrome.tabs.get(tabid, function (Tab, tab) {
                        chrome.tabs.highlight(
                            {
                                tabs: Tab.index
                            },
                            function () {
                            }
                        );
                    });
                }
            });
        }
    });

    let tabshistoryarray = {};
    chrome.tabs.onActivated.addListener(function (tab, ChangeInfo) {
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

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.kerestipus == "previoustab") {
            console.log("sender:", sender);

            chrome.windows.getCurrent({}, function (openwin) {
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
                    chrome.tabs.get(tabid, function (Tab, tab) {
                        chrome.tabs.highlight(
                            {
                                tabs: Tab.index
                            },
                            function () {
                            }
                        );
                    });
                }
            });
        }
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
                    function (openwin) {
                        let tabs = openwin.tabs;
                        let windowid = openwin.id;
                        console.log("openwin:", openwin);

                        tabshistoryarray[windowidszoveg].tabs.forEach(function (menttab, i) {
                            openwin.tabs.forEach(function (opentab, i) {
                                if (opentab.id == menttab) {
                                    console.log("opentab.id:", opentab);
                                    let nincs = true;
                                    tabshistoryrows.forEach(function (e, i) {
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
                            function (response) {
                            }
                        );
                    }
                );
            }
        }
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log("request:", request);
        if (request.kerestipus == "previoustabshighlight") {
            chrome.tabs.get(parseInt(request.adat), function (Tab, tab) {
                chrome.tabs.highlight(
                    {
                        tabs: Tab.index
                    },
                    function () {
                    }
                );
            });
        }
    });


    let c = 2

    function fff() {

        return c
    }

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

let mrksdatabasedata = {
    db: {
        frissitesdatum: 0,
        rows: []
    },
    db2: {
        frissitesdatum: 0,
        rows: []
    },
}


function mrksfrissitesdb(callback) {
    db2
        .allDocs({
            include_docs: true,
            attachments: true
        })
        .then(function (result) {
            mrksdatabasedata.db.rows = result.rows
            callback()
        })
}


function mrksfrissitesdb2(callback) {
    db
        .allDocs({
            include_docs: true,
            attachments: true
        })
        .then(function (result) {
            mrksdatabasedata.db.rows = result.rows
            callback()
        })
}

function mrksfrissitesteljes(callback) {
    mrksfrissitesdb(function () {
        mrksfrissitesdb2(function () {
            callback()
        })
    })
}
function start7() {
    mrksfrissitesteljes(function () {
        
    })
    setTimeout(start7, 10000);
}

// boot up the first call
start7();

//-------------------------------------------------------------------------------------------------------------
function mrksalldocs() {
    let rows = mrksdatabasedata.db.rows
    rows.concat(mrksdatabasedata.db2.rows);
    return rows
}


function mrksalldocsdb() {
    return mrksdatabasedata.db.rows
}


function mrksalldocsdb2() {
    return mrksdatabasedata.db2.rows
}

//-------------------------------------------------------------------------------------------------------------


function mrksget(fileid, db2, callback) {
    db.get(fileid).then(function (doc) {
        callback(doc, "db")
    }).catch(function (err) {
        if (err.message == "missing" && db2 == true) {
            db2.get(fileid).then(function (doc) {
                callback(doc, "db2")
            }).catch(function (err) {
                if (err.message == "missing") {
                    callback("missing")
                }
            })
        } else {
            callback("missing")
        }
    })
}


function mrksupdate(doc, db) {
    if (db == "db") {
        db.put(doc).catch(function (err) {
            console.log(err);
        });
    } else if (db == "db2") {
        db2.put(doc).catch(function (err) {
            console.log(err);
        });
    }
}























