class ModulSessions {
    constructor(tableselector, magassag) {

        this.tableselector = tableselector
        this.tabstablemagassag = magassag


        this.sessionid = ""
        this.pageScrollPos = 0;
        this.initfirstwindow()

        this.eszkoz = eszkozdetektalo();
        if (this.eszkoz == "sidebar") {
            this.tabeventsinit()
        }
        this.sessionslathato = true;

        this.aktivwindowid = 0;
        this.aktivsessionid = 0
        this.elozorowseged
    }

    initfirstwindow() {
        let self = this

//todo nem torli a mobilon az adatot(nem jön fel a confirm)
        getActualSession(function (session) {


        })
        this.sessiontableinit()
    }


    sessiontableinit() {
        let self = this
        this.sessiontabsdata(function (adatok) {

            let pageScrollPos = 0
            $(document).ready(function () {
                // Setup - add a text input to each footer cell
                $(self.tableselector).DataTable({
                    initComplete: function () {
                        let tabsfrissitobutton = document.createElement("button");
                        tabsfrissitobutton.type = "button";
                        tabsfrissitobutton.innerText = "Frissites";
                        tabsfrissitobutton.onclick = function (params) {
                            self.tabstablefrissito();
                        };
                        tabsfrissitobutton.id = "tabsfrissitobutton";
                        document
                            .querySelector(`${self.tableselector}_filter`)
                            .appendChild(tabsfrissitobutton);
                        self.tabstablefrissito();
                    },
                    // 'div.dataTables_scrollBody'
                    preDrawCallback: function (settings) {
                        pageScrollPos = $(self.tableselector)
                            .parent()
                            .scrollTop();
                    },
                    drawCallback: function (settings) {
                        $(self.tableselector)
                            .parent()
                            .scrollTop(pageScrollPos);
                        //$('#tabstable_wrapper').css('height', '400px')
                    },
                    searching: true,
                    orderCellsTop: true,
                    fixedHeader: true,
                    fixedFooter: true,
                    scrollY: self.tabstablemagassag,
                    scrollCollapse: true,
                    paging: false,
                    info: false,
                    ordering: false,
                    contentPadding: "iii",
                    data: adatok,
                    columns: [
                        {
                            defaultContent: ""
                        },
                        {
                            defaultContent: ""
                        },
                        {
                            defaultContent: ""
                        }
                    ],
                    createdRow: function (row, data, dataIndex) {

                        self.rowadatbeilleszto(row, data, dataIndex)
                    },
                    columnDefs: [
                        {
                            width: "100%",
                            targets: [1]
                        }
                    ]
                });
                self.tabkijelolo();
            });
        })
    }

    rowadatbeilleszto(row, data, dataIndex) {
        let self=this
        if (data.active) {
            row.style.backgroundColor = "#a0bdd8"
            self.elozorowseged = row
        } else if (data.opened) {
            row.style.backgroundColor = "#d1c9d8"
        } else {
            row.style.backgroundColor = "#888785"
        }
        //gyorsabban vált a kijelölésnél
        if (data.opened) {
            let col2 = row.querySelectorAll("td");
            col2[1].addEventListener("click", function (e) {
                self.elozorowseged.style.backgroundColor = "#d1c9d8"
                row.style.backgroundColor = "#a0bdd8"

            })

        }
        //--------------------------------------------szinezo
        let icon = `<img src="https://www.google.com/s2/favicons?domain=${data.url}" width="16" height="16" class="datafavicon">`
        //--------------------------
        if (data.opened) {
        }
        let cim2 = "";
        if (data.cim !== undefined && data.cim !== null) {
            cim2 = data.cim.trunc(70);
        }
        let cim3 = document.createElement("b")
        cim3.style.userSelect = "none"
        if (data.opened == false) {
            cim3.style.color = "white"
        }

        cim3.innerText = cim2
        //--------------------------
        let datum = datumkora(data.datum, "days");
        let datum2 = document.createElement("b")
        datum2.style.userSelect = "none"
        datum2.innerText = datum
        //--------------------------------------------
        let col = row.querySelectorAll("td");
        col[0].innerHTML = icon;

        col[1].appendChild(cim3)
        col[2].appendChild(datum2)
        if (data.opened && self.eszkoz == "android") {
            col[0].addEventListener("click", function (e) {

                getActualSession(function (session) {

                    db7.get(session._id).then(function (doc) {
                        doc.tabs.push({
                            id: jegyzetguidGenerator(),
                            tabid: data.tabid,
                            url: data.url,
                            cim: data.cim,
                            datum: Date()
                        });
                        return db7.put(doc);
                    })
                })


            })
        } else if (data.opened) {
            col[0].addEventListener("click", function (e) {
                getActualSession(function (session) {
                    db7.get(session._id).then(function (doc) {

                        doc.tabs.forEach(function (tab, i) {
                            if (data.id == tab.id) {
                                doc.tabs[i].tabid = -1
                            }
                        })


                        return db7.put(doc);
                    }).then(function (d) {
                        chrome.tabs.remove(data.tabid,
                            function () {
                            }
                        );
                    })
                })
            })
        }
        if (data.opened) {
            col[1].addEventListener("click", function (e) {
                chrome.tabs.get(data.tabid, function (Tab, tab) {
                    chrome.tabs.highlight(
                        {
                            tabs: Tab.index
                        },
                        function () {
                        }
                    );
                });
            })
        } else {
            col[1].addEventListener("click", function (e) {
                getActualSession(function (session) {
                    chrome.tabs.create(
                        {
                            url: data.url
                        },
                        function (tab) {

                            db7.get(session._id).then(function (doc) {

                                doc.tabs.forEach(function (menttab, i) {

                                    if (menttab.id == data.id) {
                                        menttab.tabid = tab.id;

                                        menttab.datum = Date()
                                    }
                                });
                                return db7.put(doc);
                            });
                        }
                    );
                })
            })
        }
        if (data.opened) {
            col[2].addEventListener("click", function (e) {
                chrome.tabs.remove(data.tabid, function () {
                });
                row.remove();
            })
        } else {
            col[2].addEventListener("click", function (e) {
                getActualSession(function (session) {
                    db7.get(session._id).then(function (doc) {
                        doc.tabs.forEach(function (menttab, index) {
                            if (menttab.id == data.id) {
                                doc.tabs.splice(index, 1);
                                return db7.put(doc);
                            }
                        });
                        row.remove();
                    });
                })


            })
        }
    }

