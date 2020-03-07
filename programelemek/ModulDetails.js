let detailshtml=`<div id="detailsbox" style="min-width: 385px; margin:0; padding:0;">
    <table class="tg" id="felsotabla" style="width:100%">
    <tr style="height:20px">
    <td class="tg-0lax">
    <button id="torlesgomb" style="height:23px; width:26px;
background-color: rgba(255, 255, 255, 0.5);
border: none;
color: black;
font-weight: bold;
font-size: 23px;
text-align: center">x</button>
</td>
<td class="tg-0lax">
    <div id="urllogo" style="float:left"></div>
    <input id="urlmezo" type="text"
style="  background-color: rgba(255, 255, 255, 0);color:rgb(156, 156, 156);
border: 0cm; text-align:left;font-size: 12px;height:20px;width:60%; box-sizing:border-box;-moz-box-sizing:border-box">
<input id=attachfilesinput list="attachedfileslist" style="height:20px;color:rgb(190, 148, 92);text-align:left;font-weight: bold;font-size: 12px;width:75px;  -webkit-appearance: none;
appearance: none;
padding: 0px">
<datalist id="attachedfileslist">
    </datalist>
    <select id="attachfilescommand" style="max-width:25px;font-size: 12px;height:20px">
    <option value="delete">delete</option>
    <option value="download">download</option>
    <option value="console">console</option>
    <option value="new">new</option>
    <option selected="selected" value=""></option>
    </select>

    <button id="jegyzetgomb" style="height:23px; width:26px;
background-color: rgba(255, 255, 255, 0.5);
border: none;
color: black;
font-weight: bold;
font-size: 23px;float: right;
text-align: center">+</button>
</td>
</tr>
<tr>
<td class="tg-0lax" style="word-wrap: break-word; width: 20px">
    <select id="rang" style="color:rgb(0, 0, 255);text-align:center;font-weight: bold;font-size: 22px">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option selected="selected" value=""></option>
    </select>
    </td>
    <td class="tg-0lax">
    <input id="urlcim" type="text"
style="  background-color: rgba(255, 255, 255, 0);
border: 0cm; text-align:left;font-weight: bold;font-size: 14px;height:25px;width:100%; box-sizing:border-box;-moz-box-sizing:border-box">
</td>
</tr>
<tr >
<td class="tg-s268" colspan="2">
    <input id=kategoria list="kategorialista" style="color:rgb(190, 148, 92);text-align:left;font-weight: bold;font-size: 14px;width:100px;  -webkit-appearance: none;
appearance: none;
padding: 0px">
<datalist id="kategorialista">
    </datalist>
    <input id=alkategoria list="alkategorialista" style="color:rgb(190, 148, 92);text-align:left;font-weight: bold;font-size: 14px;width:100px; -webkit-appearance: none;
    -moz-appearance: none;
appearance: none;
padding: 0px">
<datalist id="alkategorialista">
    </datalist>
    <input id=alalkategoria list="alalkategorialista" style="color:rgb(190, 148, 92);text-align:left;font-weight: bold;font-size: 14px;width:100px; -webkit-appearance: none;
    -moz-appearance: none;
appearance: none;
padding: 0px">
<datalist id="alalkategorialista">
    </datalist>
    </td>
    </tr>
    <tr>
    <td class="tg-s268" colspan="2">
    <input id=tipus list="tipuslista"
style="color:rgb(59, 141, 56);text-align:left;font-weight: bold;font-size: 14px;width:65px; box-sizing:border-box;-moz-box-sizing:border-box">
    <datalist id="tipuslista">
    </datalist>
    <select id="allapot" style="color:rgb(0, 0, 0);text-align:center;font-weight: bold;font-size: 15px;width:65px">
    <option value="kiemelt">Kiemelt</option>
    <option value="archivalt">Archivalt</option>
    <option value="offos">Offos</option>
    <option hidden value="uj">Uj</option>
    <option hidden value="inaktiv">Inaktiv</option>
    <option hidden value="regi">Regi</option>
    <option selected="selected" value=""></option>
    </select>
    <select id="alkotasallapot"
style="color:rgb(0, 0, 0);text-align:center;font-weight: bold;font-size: 15px;width:65px">
    <option value="befejezve&jegyz">Befej&jegyz</option>
    <option value="befejezve">Befejezve</option>
    <option value="folyamatban">Folyamatban</option>
    <option value="letöltve">Letöltve</option>
    <option value="könyvtár">Könyvtár</option>
    <option value="beszerezni">Beszerezni</option>
    <option selected="selected" value=""></option>
    </select>
    <input type="text" id="datum"
style="color:rgb(0, 0, 0);text-align:left;font-weight: bold;font-size: 15px;width: 90px "></input>

    </td>
    </tr>
    <tr>
    <td class="tg-s268" colspan="2"><textarea id="megjegyzesmezo"
style="width:100%; box-sizing:border-box;-moz-box-sizing:border-box"></textarea>
    </td>
    </tr>
    </table>

    </div>`



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
        this.beallitasok.manualtipus = beallitasok.manualtipus

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
            this.selectors.attachfilesinput = "#attachfilesinput"
            this.selectors.attachedfileslist = "#attachedfileslist"
            this.selectors.attachfilescommand = "#attachfilescommand"
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
        if (this.beallitasok.automatavalto == true&&eszkoz=="sidebar") {
            this.tabbetoltindulas()//--------------------------ok
            this.tabschangeeventlistener()//--------------------------ok
        }


        this.inputeventmentoinit()
        this.tipuslistabetoltoinit()
        this.kategoriaklistabetoltoinit()
        //todo az új jegyzetet csináld meg
        this.jegyzetcreateinit()
        this.torlesgombinit()
        this.fajlfeltoltesinit()
    }


    dombetolto() {
        let self = this
        document.querySelector(self.selectors.divcontainer).innerHTML =detailshtml
/*
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
        */

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

                if (Tab != undefined) {
                    document.querySelector(s.cim).value = Tab.title

                } else {
                    console.log(adat)
                    document.querySelector(s.cim).value = ""
                }
            } else if (adat == "tipus" && self.beallitasok.manualtipus) {

                document.querySelector(s.tipus).value = self.beallitasok.manualtipus


            } else if (adat == "tipus" && Tab) {

                document.querySelector(s.tipus).value = "link"


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
                if (doc) {
                    document.querySelector(s.urllogo).innerHTML = icongenerator(id2, doc.tipus)
                } else {
                    document.querySelector(s.urllogo).innerHTML = icongenerator(id2, "")
                }
            }
            if (document.querySelector(s.urlmezo)) {
                document.querySelector(s.urlmezo).value = id2
            }
            document.querySelector(s.attachfilesinput).value = ""

            document.querySelector(s.attachedfileslist).innerHTML = ""
            document.querySelector(s.attachfilescommand).value = ""


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
                let tipusseged = document.querySelector(s.tipus)
                let adatok = {}
                adatok._id = self.id
                adatok[selectortype] = document.querySelector(selector).value
                if (selectortype !== "cim") {
                    if (cimseged && cimseged.value) {
                        adatok.cim = cimseged.value
                    }
                }
                if (kategoriaseged) {
                    if (kategoriaseged.value) {
                        adatok.kategoria = kategoriaseged.value
                    }
                }
                if (alkategoriaseged) {
                    if (alkategoriaseged.value) {
                        adatok.alkategoria = alkategoriaseged.value
                    }
                }
                if (alalkategoriaseged) {
                    if (alalkategoriaseged.value) {
                        adatok.alalkategoria = alalkategoriaseged.value
                    }
                }
                if (tipusseged) {
                    if (tipusseged.value) {
                        adatok.tipus = tipusseged.value
                    }
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
                        let tipusseged = document.querySelector(s.tipus)
                        let adatok = {}
                        adatok._id = self.id
                        adatok[selectortype] = document.querySelector(selector).value
                        if (selectortype !== "cim") {
                            if (cimseged && cimseged.value) {
                                adatok.cim = cimseged.value
                            }
                        }

                        if (kategoriaseged) {
                            if (kategoriaseged.value) {
                                adatok.kategoria = kategoriaseged.value
                            }
                        }
                        if (alkategoriaseged) {
                            if (alkategoriaseged.value) {
                                adatok.alkategoria = alkategoriaseged.value
                            }
                        }
                        if (alalkategoriaseged) {
                            if (alalkategoriaseged.value) {
                                adatok.alalkategoria = alalkategoriaseged.value
                            }
                        }
                        if (tipusseged) {
                            if (tipusseged.value) {
                                adatok.tipus = tipusseged.value
                            }
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

                let kategoriak = {}
                kategoriak.kategoria = document.querySelector(s.kategoria).value
                kategoriak.alkategoria = document.querySelector(s.alkategoria).value
                kategoriak.alalkategoria = document.querySelector(s.alalkategoria).value
                kategoriak.tipus = document.querySelector(s.tipus).value

                pouchkategoriadropdown(kategoriak, "kategoria", function (result) {

                    var select = document.querySelector(s.kategoriadata)
                    $(s.kategoriadata).empty()
                    for (var i = 0; i < result.length; i++) {
                        var opt = result[i]
                        var el = document.createElement("option")
                        el.textContent = opt
                        el.value = opt
                        select.appendChild(el)
                    }
                })


            })
            document.querySelector(s.alkategoria).addEventListener("mouseover", function () {


                let kategoriak = {}
                kategoriak.kategoria = document.querySelector(s.kategoria).value
                kategoriak.alkategoria = document.querySelector(s.alkategoria).value
                kategoriak.alalkategoria = document.querySelector(s.alalkategoria).value
                kategoriak.tipus = document.querySelector(s.tipus).value

                pouchkategoriadropdown(kategoriak, "alkategoria", function (result) {

                    var select = document.querySelector(s.alkategoriadata)
                    $(s.alkategoriadata).empty()
                    for (var i = 0; i < result.length; i++) {
                        var opt = result[i]
                        var el = document.createElement("option")
                        el.textContent = opt
                        el.value = opt
                        select.appendChild(el)
                    }
                })


            })
            document.querySelector(s.alalkategoria).addEventListener("mouseover", function () {

                let kategoriak = {}
                kategoriak.kategoria = document.querySelector(s.kategoria).value
                kategoriak.alkategoria = document.querySelector(s.alkategoria).value
                kategoriak.alalkategoria = document.querySelector(s.alalkategoria).value
                kategoriak.tipus = document.querySelector(s.tipus).value

                pouchkategoriadropdown(kategoriak, "alalkategoria", function (result) {

                    var select = document.querySelector(s.alalkategoriadata)
                    $(s.alalkategoriadata).empty()
                    for (var i = 0; i < result.length; i++) {
                        var opt = result[i]
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
        let self = this
        let s = this.selectors
        if (document.querySelector(s.tipus)) {
            document.querySelector(s.tipus).addEventListener("mouseover", function () {

                let kategoriak = {}
                kategoriak.kategoria = document.querySelector(s.kategoria).value
                kategoriak.alkategoria = document.querySelector(s.alkategoria).value
                kategoriak.alalkategoria = document.querySelector(s.alalkategoria).value
                kategoriak.tipus = document.querySelector(s.tipus).value

                pouchkategoriadropdown(kategoriak, "tipus", function (result) {

                    var select = document.querySelector(s.tipusdata)
                    $(s.tipusdata).empty()
                    for (var i = 0; i < result.length; i++) {
                        var opt = result[i]
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
                        if (session.kategoria != undefined && session.kategoria != "") {
                            jegyzetadatok.kategoria = session.kategoria
                            document.querySelector(s.kategoria).value = session.kategoria
                        }
                        if (session.alkategoria != undefined && session.alkategoria != "") {
                            jegyzetadatok.alkategoria = session.alkategoria
                            document.querySelector(s.alkategoria).value = session.alkategoria
                        }
                        if (session.alalkategoria != undefined && session.alalkategoria != "") {
                            jegyzetadatok.alalkategoria = session.alalkategoria
                            document.querySelector(s.alalkategoria).value = session.alalkategoria
                        }

                    }
                    document.querySelector(s.tipus).value = "jegyzet"

                    jegyzetadatok.tipus = "jegyzet"
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
                        return db.remove(doc)
                    }
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

    fajlfeltoltesinit() {

        function ures() {
            attachfilesinput.value = ""
            attachfilescommand.value = ""
        }

        let self = this
        let s = this.selectors
        let attachname = "att"
        let attachfilesinput = document.querySelector(s.attachfilesinput)
        let attachfilescommand = document.querySelector(s.attachfilescommand)
        let feltoltes = document.createElement("input")
        feltoltes.type = "file"
        feltoltes.addEventListener("change", function (e) {
            function importFun(e) {
                var files = e.target.files,
                    reader = new FileReader()
                reader.onload = _imp
                reader.readAsText(files[0])
            }

            importFun(e)

            function _imp() {
                let importdata = this.result

                db.get(self.id, {attachments: true, binary: true}).then(function (doc) {
                    if (doc._attachments == undefined) {
                        doc._attachments = {}
                        doc._attachments[attachname] = {}
                        doc._attachments[attachname].content_type = "text/plain"
                        doc._attachments[attachname].data = blobcreate(importdata)

                    } else {

                        doc._attachments[attachname] = {}
                        doc._attachments[attachname].content_type = "text/plain"
                        doc._attachments[attachname].data = blobcreate(importdata)

                    }
                    console.log(doc)
                    return db.put(doc);
                }).then(function (d) {

                    ures()
                }).catch(function (err) {
                    alert(err)
                })
                //here is your imported data, and from here you should know what to do with it (save it to some storage, etc.)
                // console.log(_myImportedData);
                // feltoltes.value = "" //make sure to clear input value after every import
            }
        }, false)
        attachfilescommand.addEventListener("change", function (e) {

            attachname = attachfilesinput.value
            if (e.target.value == "new") {
                if (attachfilesinput.value) {

                    db.get(self.id, {attachments: true, binary: true}).then(function (doc) {
                        if (!doc._attachments) {
                            feltoltes.click()

                        } else if (!doc._attachments[attachname]) {
                            feltoltes.click()
                        } else {
                            let biztosan = confirm("Foglalt fájlnév! Felülírod?");
                            if (biztosan) {
                                feltoltes.click()

                            }

                        }
                    })


                } else {
                    alert("Írj be egy fájlnevet!")
                }
            } else if (e.target.value == "delete") {
                db.get(self.id, {attachments: true, binary: true}).then(function (doc) {
                    if (!doc._attachments) {
                        alert("Attachment nem található!")
                        ures()
                    } else if (doc._attachments[attachname]) {
                        let biztosan = confirm("Biztosan törölni akarod?");
                        if (biztosan) {
                            delete doc._attachments[attachname]
                            ures()
                            return db.put(doc);
                        }
                    } else {
                        alert("Attachment nem található!")

                    }
                    ures()
                })


            } else if (e.target.value == "console") {
                let attman= new AttachmentManager({fileid:self.id,tipus:false,attachmentname:attachname})
                attman.betoltes(function (att) {
                    console.log(att)
                    ures()
                })
            } else if (e.target.value == "download") {
                let attman= new AttachmentManager({fileid:self.id,tipus:false,attachmentname:attachname})
                attman.betoltes(function (att) {
                        var _myArray = JSON.stringify(att)
                        var vLink = document.createElement("a"),
                            vBlob = new Blob([_myArray], {
                                type: "octet/stream"
                            }),
                            vName = attachname+".txt",
                            vUrl = window.URL.createObjectURL(vBlob);
                        vLink.setAttribute("href", vUrl);
                        vLink.setAttribute("download", vName);
                        vLink.click();
                    ures()
                })

            }

        })
        attachfilesinput.addEventListener("mouseover", function (e) {

            db.get(self.id, {attachments: true}).then(function (doc) {


                var select = document.querySelector(s.attachedfileslist)
                $(s.attachedfileslist).empty()
                for (let attachment in  doc._attachments) {

                    var opt = attachment
                    var el = document.createElement("option")
                    el.textContent = opt
                    el.value = opt
                    select.appendChild(el)

                    // propertyName is what you want
                    // you can get the value like this: myObject[propertyName]
                }

            })
        })
    }

}