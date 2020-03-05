window.addEventListener("message", function (message) {

    console.log(message)

}, false);


console.log("mukodik")


let elozoszam = 0

function start3() {

let filmslist=[]
    let jelenlegiszam = 0
    document.querySelectorAll(".film-tile").forEach(function (film) {

   let datum=document.createElement("div")
        datum.innerHTML=film.querySelector(".director-year").outerHTML

        datum.querySelector("span").remove()

      let datum2=datum.innerText
        let filmobj={
            url:film.querySelector(".film-link").href,
            title:film.querySelector(".film-title").innerText,
            pos:film.querySelector(".list-film-position").innerHTML,
            rendezo:film.querySelector(".director-link").innerText,
            rendezolink:film.querySelector(".director-link").href,
            datum:datum2
        }
if(film.querySelector(".film-thumb")){

    filmobj.img=film.querySelector(".film-thumb").src
}
        filmslist.push(filmobj)
        jelenlegiszam++
    })
    if (jelenlegiszam != elozoszam) {


        $(".app-load-more").click()
        setTimeout(start3, 1500);

        elozoszam = jelenlegiszam
    }else {
let message={}
        message.data=filmslist
        message.uzenettipus="filmslist"
        window.parent.postMessage(message, "*");

    }

}

setTimeout(start3, 500);

