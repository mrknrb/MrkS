
let youtube=false
if(window.location.host=="www.youtube.com" || window.location.host=="m.youtube.com" ){
    youtube=true
}

if(youtube){
setTimeout(() => {

        $(".ytp-unmute").click()


    setTimeout(() => {

//todo nem indul el automatikusan

        $(".player-control-play-pause-icon").click()
    }, 1000)

}, 400)
}