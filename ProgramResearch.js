var db = new PouchDB("NodesNet", {
    auto_compaction: true
})
var db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})

function datatablebetolto() {
    let columns = [
        {
            title: "V",
            defaultContent: ""
        },
        {
            title: "A",
            defaultContent: ""
        },
        {
            title: "Cim",
            defaultContent: ""
        },
        {
            title: "Leiras",
            defaultContent: ""
        },
        {
            title: "Tags",
            defaultContent: ""
        }
    ];
    let columndefs = [
        {
            width: 20,
            targets: 0
        },
        {
            width: "50%",
            targets: [2]
        },
        {
            width: "50%",
            targets: [3],
            render: $.fn.dataTable.render.ellipsis(50)
        }
    ];


    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $("#researchtable").DataTable({
            initComplete: function () {


            },


            scrollY: 600,
            searching: false,
            ordering: false,
            paging: false, //kell a scrollerhez
            // "pageLength": 50,
            info: false,
            data: [],
            columns: columns,
            columnDefs: columndefs,
            createdRow: function (row, data, dataIndex) {
                //row.querySelectorAll("td")[1].innerText = "000";
                console.log(data)
                console.log(row)
                rowadatbeilleszto(row, data)
            }
        });
    });

}

function rowadatbeilleszto(row, data) {
    let col = row.querySelectorAll("td");
    //col[0].innerHTML = icon;

    let votes = document.createElement("b")

    votes.innerText = data.votes
    let cim = document.createElement("b")
    cim.innerText = data.talalatcim
    col[1].appendChild(votes)
    col[2].appendChild(cim)
}


datatablebetolto()

function tablefrissito(talalatok) {

    $("#researchtable")
        .DataTable()
        .clear();
    // console.log("tabsadatok:", tabsadatok);
    $("#researchtable")
        .DataTable()
        .rows.add(talalatok); // Add new data
    $("#researchtable")
        .DataTable()
        .columns.adjust()
        .draw();
    setTimeout(() => {
        if (
            document.querySelector("#researchtable" + " .dataTables_empty") !=
            null
        ) {
            tablefrissito();
        } else {
        }
    }, 1000);


}


function kereso(szo, tipus, callback) {
    let queryurl = ""
    if (tipus == "stack") {
        queryurl = "https://stackoverflow.com/search?q="
    }

    $.get(queryurl + szo, function (html) {

        var elements = $(html).find("div.question-summary.search-result")
        let talalatok = []
        elements.each(function (e) {
            //console.log(this.innerText)
            // $(this).find("vote-count-post ")
            let votes = $(this).find(".vote-count-post strong")[0].innerText
            let talalatcim = $(this).find(".result-link a")[0].title
            let talalat = {votes: votes, talalatcim: talalatcim}
            talalatok.push(talalat)
        })
        callback(talalatok)
    });
}


document.querySelector("#search").addEventListener("click", function (e) {
    kereso(document.querySelector("#searchtext").value, "stack", function (talalatok) {
        tablefrissito(talalatok)
    })
})

ablakInit("test","500px","500px",true,function () {
    let table=document.createElement("table")
    table.class="display compact"
    table.id="datatable"
    document.querySelector("#test").appendChild(table)

    let datatable = new ModulFiles("#datatable", 400)
})
ablakInit("test2","500px","500px",true,function () {
    let table=document.createElement("table")
    table.class="display compact"
    table.id="datatable2"
    document.querySelector("#test2").appendChild(table)

    let datatable = new ModulFiles("#datatable2", 400)

})
let basicstyletables = `#datatable2 tbody th, #datatable2 tbody td, #datatable tbody th, #datatable tbody td{ padding: 0px 0px;}`
var styleSheettables = document.createElement("style");
styleSheettables.type = "text/css";
styleSheettables.innerText = basicstyletables;
document.head.appendChild(styleSheettables);