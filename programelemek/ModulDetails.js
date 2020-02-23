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

        this.beallitasok.db = beallitasok.db
        this.beallitasok.db7 = beallitasok.db7
        this.beallitasok.htmlpath = beallitasok.htmlpath
        this.beallitasok.automatavalto = beallitasok.automatavalto
        this.beallitasok.detailsboxlathato = beallitasok.detailsboxlathato


        if (this.beallitasok.divcontainerbebetoltes === true) {
            this.selectors.divcontainer = selectors.divcontainer
            this.dombetolto()
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
            this.selectors.detailsboxhide = selectors.detailsboxhide


        }
        this.init()
    }


    init() {
        if (this.automatavalto == true) {
            this.tabbetoltindulas()
            this.tabschangeeventlistener()
        }
        this.detailshideinit()
        this.inputeventmentoinit()
        this.tipuslistabetoltoinit()
        this.kategoriaklistabetoltoinit()
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

        readTextFile(self.htmlpath)
    }

//-------------------------------------------------------------------------------------------------------------------OK
    tabbetoltindulas() {

        if (this.beallitasok.automatavalto) {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function (tabs) {
                    self.detailsfrissito(tabs[0])
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
                self.detailsfrissito(Tab.id)
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
                                frissito(Tab)
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

    detailshideinit() {
        let s=this.selectors
        if(document.querySelector(s.detailsboxhide)){
        document.querySelector(s.detailsboxhide).addEventListener("click", function (e) {
            if (self.detailsboxlathato == true) {
                document.querySelector(s.divcontainer).style.display = "none"
                self.detailsboxlathato = false
            } else {
                document.querySelector(s.divcontainer).style.display = "block"
                self.detailsboxlathato = true
            }
        })}
    }

    detailsfrissito(id2, Tab) {
        let self = this
        let s = this.selectors

        function seged() {
            if (adat == "cim") {
                document.querySelector(s.cim).value = Tab.title
            } else {
                document.querySelector(selector).value = ""
            }
        }

        function adatbeilleszto(selector, adat) {
            if (document.querySelector(selector) && doc) {
                if (document.querySelector(selector) && doc[adat]) {
                    if (adat == "datum") {
                        new Intl.DateTimeFormat("default", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric"
                        }).format(doc.datum)
                    } else {
                        document.querySelector(selector).value = doc[adat]
                    }
                } else if (document.querySelector(selector)) {

                    seged()
                }
            } else if (document.querySelector(selector)) {
                seged()
            }
        }

        self.beallitasok.db.get(id2).then(function (doc) {
            adatbeilleszto(s.cim, "cim")
            adatbeilleszto(s.megjegyzes, "megjegyzes")
            adatbeilleszto(s.rang, "rang")
            adatbeilleszto(s.kategoria, "kategoria")
            adatbeilleszto(s.alkategoria, "alkategoria")
            adatbeilleszto(s.alalkategoria, "alalkategoria")
            adatbeilleszto(s.allapot, "allapot")
            adatbeilleszto(s.alkotasallapot, "alkotasallapot")
            adatbeilleszto(s.tipus, "tipus")
            adatbeilleszto(s.datum, "datum")
            if (document.querySelector(s.urllogo)) {
                document.querySelector(s.urllogo).innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${id2}" width="20" height="20" class="favicon">`
            }
            if (document.querySelector(s.urlmezo)) {
                document.querySelector(s.urlmezo).value = id2
            }
            if (document.querySelector(s.kategoria) && document.querySelector(s.alkategoria) && document.querySelector(s.alalkategoria)) {
                if (doc) {

                    document.querySelector(s.selectors.kategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
                    document.querySelector(s.selectors.alkategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
                    document.querySelector(s.selectors.alalkategoria).setAttribute("style", "color:rgb(190, 148, 92); font-size: 14px;font-weight: bold;width:100px")
                } else {
                    getActualSession(function (session) {

                        if (session._id) {
                            self.beallitasok.db7.get(session._id).then(function (doc) {
                                if (doc.kategoria !== undefined) {
                                    document.querySelector(s.selectors.kategoria).value = doc.kategoria
                                }
                                if (doc.alkategoria !== undefined) {
                                    document.querySelector(s.selectors.alkategoria).value = doc.alkategoria
                                }
                                if (doc.alalkategoria !== undefined) {
                                    document.querySelector(s.selectors.alalkategoria).value = doc.alalkategoria
                                }
                            })
                        }
                    })

                    document.querySelector("#kategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
                    document.querySelector("#alkategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
                    document.querySelector("#alalkategoria").setAttribute("style", "color:grey; font-size: 14px;width:100px")
                }
            }
        })
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
                self.beallitasok.db.put(adatok).catch(function (err) {
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
                    if (megjegyzeskovetkezoido - megjegyzeselozoido === 0) {


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
                self.beallitasok.db.find({
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
                self.beallitasok.db.find({
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
            document.querySelector("alalkategoria").addEventListener("mouseover", function () {
                let alalkategoriaosszes = []
                self.beallitasok.db.find({
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
        let s = this.selectors
        if(document.querySelector(s.tipus)){
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
                        element.tipus
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
        if(document.querySelector(s.buttonjegyzet)){
        document.querySelector(s.buttonjegyzet).addEventListener("click", function () {

            chrome.windows.getCurrent(function (win) {
                self.beallitasok.db7
                    .find({
                        selector: {
                            windowid: win.id
                        }
                    })
                    .then(function (result) {
                        let doc = result.docs[0]
                        console.log("result:", result)

                        let jegyzetadatok = {}
                        jegyzetadatok._id = guidGenerator()
                        if (result.docs[0] != undefined) {
                            if (doc.kategoria != undefined) {
                                jegyzetadatok.kategoria = doc.kategoria
                                document.querySelector("#kategoria").value = doc.kategoria
                            }
                            if (doc.alkategoria != undefined) {
                                jegyzetadatok.alkategoria = doc.alkategoria
                                document.querySelector("#alkategoria").value = doc.alkategoria
                            }
                            if (doc.alalkategoria != undefined) {
                                jegyzetadatok.alalkategoria = doc.alalkategoria
                                document.querySelector("#alalkategoria").value = doc.alalkategoria
                            }
                        }
                        jegyzetadatok.datum = Date.now()

                        self.beallitasok.db.put(jegyzetadatok).then(function (doc) {
                            adatbazisboladatfrissito(db, jegyzetadatok._id)
                        })
                    })
            })
        })}
    }

    torlesgombinit() {
        let self = this
        let s = this.selectors
        if(document.querySelector(s.buttontorles)){
        document.querySelector(s.buttontorles).addEventListener("click", function () {
            self.beallitasok.db.get(self.id).then(function (doc) {
                return db.remove(doc)
            })
            setTimeout(() => {
                chrome.tabs.query(
                    {
                        active: true,
                        currentWindow: true
                    },
                    function (tabs) {
                        self.detailsfrissito(Tab.url, Tab)
                    }
                )
            }, 50)
        })}

    }
}
