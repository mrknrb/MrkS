/*
ablakInit("palette", "500px", "500px", false, function () {

    let div = document.createElement("div")
    div.style.backgroundColor = "#282c34"
    div.id = "myPaletteDiv"
    div.style.height = "500px"
    div.style.width = "100%"
    document.querySelector("#palette").appendChild(div)


})
*/


let db = new PouchDB("NodesNet", {
    auto_compaction: true
})
let db7 = new PouchDB("SessionsNet", {
    auto_compaction: true
})

/**----------------------------------------------------------------------------------------------------------------------Graph init*/
var GO = go.GraphObject.make;
let myDiagram={}
function diagraminit() {

    myDiagram =
        GO(go.Diagram, "myDiagramDiv",
            {
                "LinkDrawn": showLinkLabel,
                "LinkRelinked": showLinkLabel,
                "undoManager.isEnabled": true,
                "draggingTool.isGridSnapEnabled": true,
            });

    nodesbetolto()

// replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
        GO(go.Link, // the whole link panel
            {
                routing: go.Link.AvoidsNodes,
                corner: 5,
                toShortLength: 4,
                relinkableFrom: true,
                relinkableTo: true,
                reshapable: true,
                resegmentable: true,
                // mouse-overs subtly highlight links:
                mouseEnter: function (e, link) {
                    link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                },
                mouseLeave: function (e, link) {
                    link.findObject("HIGHLIGHT").stroke = "transparent";
                },
                selectionAdorned: false
            },
            new go.Binding("points").makeTwoWay(),
            GO(go.Shape, // the highlight shape, normally transparent
                {
                    isPanelMain: true,
                    strokeWidth: 8,
                    stroke: "transparent",
                    name: "HIGHLIGHT"
                }),
            GO(go.Shape, // the link path shape
                {
                    isPanelMain: true,
                    stroke: "#303030",
                    strokeWidth: 3
                },
                new go.Binding("stroke", "isSelected", function (sel) {
                    return sel ? "dodgerblue" : "#303030";
                }).ofObject()),
            GO(go.Shape, // the arrowhead
                {
                    toArrow: "Triangle",
                    strokeWidth: 0,
                    fill: "#303030"
                }),
            GO(go.Panel, "Auto", // the link label, normally not visible
                {
                    visible: false,
                    name: "LABEL",
                    segmentIndex: 2,
                    segmentFraction: 0.5
                },
                new go.Binding("visible", "visible").makeTwoWay(),
                GO(go.Shape, "RoundedRectangle", // the label shape
                    {
                        fill: "#F8F8F8",
                        strokeWidth: 0
                    }),
                GO(go.TextBlock, "Yes", // the label
                    {
                        textAlign: "center",
                        font: "10pt helvetica, arial, sans-serif",
                        stroke: "#333333",
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay())
            )
        );

    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
}
function nodeStyle() {
    return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
            locationSpot: go.Spot.Center
        }
    ];
}

function makePort(name, align, spot, output, input) {
    var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
    // the port is basically just a transparent rectangle that stretches along the side of the node,
    // and becomes colored when the mouse passes over it
    return GO(go.Shape, {
        fill: "transparent", // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 12, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 12, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: "pointer", // show a different cursor to indicate potential link point
        mouseEnter: function (e, port) { // the PORT argument will be this Shape
            if (!e.diagram.isReadOnly) port.fill = "rgba(0,0,0,0.69)";
        },
        mouseLeave: function (e, port) {
            port.fill = "transparent";
        }
    });
}

function textStyle() {
    return {
        font: " 8pt Lato, Helvetica, Arial, sans-serif",
        stroke: "#000000"
    }
}


let nodetemps = [{
    nev: "",
    szin: "#e1e1e1"
},

    {
        nev: "Kek",
        szin: "#5f8ad3"
    },
    {
        nev: "Zold",
        szin: "#a4b88d"
    },
    {
        nev: "Lila",
        szin: "#918dc2"
    },
    {
        nev: "Narancs",
        szin: "#f3a863"
    },
    {
        nev: "Citrom",
        szin: "#f2cd4d"
    },
    {
        nev: "Piros",
        szin: "#e06366"
    },
    {
        nev: "Barna",
        szin: "#e2725b"
    }
]