    tabkijelolo() {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function (tabs) {
                if (document.querySelector(`[tabid="${tabs[0].id}"]`) != null) {
                    document.querySelector(
                        `[tabid="${tabs[0].id}"]`
                    ).style.backgroundColor = "#a0bdd8";
                }
            }
        );
    };

    sessiontabsdata(callback) {
        if(eszkoz!="android"){
        getActualSession(function (session) {
            chrome.windows.getCurrent(
                {
                    populate: true
                },
                function (window) {

                    let adatok = []
                    let adatokseged = []
                    window.tabs.forEach(function (opentab) {
                        let adat = {}
                        adat.active = opentab.active
                        adat.opened = true
                        adat.tabid = opentab.id
                        adat.url = opentab.url
                        adat.cim = opentab.title
                        adatok.push(adat)
                    })
                    session.tabs.forEach(function (mentab) {
                        //az ilyen for olyan, mint a foreach, de van break
                        let opened = false
                        let adatokindex = -1
                        for (let adat of adatok) {
                            adatokindex++
                            if (mentab.tabid == adat.tabid) {
                                opened = true
                                break
                            }
                        }
                        if (opened == true) {
                            adatok[adatokindex].id = mentab.id
                            adatok[adatokindex].datum = mentab.datum
                        } else {
                            let adat = {}
                            adat.opened = false
                            adat.id = mentab.id
                            adat.url = mentab.url
                            adat.cim = mentab.cim
                            adat.datum = mentab.datum
                            adatokseged.unshift(adat)
                        }
                    })
                    let adatok2 = adatok.concat(adatokseged)
                    callback(adatok2)


                })
        })
        }
    }

    tabstablefrissito() {
        let self = this
        this.sessiontabsdata(function (adatok) {

            $(self.tableselector)
                .DataTable()
                .clear();
            // console.log("tabsadatok:", tabsadatok);
            $(self.tableselector)
                .DataTable()
                .rows.add(adatok); // Add new data
            $(self.tableselector)
                .DataTable()
                .columns.adjust()
                .draw();
            self.tabkijelolo();
            setTimeout(() => {
                if (
                    document.querySelector(self.tableselector + " .dataTables_empty") !=
                    null
                ) {
                    this.tabstablefrissito();
                } else {
                }
            }, 1000);


        })
    }

    tabeventsinit() {
        let self = this
        chrome.tabs.onActivated.addListener(function (tabId, ChangeInfo) {
            setTimeout(() => {
                self.tabstablefrissito();
            }, 50);
        });
        chrome.tabs.onCreated.addListener(function (tabId, ChangeInfo) {
            setTimeout(() => {
                self.tabstablefrissito();
            }, 200);
            setTimeout(() => {
                self.tabstablefrissito();
            }, 500);
        });

        chrome.tabs.onRemoved.addListener(function (tabid, removeInfo) {
            self.tabstablefrissito();

            setTimeout(() => {
                self.tabstablefrissito();
            }, 500);
            setTimeout(() => {
                self.tabstablefrissito();
            }, 1000);
        });

    }



}
//todo sessions ne lassuljon le

