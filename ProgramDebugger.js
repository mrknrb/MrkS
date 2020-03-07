window.addEventListener("message", function (message) {

    if (message.data.kerestipus == "erroruzenet") {
        const log = document.querySelector('#debugszovegmezo');

            log.textContent = log.textContent +`${JSON.stringify(message.data.uzenet)}\n`

    }
})