function nodesbetolto() {
    let graphlinkmodel = []
    nodetemps.forEach(function (node) {

        myDiagram.nodeTemplateMap.add(node.nev,
            GO(go.Node, "Table", nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                GO(go.Panel, "Auto",
                    GO(go.Shape, "Rectangle", {
                            minSize: new go.Size(60, 30),
                            fill: node.szin,
                            stroke: "#303030",
                            strokeWidth: 2.5
                        },
                        new go.Binding("figure", "figure")),
                    GO(go.TextBlock, textStyle(), {
                            margin: 2,
                            minSize: new go.Size(60, 30),
                            maxSize: new go.Size(200, NaN),
                            wrap: go.TextBlock.WrapFit,
                            textAlign: "center",
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())
                ),
                // four named ports, one on each side:
                makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
                makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
                makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
                makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
            ));

        graphlinkmodel.push({category: node.nev})
    })


    paletteinit(graphlinkmodel)
}




// Make link labels visible if coming out of a "conditional" node.
// This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
function showLinkLabel(e) {
    var label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
}

// temporary links used by LinkingTool and RelinkingTool are also orthogonal:

// initialize the Palette that is on the left side of the page


// This is a re-implementation of the default animation, except it fades in from downwards, instead of upwards.
function animateFadeDown(e) {
    var diagram = e.diagram;
    var animation = new go.Animation();
    animation.isViewportUnconstrained = true; // So Diagram positioning rules let the animation start off-screen
    animation.easing = go.Animation.EaseOutExpo;
    animation.duration = 900;
    // Fade "down", in other words, fade in from above
    animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
    animation.add(diagram, 'opacity', 0, 1);
    animation.start();
}

/**----------------------------------------------------------------------------------------------------------------------Graph init*/


let detailsselectors = {
    divcontainer: "#detailsdiv",
}
let detailsbeallitasok = {
    automatavalto: false,
    divcontainerbebetoltes: true
}
let details = new ModulDetails(detailsselectors, detailsbeallitasok)

let fileid = window.frameElement.getAttribute("fileid")

let attman = new AttachmentManager({fileid: fileid, tipus: "conceptmap"})

details.detailsfrissito(fileid)
attman.betoltes(function (att) {
    if (att === "nincsattachment") {
        let diagram = {
            "class": "go.GraphLinksModel",
            "linkFromPortIdProperty": "fromPort",
            "linkToPortIdProperty": "toPort"
        }
        diagraminit()

        setTimeout(() => {
            start3()
        }, 10000);
        myDiagram.model = go.Model.fromJson(diagram)
    } else if(att === "error"){

    }
    else{
        diagraminit()

        setTimeout(() => {
            start3()
        }, 10000);


        myDiagram.model = go.Model.fromJson(att.model)
    }
})
elementhider("#detailsboxopen", "#detailsdiv")


function paletteinit(graphlinkmodel) {
    myPalette =
        GO(go.Palette, "myPaletteDiv", // must name or refer to the DIV HTML element
            {
                // Instead of the default animation, use a custom fade-down
                "animationManager.initialAnimationStyle": go.AnimationManager.None,
                "InitialAnimationStarting": animateFadeDown, // Instead, animate with this function

                nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
                model: new go.GraphLinksModel(graphlinkmodel)
            });

}



function save() {
    myDiagram.isModified = false;

            let data = {}
            data.model = JSON.parse(myDiagram.model.toJson())
            if (data.model.linkFromPortIdProperty != "fromPort") {
                data.model.linkFromPortIdProperty = "fromPort"
                data.model.linkToPortIdProperty = "toPort"
            }
            attman.mentes(data)

}

function start3() {
    save()

    setTimeout(start3, 10000);
}

document.querySelector('#savebutton').addEventListener('click', function (e) {
    save()
})
//---------------------------------------------------------------------------------------------------------------SAVE


let diagram = {
    "class": "go.GraphLinksModel",
    "linkFromPortIdProperty": "fromPort",
    "linkToPortIdProperty": "toPort",
    "nodeDataArray": [{
        "category": "Comment",
        "loc": "360 -10",
        "text": "Kookie Brittle",
        "key": -13
    },
        {
            "key": -1,
            "category": "Start",
            "loc": "175 0",
            "text": "Start"
        },
        {
            "key": 0,
            "loc": "-5 75",
            "text": "Preheat oven to 375 F"
        },
        {
            "key": 1,
            "loc": "175 100",
            "text": "In a bowl, blend: 1 cup margarine, 1.5 teaspoon vanilla, 1 teaspoon salt"
        },
        {
            "key": 2,
            "loc": "175 200",
            "text": "Gradually beat in 1 cup sugar and 2 cups sifted flour"
        },
        {
            "key": 3,
            "loc": "175 290",
            "text": "Mix in 6 oz (1 cup) Nestle's Semi-Sweet Chocolate Morsels"
        },
        {
            "key": 4,
            "loc": "175 380",
            "text": "Press evenly into ungreased 15x10x1 pan"
        },
        {
            "key": 5,
            "loc": "355 85",
            "text": "Finely chop 1/2 cup of your choice of nuts"
        },
        {
            "key": 6,
            "loc": "175 450",
            "text": "Sprinkle nuts on top"
        },
        {
            "key": 7,
            "loc": "175 515",
            "text": "Bake for 25 minutes and let cool"
        },
        {
            "key": 8,
            "loc": "175 585",
            "text": "Cut into rectangular grid"
        },
        {
            "key": -2,
            "category": "End",
            "loc": "175 660",
            "text": "Enjoy!"
        }
    ],
    "linkDataArray": [{
        "from": 1,
        "to": 2,
        "fromPort": "B",
        "toPort": "T"
    },
        {
            "from": 2,
            "to": 3,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 3,
            "to": 4,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 4,
            "to": 6,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 6,
            "to": 7,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 7,
            "to": 8,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 8,
            "to": -2,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": -1,
            "to": 0,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": -1,
            "to": 1,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": -1,
            "to": 5,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 5,
            "to": 4,
            "fromPort": "B",
            "toPort": "T"
        },
        {
            "from": 0,
            "to": 4,
            "fromPort": "B",
            "toPort": "T"
        }
    ]
}
/** hátha jól jön még*/
