scrollbareltunteto()

let db = new PouchDB("NodesNet", {
    auto_compaction: true
})

//-----------------------------------------------------------------------------------------

$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $("#eloadoktable").DataTable({
        initComplete: function () {
        },
        // 'div.dataTables_scrollBody'
        searching: true,
        orderCellsTop: true,
        fixedHeader: true,
        fixedFooter: true,
        scrollY: 500,
        scrollCollapse: true,
        paging: false,
        info: false,
        ordering: false,
        contentPadding: "iii",
        data: {},
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

            //self.rowadatbeilleszto(row, data, dataIndex)
        },
        columnDefs: [
            {
                width: "100%",
                targets: [1]
            }
        ]
    });
});


//-----------------------------------------------------------------------------------------
$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $("#zenektable").DataTable({
        initComplete: function () {
        },
        // 'div.dataTables_scrollBody'
        searching: true,
        orderCellsTop: true,
        fixedHeader: true,
        fixedFooter: true,
        scrollY: 500,
        scrollCollapse: true,
        paging: false,
        info: false,
        ordering: false,
        contentPadding: "iii",
        data: {},
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

            //self.rowadatbeilleszto(row, data, dataIndex)
        },
        columnDefs: [
            {
                width: "100%",
                targets: [1]
            }
        ]
    });
});

document.querySelector("#ujeloadobutton").addEventListener("click", function (e) {

  // let eloadonev= document.querySelector("#ujeloadonev").value
    //document.querySelector("#youtubescraperiframe").setAttribute("eloadonev", eloadonev)
    let keresoszo=document.querySelector("#ujeloadonev").value +" musicc"
    document.querySelector("#youtubescraperiframe").src = `https://www.youtube.com/results?search_query=${keresoszo}`
})