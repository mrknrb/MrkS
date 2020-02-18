 chrome.tabs.query({
     currentWindow: true
   },
   function (tabs) {
     db7.find({
       selector: {
         windowid: tabs[0].windowId
       }
     }).then(function (result) {




     })

   })



 chrome.windows.getCurrent({
   populate: true
 }, function (win) {
   console.log(win)
 })

 /*
 alwaysOnTop: false
 focused: false
 height: 1056
 id: 313
 incognito: false
 left: -8
 state: "maximized"
 tabs: Array(6)
 0: {active: false, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico?_nc_x=f_EqXVPCWXW", …}
 1: {active: false, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png", …}
 2: {active: false, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "https://torrentz2.eu/favicon.ico", …}
 3: {active: false, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "", …}
 4: {active: false, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "https://www.google.hu/favicon.ico", …}
 5: {active: true, audible: false, autoDiscardable: false, discarded: false, favIconUrl: "https://www.google.com/images/icons/product/chrome-32.png", …}
 length: 6
 __proto__: Array(0)
 top: -8
 type: "normal"
 width: 1936
 */



 db7.allDocs({
   include_docs: true,
   attachments: true,
 }).then(function (mentwins) {})
 /*
 mentwins: 
 Object
 offset: 0
 rows: Array(11)

 0:
 doc:
 cim: "Nevtelen359"
 color: "#a0bdd8"
 datum: "Fri Aug 09 2019 13:34:44 GMT+0200 (közép-európai nyári idő)"
 tabs: Array(5)
 0: {id: "jegyz86b12bee-81db-dfb8-5241-4bf54fab07f7", tabid: 360, url: "https://www.google.hu/search?client=opera&q=unity+empty+gaeobject&sourceid=opera&ie=UTF-8&oe=UTF-8", cim: "unity empty gaeobject - Google-keresés", datum: "Fri Aug 09 2019 13:34:54 GMT+0200 (közép-európai nyári idő)", …}
 1: {id: "jegyz6a3bfb94-06fb-4f97-8787-985cb5a85afe", tabid: 364, url: "https://assetstore.unity.com/tools/visual-scripting", cim: "Visual Scripting - Asset Store", datum: "Fri Aug 09 2019 13:35:04 GMT+0200 (közép-európai nyári idő)", …}
 2: {id: "jegyzb9f36a11-06af-6141-4991-a75b801f4b4d", tabid: 367, url: "https://ludiq.io/bolt", cim: "Bolt: Visual Scripting for Unity", datum: "Fri Aug 09 2019 13:35:04 GMT+0200 (közép-európai nyári idő)", …}
 3: {id: "jegyz56d78d97-4e0b-0341-3ca1-c157350d6d07", tabid: 370, url: "https://docs.unity3d.com/ScriptReference/", cim: "Unity - Scripting API:", datum: "Fri Aug 09 2019 13:35:04 GMT+0200 (közép-európai nyári idő)", …}
 4: {id: "jegyz6102b84e-248c-d92d-6f06-8087172f9ee0", tabid: 373, url: "https://www.raywenderlich.com/980-introduction-to-unity-scripting", cim: "Introduction to Unity Scripting | raywenderlich.com", datum: "Fri Aug 09 2019 13:35:04 GMT+0200 (közép-európai nyári idő)", …}
 length: 5
 __proto__: Array(0)
 windowid: 359
 _id: "jegyz22683991-cbd5-4f59-afa6-5c2b9b67b445"
 _rev: "6-bd2b546e59e5bcf21cbc76461607dc4d"
 __proto__: Object
 id: "jegyz22683991-cbd5-4f59-afa6-5c2b9b67b445"
 key: "jegyz22683991-cbd5-4f59-afa6-5c2b9b67b445"
 value: {rev: "6-bd2b546e59e5bcf21cbc76461607dc4d"}
 __proto__: Object
 1: {id: "jegyz3cac3a11-eb5d-5c92-4651-d040510a4dbd", key: "jegyz3cac3a11-eb5d-5c92-4651-d040510a4dbd", value: {…}, doc: {…}}
 2: {id: "jegyz4ab3592d-a5fc-2473-1d98-ae6b9af7c556", key: "jegyz4ab3592d-a5fc-2473-1d98-ae6b9af7c556", value: {…}, doc: {…}}
 3: {id: "jegyz6254b13f-86a4-000c-44d7-d3c3b85ef7e1", key: "jegyz6254b13f-86a4-000c-44d7-d3c3b85ef7e1", value: {…}, doc: {…}}

 */

 db7.find({
   selector: {
     windowid: 359
   }
 }).then(function (mentwin) {
   console.log(mentwin)

 })
 /*
 docs: Array(1)
 0:
 cim: "Nevtelen359"
 color: "#a0bdd8"
 datum: "Fri Aug 09 2019 13:34:44 GMT+0200 (közép-európai nyári idő)"
 tabs: Array(5)
 0:
 cim: "unity empty gaeobject - Google-keresés"
 datum: "Fri Aug 09 2019 13:34:54 GMT+0200 (közép-európai nyári idő)"
 id: "jegyz86b12bee-81db-dfb8-5241-4bf54fab07f7"
 index: 0
 lastopen: "Fri Aug 09 2019 13:35:34 GMT+0200 (közép-európai nyári idő)"
 tabid: 360
 unloaded: false
 url: "https://www.google.hu/search?client=opera&q=unity+empty+gaeobject&sourceid=opera&ie=UTF-8&oe=UTF-8"
 __proto__: Object
 1: {id: "jegyz6a3bfb94-06fb-4f97-8787-985cb5a85afe", tabid: 364, url: "https://assetstore.unity.com/tools/visual-scripting", cim: "Visual Scripting - Asset Store", datum: "Fri Aug 09 2019 13:35:04 GMT+0200 (közép-európai nyári idő)", …}
 2: {id: "jegyzb9f36a1

 */
 let result = objArray.map(a => a.foo);
 document.querySelector('#ndmghm').addEventListener('', function (e) {
   //?load change click mouseup mouseenter

 })

 document.querySelector('#nfgfgn').addEventListener('', function (e) {
   //?load change click mouseup mouseenter

 })
 ghmfghm.forEach(function (element) {

 })

 mhgmfgh.array.forEach(element => {

 });


 mfmhfhm.forEach(function (element) {

 })

 dfgdfgdfg.forEach(function (element) {

 })

 nfgnfgbfgb.forEach(function (element) {

 })


 HTMLParagraphElement.forEach(function (element) {

 })

 bdfbdfb.forEach(function (element) {

 })

 document.querySelector('#').addEventListener('', function (e) {
   //?load change click mouseup mouseenter

 })

 document.querySelector('#fgnfgh').addEventListener('', function (e) {
   //?load change click mouseup mouseenter

 })


 document.querySelector('#addevent').addEventListener('mouseup', function (e) {
   nfgfgb
 })
 setTimeout(() => {

 }, 200)
 setTimeout(() => {

 }, 200)
 document.querySelector('#').addEventListener('one', function (e) {
   //?load change click mouseup mouseenter

 })

 document.querySelector('#').addEventListener('load', function (e) {

 })


 document.querySelector('#nfgfbfgbcgb').addEventListener('click', function (e) {

 })

 let gbbnb = document.querySelector('#gbbnb').getAttribute('gbbnb')


 let nghnghn = document.querySelector('#hfhfgh').getAttribute('hthfghg')

 let gargfg = document.querySelector('#gdgrdg').getAttribute('gdfgdrsg')

 document.querySelector('#').addEventListener('load', function (e) {

 })
 document.querySelector('#').addEventListener('load', function (e) {

 })

 document.querySelector('#mghn').addEventListener('mghn', function (e) {

 })

 document.querySelector('#id').addEventListener('load', function (e) {
   load
 })