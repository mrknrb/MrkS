class ModulDetails {
    constructor(selectors, beallitasok) {
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
        this.beallitasok = {}
        this.selectors = {}
        this.megjegyzeselozoido = 0
        this.id = ""

        this.beallitasok.htmlpath = "programelemek/details.html"
        this.beallitasok.automatavalto = beallitasok.automatavalto
        this.beallitasok.divcontainerbebetoltes = beallitasok.divcontainerbebetoltes


        if (this.beallitasok.divcontainerbebetoltes === true) {
            this.selectors.divcontainer = selectors.divcontainer
            this.selectors.urlmezo = "#urlmezo"
            this.selectors.urllogo = "#urllogo"
            this.selectors.cim = "#urlcim"
            this.selectors.megjegyzes = "#megjegyzesmezo"
            this.selectors.kategoria = "#kategoria"
            this.selectors.alkategoria = "#alkategoria"
            this.selectors.alalkategoria = "#alalkategoria"
            this.selectors.tipus = "#tipus"
            this.selectors.tipusdata = "#tipuslista"
            this.selectors.allapot = "#allapot"
            this.selectors.alkotasallapot = "#alkotasallapot"
            this.selectors.rang = "#rang"
            this.selectors.datum = "#datum"
            this.selectors.buttonjegyzet = "#jegyzetgomb"
            this.selectors.kategoriadata = "#kategorialista"
            this.selectors.alkategoriadata = "#alkategorialista"
            this.selectors.alalkategoriadata = "#alalkategorialista"
            this.selectors.buttontorles = "#torlesgomb"


            this.dombetolto()
            console.log("ok")
        } else {

            this.selectors.urlmezo = selectors.inputtexturlmezo
            this.selectors.urllogo = selectors.divurllogo
            this.selectors.cim = selectors.inputtextcim
            this.selectors.megjegyzes = selectors.textareamegjegyzes
            this.selectors.kategoria = selectors.inputlistkategoria
            this.selectors.alkategoria = selectors.inputlistalkategoria
            this.selectors.alalkategoria = selectors.inputlistalalkategoria
            this.selectors.tipus = selectors.inputlisttipus
            this.selectors.allapot = selectors.selectallapot
            this.selectors.alkotasallapot = selectors.selectalkotasallapot
            this.selectors.rang = selectors.selectrang
            this.selectors.datum = selectors.inputtextdatum
            this.selectors.buttonjegyzet = selectors.buttonjegyzet
            this.selectors.kategoriadata = selectors.kategoriadata
            this.selectors.alkategoriadata = selectors.alkategoriadata
            this.selectors.alalkategoriadata = selectors.alalkategoriadata
            this.selectors.tipusdata = selectors.tipusdata
            this.selectors.buttontorles = selectors.buttontorles


        }
        if (this.beallitasok.automatavalto == true) {
            this.tabbetoltindulas()//--------------------------ok
            this.tabschangeeventlistener()//--------------------------ok
        }


        this.inputeventmentoinit()
        this.tipuslistabetoltoinit()
        this.kategoriaklistabetoltoinit()
        //todo az új jegyzetet csináld meg
        this.jegyzetcreateinit()
        this.torlesgombinit()
    }


    dombetolto() {
        let self = this

        function readTextFile(file) {
            var rawFile = new XMLHttpRequest()
            rawFile.open("GET", file, false)
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        document.querySelector(self.selectors.divcontainer).innerHTML = rawFile.responseText
                    }
                }
            }

            rawFile.send(null)
        }

        readTextFile(this.beallitasok.htmlpath)
    }

//-------------------------------------------------------------------------------------------------------------------OK
    tabbetoltindulas() {
        let self = this
        if (this.beallitasok.automatavalto) {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (tabs) {
                    self.detailsfrissito(tabs[0].url, tabs[0])
                }
            )
        }
    }

