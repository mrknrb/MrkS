class Sessions {
    constructor(selectors) {
        let s = this.selectors

        s.sessionid = undefined
        this.pageScrollPos = 0;

        this.sessionaktualis = sessioncimkiiras;
        this.sessionciminputtextselector = document.querySelector(
            sessionciminputtextselector
        );
        this.initfirstwindow()

        this.eszkoz = MrkLibrary.eszkozdetektalo();
        if (this.eszkoz == "sidebar") {
            this.tabeventsinit()
        }
        this.tabstablelathato = true;

        this.kategoriaszuro = undefined;
        this.alkategoriaszuro = undefined;
        this.alalkategoriaszuro = undefined;

        this.aktivwindowid = 0;
        this.aktivsessionid = 0
    }

    initfirstwindow() {
        let self = this

//todo nem torli a mobilon az adatot(nem jön fel a confirm)
        function vegyesbetolto() {

            db7
                .find({
                    selector: {
                        _id: "jegyz0e9ad149-49a1-76e7-c1d8-f37bf0d0956b"
                    }
                })
                .then(function (result) {
                    sessionname.value = result.docs[0].cim;
                    if (eszkoz != "android") {
                        chrome.windows.getCurrent(
                            {
                                populate: true
                            },
                            function (win) {
                                db7.get(result.docs[0]._id).then(function (doc) {
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
                        self.aktivwindowid = result.docs[0].windowid;
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
                function (win) {
                    db7
                        .find({
                            selector: {
                                windowid: win.id
                            }
                        })
                        .then(function (result) {
                            if (result == undefined || result.docs[0] == undefined) {
                                vegyesbetolto();
                            } else {
                                sessionname.value = result.docs[0].cim;
                                sessiondelete(win, result);
                                sessioncimvaltozas();
                                sessioncolor(result);
                                self.kategoriaszuro = result.docs[0].kategoria;
                                self.alkategoriaszuro = result.docs[0].alkategoria;
                                self.alalkategoriaszuro = result.docs[0].alalkategoria;
                                adattablafrissitobetolto();
                            }

                            //a window cím mező, ha megváltozik, akkor azt mentse a megfelelő winidre pipa
                        });
                }
            );
        } else {
            vegyesbetolto();
        }
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


    sessiontableinit() {
        let pageScrollPos=0
        $(document).ready(function () {
            // Setup - add a text input to each footer cell
            $("#tabstable").DataTable({
                initComplete: function () {
                    let tabsfrissitobutton = document.createElement("button");
                    tabsfrissitobutton.type = "button";
                    tabsfrissitobutton.innerText = "Frissites";
                    tabsfrissitobutton.onclick = function (params) {
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
                preDrawCallback: function (settings) {
                    pageScrollPos = $("#tabstable")
                        .parent()
                        .scrollTop();
                },
                drawCallback: function (settings) {
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
                createdRow: function (row, data, dataIndex) {
                    if (row.querySelector(".mentettlist") == undefined) {
                        row.setAttribute(
                            "tabid",
                            row.querySelector(".tabslist").getAttribute("tabid")
                        );
                        row.setAttribute("class2", "tabssorok");

                        row
                            .querySelector(".tabslist")
                            .parentElement.addEventListener("click", function () {
                            let tabind = parseInt(
                                row.querySelector(".tabslist").getAttribute("tabid")
                            );
                            chrome.tabs.get(tabind, function (Tab, tab) {
                                chrome.tabs.highlight(
                                    {
                                        tabs: Tab.index
                                    },
                                    function () {
                                    }
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
                            .parentElement.addEventListener("click", function () {
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
                                function (tab) {
                                    db7.get(windowid).then(function (doc) {
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
                            .parentElement.addEventListener("click", function () {
                            let tabid = row.getAttribute("tabid");
                            let tabid2 = parseInt(tabid);
                            chrome.tabs.remove(tabid2, function () {
                            });
                            row.remove();
                        });
                    } else {
                        row
                            .querySelector(".mentetttorlo")
                            .parentElement.addEventListener("click", function () {
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
                            db7.get(windowid).then(function (doc) {
                                doc.tabs.forEach(function (menttab, index) {
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
                            .parentElement.addEventListener("click", function () {
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
                                .then(function (mentwin) {
                                    db7
                                        .get(mentwin.docs[0]._id)
                                        .then(function (doc) {
                                            if (eszkoz != "android") {
                                                doc.tabs.forEach(function (menttab, index) {
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
                                                    id: guidGenerator(),
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
                                        .then(function (doc) {
                                            if (eszkoz != "android") {
                                                chrome.tabs.remove(
                                                    parseInt(
                                                        row.querySelector(".tabslist").getAttribute("tabid")
                                                    ),
                                                    function () {
                                                    }
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
                            .parentElement.addEventListener("click", function () {
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
                                .then(function (doc) {
                                    doc.tabs.forEach(function (menttab, index) {
                                        if (menttab.id == tabind2) {
                                            doc.tabs[index].tabid = -1;
                                            return db7.put(doc);
                                        }
                                    });
                                })
                                .then(function (doc) {
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
            tabkijelolo();
        });
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

    sessiontabsfrissito(elso = 0) {
        let tabsadatok = [];

        chrome.windows.getCurrent(
            {
                populate: true
            },
            function (openwin) {
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
                    .then(function (mentwin) {
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
                            tabkijelolo();
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

    tabeventsinit() {
        chrome.tabs.onActivated.addListener(function (tabId, ChangeInfo) {
            setTimeout(() => {
                sessiontabsfrissito();
            }, 50);
        });
        chrome.tabs.onCreated.addListener(function (tabId, ChangeInfo) {
            setTimeout(() => {
                sessiontabsfrissito();
            }, 200);
            setTimeout(() => {
                sessiontabsfrissito();
            }, 500);
        });

        chrome.tabs.onRemoved.addListener(function (tabid, removeInfo) {
            sessiontabsfrissito();

            setTimeout(() => {
                sessiontabsfrissito();
            }, 500);
            setTimeout(() => {
                sessiontabsfrissito();
            }, 1000);
        });

    }

    sessionkategoriamento(kategoriaszuro, alkategoriaszuro, alalkategoriaszuro, sessionidnemkot) {
        let sessionidseg = this.aktivsessionid
        if (sessionidnemkot !== undefined) {
            sessionidseg = sessionidnemkot
        }
        db7.get(sessionidseg).then(function (doc) {
            if (kategoriaszuro !== "-1") {
                doc.kategoria = kategoriaszuro;
            }
            if (alkategoriaszuro !== "-1") {
                doc.alkategoria = alkategoriaszuro;
            }
            if (alalkategoriaszuro !== "-1") {
                doc.alalkategoria = alalkategoriaszuro;
            }
            return db7.put(doc);
        });


    }


}

//let eszkoz = "android";


//csak azért, hogy gyorsabban betöltsön


//todo sessions ne lassuljon le


//todo adattablafrissitot csinald meg
