class ModulFiles {

    constructor(divselector, tableselector, magassag) {
        this.divselector = divselector
        this.tableselector = tableselector
        this.datatablebetoltve = false
        this.databasemagassag = magassag
        this.kategoriaszuro = undefined;
        this.alkategoriaszuro = undefined;
        this.alalkategoriaszuro = undefined;
        this.datatablefrissitobetolto()
    }


    datatablefrissitobetolto() {
        let self = this
        let filter = {};
        filter.datum = {};
        let fields = [];
        fields.push("datum");
        filter.datum.$gte = null;
        if (self.kategoriaszuro != undefined && self.kategoriaszuro != "") {
            filter.kategoria = self.kategoriaszuro;
            fields.push("kategoria");
        }
        if (self.alkategoriaszuro != undefined && self.alkategoriaszuro != "") {
            filter.alkategoria = self.alkategoriaszuro;
            fields.push("alkategoria");
        }
        if (self.alalkategoriaszuro != undefined && self.alalkategoriaszuro != "") {
            filter.alalkategoria = self.alalkategoriaszuro;
            fields.push("alalkategoria");
        }

        db.createIndex({
            index: {
                fields: fields
            }
        })
            .then(function () {
                return db.find({
                    selector: filter,
                    sort: [{datum: "desc"}]
                });
            })
            .then(function (result) {
                if (self.datatablebetoltve == false) {
                    self.datatablebetolto(result);
                } else {
                    console.log(result);
                    $(self.tableselector)
                        .dataTable()
                        .fnClearTable();
                    $(self.tableselector)
                        .dataTable()
                        .fnAddData(result.docs);
                }
            });
    };

    datatablebetolto(result) {

        let self = this
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

        self.datatablebetoltve = true;
        // Setup - add a text input to each footer cell
        $(document).ready(function () {
            $(self.tableselector).DataTable({
                initComplete: function () {
                    this.api()
                        .columns([4, 5, 6])
                        .every(function (e) {
                            let column2 = this;

                            //szuro variablebe mentés
                            var column = this;
                            var select = $(
                                `<select id="select${e}" class="adattablaselect" style="width: 35px"><option value=""></option></select>`
                            )
                                .appendTo($(column.header()))
                                .on("change", function () {
                                    //Cannot read property 'replace' of null
                                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                    console.log("val:", val);
                                    if (e == 4) {
                                        if (val != undefined) {
                                            self.kategoriaszuro = val;
                                            self.alkategoriaszuro = "";
                                            self.alalkategoriaszuro = "";
                                        }
                                    } else if (e == 5) {
                                        if (val != undefined) {
                                            self.alkategoriaszuro = val;
                                            self.alalkategoriaszuro = "";
                                        }
                                    } else if (e == 6) {
                                        if (val != undefined) {
                                            self.alalkategoriaszuro = val;
                                        }
                                    }
                                    datatablefrissitobetolto();
                                });

                            select.on("mouseover", function () {
                                if (e == 4) {
                                    self.kategoriadropdownfrissito();
                                } else if (e == 5) {
                                    self.alkategoriadropdownfrissito();
                                } else if (e == 6) {
                                    self.alalkategoriadropdownfrissito();
                                }
                            });
                        });
                    let szuromentesebutton = document.createElement("button");
                    szuromentesebutton.type = "button";
                    szuromentesebutton.innerText = "Szuro mentese";
                    szuromentesebutton.onclick = function (params) {
                        var column = this;

                        self.sessionkategoriamento(self.kategoriaszuro, self.alkategoriaszuro, self.alalkategoriaszuro)
                    };
                    szuromentesebutton.id = "szuromentesebutton";
                    document
                        .querySelector(self.divselector)
                        .insertAdjacentElement("afterbegin", szuromentesebutton);


                },
                deferRender: true,
                scroller: {
                    displayBuffer: 1.6,
                    loadingIndicator: true,
                    boundaryScale: 0.5
                },
                scrollY: self.databasemagassag,
                searching: false,
                ordering: false,
                paging: true, //kell a scrollerhez
                // "pageLength": 50,
                info: false,
                retrieve: true, //az elején előjövő bug ellen lehet, hogy jó most tesztelem  https://datatables.net/manual/tech-notes/3

                data: result.docs,
                columns: columns,
                columnDefs: columndefs,
                createdRow: function (row, data, dataIndex) {
                    //row.querySelectorAll("td")[1].innerText = "000";
                    this.adatfrissito2(row, data);
                }
            });
        });

    }

    kategoriadropdownfrissito() {
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
            .then(function (result) {
                console.log("result:", result);
                result.docs.forEach(element => {
                    kategoriaosszes.push(element.kategoria);
                });
                let kategoriaarray = kategoriaosszes.filter(function (item, pos) {
                    return kategoriaosszes.indexOf(item) == pos;
                });

                $(`#select4`)
                    .find("option")
                    .remove()
                    .end();

                kategoriaarray.forEach(function (eg, i) {
                    var el = document.createElement("option");
                    el.textContent = eg;
                    el.value = eg;
                    document.querySelector(`#select4`).appendChild(el);
                });
            })
            .catch(function (err) {
                //console.log(err);
            });
    }

    alkategoriadropdownfrissito() {
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
            .then(function (result) {
                // console.log(result)
                // console.log(result.docs[0])
                result.docs.forEach(element => {
                    if (element.kategoria === kategoriaszuro) {
                        alkategoriaosszes.push(element.alkategoria);
                    }
                });
                let alkategoriaarray = alkategoriaosszes.filter(function (item, pos) {
                    return alkategoriaosszes.indexOf(item) == pos;
                });

                $(`#select5`)
                    .find("option")
                    .remove()
                    .end();
                alkategoriaarray.forEach(function (eg, i) {
                    var el = document.createElement("option");
                    console.log("eg:", eg);
                    el.textContent = eg;
                    el.value = eg;
                    document.querySelector(`#select5`).appendChild(el);
                });
            })
            .catch(function (err) {
                //console.log(err);
            });
    }

//default szuro visszaálítása és jelenlegi szuro mentese berak
    alalkategoriadropdownfrissito() {
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
            .then(function (result) {
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
                let alalkategoriaarray = alalkategoriaosszes.filter(function (item, pos) {
                    return alalkategoriaosszes.indexOf(item) == pos;
                });

                $(`#select6`)
                    .find("option")
                    .remove()
                    .end();
                alalkategoriaarray.forEach(function (eg, i) {
                    var el = document.createElement("option");
                    console.log("eg:", eg);
                    el.textContent = eg;
                    el.value = eg;
                    document.querySelector(`#select6`).appendChild(el);
                });
            })
            .catch(function (err) {
                //console.log(err);
            });
    }

    adatfrissito2(row, element) {
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
                "background-color:" + ranghattergenerator(element.rang)
            );

            row.addEventListener("click", function () {
                adatbazisboladatfrissito(db, element._id);
            });

            row.querySelectorAll("td")[1].addEventListener("click", function () {
                console.log("element.tipus:", element.tipus);
                filebetolto(element._id, element.tipus);
            });

            row.querySelectorAll("td")[0].addEventListener("click", function () {
                let biztosan = confirm("Biztosan Torlod?");
                if (biztosan) {
                    db.get(element._id).then(function (doc) {
                        //  console.log(e.id)
                        return db.remove(doc);
                    });
                    row.remove();
                }
            });
        }
    };

    sessionkategoriamento(kategoriaszuro, alkategoriaszuro, alalkategoriaszuro) {

        getActualSession(function (session) {

            db7.get(session._id).then(function (doc) {
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

        })

    }
}