//-------------------------------------------------------------------------------------------------------------------OK
    tabschangeeventlistener() {
        let self = this
        let s = this.selectors
        chrome.tabs.onActivated.addListener(function (activeInfo) {

            chrome.tabs.get(activeInfo.tabId, function (Tab, tab) {
                self.detailsfrissito(Tab.url, Tab)
            })
        })
        chrome.tabs.onUpdated.addListener(function (tabId, ChangeInfo) {
            chrome.tabs.query(
                {
                    lastFocusedWindow: true,
                    active: true
                },
                function (tabs) {
                    if (tabs[0] != undefined) {
                        if (tabs[0].url === ChangeInfo.url) {
                            chrome.tabs.get(tabId, function (Tab, tab) {
                                self.detailsfrissito(Tab.url, Tab)
                            })
                            setTimeout(() => {
                                chrome.tabs.get(tabId, function (Tab, tab) {
                                    document.querySelector(s.cim).value = Tab.title
                                    // console.log(Tab)
                                })
                            }, 1000)
                        }
                    }
                }
            )
        })
    }

    kategorianarancsszinezo() {
        let s = this.selectors
        document.querySelector(s.kategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
        document.querySelector(s.alkategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
        document.querySelector(s.alalkategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
    }

    detailsfrissito(id2, Tab) {
        let self = this
        let s = this.selectors

        function seged(selector, adat, doc) {

            if (adat == "cim") {

                if(Tab!=undefined){
                document.querySelector(s.cim).value = Tab.title

                }else{
                    console.log(adat)
                    document.querySelector(s.cim).value =""
                }
            } else {
                document.querySelector(selector).value = ""
            }
        }

        function adatbeilleszto(selector, adat, doc) {

            if (document.querySelector(selector) && doc) {
                if (doc[adat]) {
                    if (adat == "datum") {
                        document.querySelector(selector).value = new Intl.DateTimeFormat("default", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric"
                        }).format(doc.datum)
                    } else {
                        document.querySelector(selector).value = doc[adat]
                    }
                } else {

                    seged(selector, adat, doc)
                }
            } else if (document.querySelector(selector)) {
                seged(selector, adat, doc)
            }
        }

        let elkuldve = false
        db.get(id2.toString()).then(function (doc) {
            elkuldve = true

            beillesztoseged(doc)
        }).catch(function (error) {
            if (elkuldve == false) {
                beillesztoseged(undefined)
            }
        })

        function beillesztoseged(doc) {
            self.id = id2
            console.log("doc", doc)
            adatbeilleszto(s.cim, "cim", doc)
            adatbeilleszto(s.megjegyzes, "megjegyzes", doc)
            adatbeilleszto(s.rang, "rang", doc)
            adatbeilleszto(s.kategoria, "kategoria", doc)
            adatbeilleszto(s.alkategoria, "alkategoria", doc)
            adatbeilleszto(s.alalkategoria, "alalkategoria", doc)
            adatbeilleszto(s.allapot, "allapot", doc)
            adatbeilleszto(s.alkotasallapot, "alkotasallapot", doc)
            adatbeilleszto(s.tipus, "tipus", doc)
            adatbeilleszto(s.datum, "datum", doc)
            if (document.querySelector(s.urllogo)) {
                document.querySelector(s.urllogo).innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${id2}" width="20" height="20" class="favicon">`
            }
            if (document.querySelector(s.urlmezo)) {
                console.log("url")
                document.querySelector(s.urlmezo).value = id2
            }


            if (document.querySelector(s.kategoria) && document.querySelector(s.alkategoria) && document.querySelector(s.alalkategoria)) {
                if (doc) {
                    self.kategorianarancsszinezo()
                } else {
                    getActualSession(function (session) {
                        if (session._id) {
                            db7.get(session._id).then(function (doc) {
                                if (doc.kategoria !== undefined) {
                                    document.querySelector(s.kategoria).value = doc.kategoria
                                }
                                if (doc.alkategoria !== undefined) {
                                    document.querySelector(s.alkategoria).value = doc.alkategoria
                                }
                                if (doc.alalkategoria !== undefined) {
                                    document.querySelector(s.alalkategoria).value = doc.alalkategoria
                                }
                            })
                        }
                    })
                    document.querySelector(s.kategoria).setAttribute("style", "color:grey; font-size: 14px;width:100px")
                    document.querySelector(s.alkategoria).setAttribute("style", "color:grey; font-size: 14px;width:100px")
                    document.querySelector(s.alalkategoria).setAttribute("style", "color:grey; font-size: 14px;width:100px")
                }
            }
        }
    }

    inputeventmentoinit() {

        let self = this
        let s = this.selectors

        /**k 2*/
        function eventlistenerinit(selectortype, selector, eventtype) {
            document.querySelector(selector).addEventListener(eventtype, function (e) {

                let cimseged = document.querySelector(s.cim)
                let kategoriaseged = document.querySelector(s.kategoria)
                let alkategoriaseged = document.querySelector(s.alkategoria)
                let alalkategoriaseged = document.querySelector(s.alalkategoria)
                let adatok = {}
                adatok._id = self.id
                adatok[selectortype] = document.querySelector(selector).value
                if (selectortype !== "cim") {
                    if (cimseged && cimseged.value) {
                        adatok.cim = cimseged.value
                    }
                }

                if (kategoriaseged && kategoriaseged.value) {
                    adatok.kategoria = kategoriaseged.value
                }
                if (alkategoriaseged && alkategoriaseged.value) {
                    adatok.alkategoria = alkategoriaseged.value
                }
                if (alalkategoriaseged && alalkategoriaseged.value) {
                    adatok.alalkategoria = alalkategoriaseged.value
                }
                adatok.datum = Date.now()
                self.kategorianarancsszinezo()
                db.put(adatok).catch(function (err) {
                    if (err.name === "conflict") {
                        db.get(self.id).then(function (doc) {
                            doc[selectortype] = document.querySelector(selector).value
                            return db.put(doc)
                        })
                    }
                })
            })
        }

        /**s 2*/
        function szovegeventlistenerinit(selectortype, selector) {

            document.querySelector(selector).addEventListener("keyup", function () {

                let megjegyzeskovetkezoido = Date.now()
                self.megjegyzeselozoido = megjegyzeskovetkezoido
                setTimeout(() => {
                    if (megjegyzeskovetkezoido - self.megjegyzeselozoido === 0) {


                        let cimseged = document.querySelector(s.cim)
                        let kategoriaseged = document.querySelector(s.kategoria)
                        let alkategoriaseged = document.querySelector(s.alkategoria)
                        let alalkategoriaseged = document.querySelector(s.alalkategoria)
                        let adatok = {}
                        adatok._id = self.id
                        adatok[selectortype] = document.querySelector(selector).value
                        if (selectortype !== "cim") {
                            if (cimseged && cimseged.value) {
                                adatok.cim = cimseged.value
                            }
                        }
                        if (kategoriaseged && kategoriaseged.value) {
                            adatok.kategoria = kategoriaseged.value
                        }
                        if (alkategoriaseged && alkategoriaseged.value) {
                            adatok.alkategoria = alkategoriaseged.value
                        }
                        if (alalkategoriaseged && alalkategoriaseged.value) {
                            adatok.alalkategoria = alalkategoriaseged.value
                        }
                        adatok.datum = Date.now()
                        console.log(adatok)
                        self.kategorianarancsszinezo()
                        db.put(adatok).catch(function (err) {
                            if (err.name === "conflict") {
                                db.get(self.id).then(function (doc) {
                                    doc[selectortype] = document.querySelector(selector).value
                                    return db.put(doc)
                                })
                            }
                        })
                    }
                }, 1000)
            })

        }

        /**s k 1*/
        if (document.querySelector(s.megjegyzes)) {
            szovegeventlistenerinit("megjegyzes", s.megjegyzes)
        }
        if (document.querySelector(s.cim)) {
            szovegeventlistenerinit("cim", s.cim)
        }
        if (document.querySelector(s.kategoria)) {
            eventlistenerinit("kategoria", s.kategoria, "change")
        }
        if (document.querySelector(s.alkategoria)) {
            eventlistenerinit("alkategoria", s.alkategoria, "change")
        }
        if (document.querySelector(s.alalkategoria)) {
            eventlistenerinit("alalkategoria", s.alalkategoria, "change")
        }
        if (document.querySelector(s.rang)) {
            eventlistenerinit("rang", s.rang, "change")
        }
        if (document.querySelector(s.tipus)) {
            eventlistenerinit("tipus", s.tipus, "change")
        }
        if (document.querySelector(s.allapot)) {
            eventlistenerinit("allapot", s.allapot, "change")
        }
        if (document.querySelector(s.alkotasallapot)) {
            eventlistenerinit("alkotasallapot", s.alkotasallapot, "change")
        }
    }

    kategoriaklistabetoltoinit() {
        let self = this
        let s = this.selectors
        if (document.querySelector(s.kategoria) && document.querySelector(s.alkategoria) && document.querySelector(s.alalkategoria)) {
            document.querySelector(s.kategoria).addEventListener("mouseover", function () {
                let kategoriaosszes = []
                db.find({
                    selector: {
                        kategoria: {
                            $exists: true
                        }
                    },
                    fields: ["kategoria"]
                })
                    .then(function (result) {
                        result.docs.forEach(element => {
                            element.kategoria
                            kategoriaosszes.push(element.kategoria)
                        })
                        let kategoriaarray = kategoriaosszes.filter(function (item, pos) {
                            return kategoriaosszes.indexOf(item) == pos
                        })
                        var select = document.querySelector(s.kategoriadata)
                        $(s.kategoriadata).empty()
                        for (var i = 0; i < kategoriaarray.length; i++) {
                            var opt = kategoriaarray[i]
                            var el = document.createElement("option")
                            el.textContent = opt
                            el.value = opt
                            select.appendChild(el)
                        }
                    })
            })
            document.querySelector(s.alkategoria).addEventListener("mouseover", function () {
                let alkategoriaosszes = []
                db.find({
                    selector: {
                        alkategoria: {
                            $exists: true
                        }
                    },
                    fields: ["kategoria", "alkategoria"]
                })
                    .then(function (result) {
                        // console.log(result)
                        // console.log(result.docs[0])
                        result.docs.forEach(element => {
                            if (element.kategoria === document.querySelector(s.kategoria).value) {
                                alkategoriaosszes.push(element.alkategoria)
                            }
                        })
                        let alkategoriaarray = alkategoriaosszes.filter(function (item, pos) {
                            return alkategoriaosszes.indexOf(item) == pos
                        })
                        var select = document.querySelector(s.alkategoriadata)
                        $(s.alkategoriadata).empty()
                        //select.children().remove();
                        for (var i = 0; i < alkategoriaarray.length; i++) {
                            var opt = alkategoriaarray[i]
                            var el = document.createElement("option")
                            el.textContent = opt
                            el.value = opt
                            select.appendChild(el)
                        }
                    })
            })
            document.querySelector(s.alalkategoria).addEventListener("mouseover", function () {
                let alalkategoriaosszes = []
                db.find({
                    selector: {
                        alalkategoria: {
                            $exists: true
                        }
                    },
                    fields: ["kategoria", "alkategoria", "alalkategoria"]
                })
                    .then(function (result) {
                        // console.log(result)
                        // console.log(result.docs[0])
                        result.docs.forEach(element => {
                            if (document.querySelector(s.kategoria).value === element.kategoria && document.querySelector(s.alkategoria).value === element.alkategoria) {
                                alalkategoriaosszes.push(element.alalkategoria)
                            }
                        })
                        let alalkategoriaarray = alalkategoriaosszes.filter(function (item, pos) {
                            return alalkategoriaosszes.indexOf(item) == pos
                        })
                        var select = document.querySelector(s.alalkategoriadata)
                        $(s.alalkategoriadata).empty()
                        //select.children().remove();
                        for (var i = 0; i < alalkategoriaarray.length; i++) {
                            var opt = alalkategoriaarray[i]
                            var el = document.createElement("option")
                            el.textContent = opt
                            el.value = opt
                            select.appendChild(el)
                        }
                    })
            })
        }
    }

    tipuslistabetoltoinit() {
        let self=this
        let s = this.selectors
        if (document.querySelector(s.tipus)) {
            document.querySelector(s.tipus).addEventListener("mouseover", function () {
                let tipusosszes = []
                db.find({
                    selector: {
                        tipus: {
                            $exists: true
                        }
                    },
                    fields: ["tipus"]
                })
                    .then(function (result) {
                        result.docs.forEach(element => {
                            tipusosszes.push(element.tipus)
                        })
                        let tipusarray = tipusosszes.filter(function (item, pos) {
                            return tipusosszes.indexOf(item) == pos
                        })
                        var select = document.querySelector(s.tipusdata)
                        $(s.tipusdata).empty()
                        for (var i = 0; i < tipusarray.length; i++) {
                            var opt = tipusarray[i]
                            var el = document.createElement("option")
                            el.textContent = opt
                            el.value = opt
                            select.appendChild(el)
                        }
                    })
            })
        }

    }

    jegyzetcreateinit() {
        let self = this
        let s = this.selectors
        if (document.querySelector(s.buttonjegyzet)) {
            document.querySelector(s.buttonjegyzet).addEventListener("click", function () {

                getActualSession(function (session) {


                    let jegyzetadatok = {}
                    jegyzetadatok._id = guidGenerator()
                    if (session != undefined) {
                        if (session.kategoria != undefined&&session.kategoria != "") {
                            jegyzetadatok.kategoria = session.kategoria
                            document.querySelector("#kategoria").value = session.kategoria
                        }
                        if (session.alkategoria != undefined&&session.alkategoria != "") {
                            jegyzetadatok.alkategoria = session.alkategoria
                            document.querySelector("#alkategoria").value = session.alkategoria
                        }
                        if (session.alalkategoria != undefined&&session.alalkategoria != "") {
                            jegyzetadatok.alalkategoria = session.alalkategoria
                            document.querySelector("#alalkategoria").value = session.alalkategoria
                        }
                    }
                    jegyzetadatok.datum = Date.now()
                    self.kategorianarancsszinezo()
                    db.put(jegyzetadatok).then(function (doc) {
                        self.detailsfrissito(jegyzetadatok._id)
                    })


                })



            })
        }
    }

    torlesgombinit() {
        let self = this
        let s = this.selectors
        if (document.querySelector(s.buttontorles)) {
            document.querySelector(s.buttontorles).addEventListener("click", function () {


                    db.get(self.id).then(function (doc) {
                        let biztosan = confirm("Biztosan Torlod?");
                        if (biztosan) {
                        return db.remove(doc) }
                    })
                    setTimeout(() => {
                        chrome.tabs.query(
                            {
                                active: true,
                                currentWindow: true

                            },
                            function (tabs) {
                                self.detailsfrissito(tabs[0].url, tabs[0])
                            }
                        )
                    }, 50)





            })
        }

    }
}
