console.log("mukodik")
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
    //The URL below is the URL of your Data Scraping script written in PHP.
    var url = 'https://mrknrb.000webhostapp.com/mrk2.php';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
       console.log("cors",'CORS not supported')
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        console.log("cors",text)
    };

    xhr.onerror = function() {
        console.log("cors",'Woops, there was an error making the request.')
    };

    xhr.send();
}

var a = makeCorsRequest;
a();
