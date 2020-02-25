class ModulFiles {
    constructor(tableselector, magassag) {
        let self = this
        this.tableselector = tableselector
        this.databasemagassag = magassag


        this.datatablebetoltve = false
        this.kategoriaszuro = "";
        this.alkategoriaszuro = "";
        this.alalkategoriaszuro = "";
        this.tipusszuro = "";
        this.eszkoz = eszkozdetektalo()
        getActualSession(function (session) {
            if (session.kategoria) {
                self.kategoriaszuro = session.kategoria;
            }
            if (session.alkategoria) {
                self.alkategoriaszuro = session.alkategoria;
            }
            if (session.alalkategoria) {
                self.alalkategoriaszuro = session.alalkategoria;
            }
            if (session.tipus) {
                self.tipusszuro = session.tipus;
            }
            self.datatablefrissitobetolto()
        })
    }
    datatablefrissitobetolto() {
        let self = this

        let kategoriak = {}
        kategoriak.kategoria = self.kategoriaszuro
        kategoriak.alkategoria = self.alkategoriaszuro
        kategoriak.alalkategoria = self.alalkategoriaszuro
        kategoriak.tipus = self.tipusszuro
        pouchkategoriaszuro(kategoriak, function (result) {


            if (self.datatablebetoltve == false) {
                self.datatablebetolto(result);
            } else {
                $(self.tableselector)
                    .dataTable()
                    .fnClearTable();
                $(self.tableselector)
                    .dataTable()
                    .fnAddData(result);
            }
        })


    }
    datatablebetolto(result) {

        let self = this
        let columns = [];
        let columndefs = [];
        let szuro = [];
        let order = [];
        if (this.eszkoz != "tab") {
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
                        .columns([4, 5, 6, 7])
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
                                    } else if (e == 7) {
                                        if (val != undefined) {
                                            self.tipusszuro = val;
                                        }
                                    }
                                    self.datatablefrissitobetolto();
                                });

                            select.on("mouseover", function () {
                                if (e == 4) {
                                    self.kategoriadropdownfrissito();
                                } else if (e == 5) {
                                    self.alkategoriadropdownfrissito();
                                } else if (e == 6) {
                                    self.alalkategoriadropdownfrissito();
                                } else if (e == 7) {
                                    self.tipusdropdownfrissito();
                                }
                            });
                        });

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

                data: result,
                columns: columns,
                columnDefs: columndefs,
                createdRow: function (row, data, dataIndex) {
                    //row.querySelectorAll("td")[1].innerText = "000";
                    self.adatfrissito2(row, data.doc);
                }
            });
        });

    }
    kategoriadropdownfrissito() {
        let self = this
        let kategoriak = {}
        kategoriak.kategoria = self.kategoriaszuro
        kategoriak.alkategoria = self.alkategoriaszuro
        kategoriak.alalkategoria = self.alalkategoriaszuro
        kategoriak.tipus = self.tipusszuro
        pouchkategoriadropdown(kategoriak, "kategoria", function (result) {
            var space = document.createElement("option");
            space.textContent = " "
            space.value = " "
            $(`${self.tableselector}_wrapper #select4`)
                .find("option")
                .remove()
                .end()
                .append(space)
            result.forEach(function (eg, i) {
                var el = document.createElement("option");
                el.textContent = eg;
                el.value = eg;
                document.querySelector(`${self.tableselector}_wrapper #select4`).appendChild(el);
            });
        })

    }
    alkategoriadropdownfrissito() {
        let self = this
        let kategoriak = {}
        kategoriak.kategoria = self.kategoriaszuro
        kategoriak.alkategoria = self.alkategoriaszuro
        kategoriak.alalkategoria = self.alalkategoriaszuro
        kategoriak.tipus = self.tipusszuro
        pouchkategoriadropdown(kategoriak, "alkategoria", function (result) {
            var space = document.createElement("option");
            space.textContent = " "
            space.value = " "
            $(`${self.tableselector}_wrapper #select5`)
                .find("option")
                .remove()
                .end()
                .append(space)
            result.forEach(function (eg, i) {
                var el = document.createElement("option");
                el.textContent = eg;
                el.value = eg;
                document.querySelector(`${self.tableselector}_wrapper #select5`).appendChild(el);
            });


        })


    }
    alalkategoriadropdownfrissito() {

        let self = this
        let kategoriak = {}
        kategoriak.kategoria = self.kategoriaszuro
        kategoriak.alkategoria = self.alkategoriaszuro
        kategoriak.alalkategoria = self.alalkategoriaszuro
        kategoriak.tipus = self.tipusszuro
        pouchkategoriadropdown(kategoriak, "alalkategoria", function (result) {
            var space = document.createElement("option");
            space.textContent = " "
            space.value = " "
            $(`${self.tableselector}_wrapper #select6`)
                .find("option")
                .remove()
                .end()
                .append(space)
            result.forEach(function (eg, i) {
                var el = document.createElement("option");
                el.textContent = eg;
                el.value = eg;
                document.querySelector(`${self.tableselector}_wrapper #select6`).appendChild(el);
            });


        })

    }
    tipusdropdownfrissito() {
        let self = this
        let kategoriak = {}
        kategoriak.kategoria = self.kategoriaszuro
        kategoriak.alkategoria = self.alkategoriaszuro
        kategoriak.alalkategoria = self.alalkategoriaszuro
        kategoriak.tipus = self.tipusszuro
        pouchkategoriadropdown(kategoriak, "tipus", function (result) {
            var space = document.createElement("option");
            space.textContent = " "
            space.value = " "
            $(`${self.tableselector}_wrapper #select7`)
                .find("option")
                .remove()
                .end()
            .append(space)
            result.forEach(function (eg, i) {
                var el = document.createElement("option");
                el.textContent = eg;
                el.value = eg;
                document.querySelector(`${self.tableselector}_wrapper #select7`).appendChild(el);
            });
        })
    }
    adatfrissito2(row, element) {
        let szoveghossz = 25
        if (this.eszkoz == "tab") {
            szoveghossz = 70
        }
        let self = this
        if (element != undefined) {
            let icon = `<img src="https://www.google.com/s2/favicons?domain=${element._id}" width="20" height="20" class="datafavicon">`;

            let cim = "";
            if (element.cim !== undefined) {
                cim = `<b style="font-weight:bold;line-height: 1" >${element.cim.trunc(
                    szoveghossz
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
                megjegyzes = element.megjegyzes.trunc(szoveghossz)
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

            if (this.eszkoz != "tab") {
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
                self.click(element._id)
            });

            row.querySelectorAll("td")[1].addEventListener("click", function () {

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
    }
    rowclickevent(callback) {

        this.click = function (id) {
            callback(id)
        }
    }
    sessionkategoriamento() {
        let self = this
        getActualSession(function (session) {
            console.log(self.kategoriaszuro)
            console.log(self.alkategoriaszuro)
            console.log(self.alalkategoriaszuro)
            db7.get(session._id).then(function (doc) {
                doc.kategoria = self.kategoriaszuro;
                doc.alkategoria = self.alkategoriaszuro;
                doc.alalkategoria = self.alalkategoriaszuro;
                doc.tipus = self.tipusszuro;
                return db7.put(doc);
            });

        })

    }
}