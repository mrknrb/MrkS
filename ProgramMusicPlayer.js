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

let youtubescript1mehet=false
document.querySelector("#ujeloadobutton").addEventListener("click", function (e) {

  // let eloadonev= document.querySelector("#ujeloadonev").value
    //document.querySelector("#youtubescraperiframe").setAttribute("eloadonev", eloadonev)
    let keresoszo=document.querySelector("#ujeloadonev").value
    window.open(`https://music.youtube.com/search?q=${keresoszo}`, "_blank")
    youtubescript1mehet=true
    setTimeout(() => {
        youtubescript1mehet=false

    }, 20000)
  //  document.querySelector("#youtubescraperiframe").src = `https://music.youtube.com/search?q=dream+theater${keresoszo}`
})


let youtubescript2mehet=false
let aktualislink=""
function youtubescript2indito(linkek){
    let aktualislinkszam=0
    let osszeslinkszam=linkek.length
    // let eloadonev= document.querySelector("#ujeloadonev").value
    //document.querySelector("#youtubescraperiframe").setAttribute("eloadonev", eloadonev)
    aktualislink=linkek[aktualislinkszam]
    window.open(linkek[aktualislinkszam], "_blank")

    //  document.querySelector("#youtubescraperiframe").src = `https://music.youtube.com/search?q=dream+theater${keresoszo}`
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("request:", request);

    if (request == "youtubescript1mehet"&&youtubescript1mehet) {

        sendResponse("mehet");
    }else if(request.uzenettipus=="albumok"){

        console.log(request.data)
        youtubescript2indito(request.data)


    }else if(request==aktualislink){

        sendResponse("mehet");

    }else if(request.uzenettipus=="youtubeartistadatok"){

        console.log("youtube album adatok",request)

    }
});
