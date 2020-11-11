var userHost = "http://localhost:5000";
var libraryHost = "http://localhost:5001";
var reservationHost = "http://localhost:5002";


// Function to create the cookie
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = escape(name) + "=" +
        escape(value) + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

function googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('Google User signed out.');
    });
}

function signOut() {
    console.log("signed out");
    deleteCookie("user");
    console.log(getCookie("user"));
    window.location.replace("login.php");

}


function loadScript(scriptName) {
    // create the script element
    let link = document.createElement('link');
    link.href = "./css/" + scriptName;
    link.rel = "stylesheet"
    document.getElementsByTagName('head')[0].appendChild(link);
}

async function fetchData(method = "", url = "", data = {},) {
    // make sure URL ends with '/'
    if (!url.endsWith("/")) {
        url = url + "/";
    }
    if (method == "GET") {
        try {
            var url = new URL(url)
            url.search = new URLSearchParams(data).toString();
            // console.log(url);
            const response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            });
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json(); // parses JSON response into native JavaScript objects
            }
        } catch (Error) {
            return Error
        }
    } else {
        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json(); // parses JSON response into native JavaScript objects
            }
        }
        catch (Error) {
            return Error
        }
    }
}


function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i - 1] + "\n";
    }
    return aString;
}

function getURL() {
    alert("The URL of this page is: " + window.location.href);
}

function adminPageLoad() {
    var userCookie = getCookie("user");
    if (userCookie != "") {
        const user = JSON.parse(userCookie);
        if (user.role == "admin") {
            let pathName = window.location.pathname;

            pathArray = pathName.split("/")
            pathName = pathArray[pathArray.length - 1]
            if (pathName == "admin_home.php") {
                document.getElementById("nav-item-home").className = "nav-link active";
                document.getElementById("nav-item-dashboard").className = "nav-link";
            } else if (pathName == "admin_dashboard.php") {
                document.getElementById("nav-item-home").className = "nav-link";
                document.getElementById("nav-item-dashboard").className = "nav-link active";
            }
            //get admin info
            getData = {
                "user_id": user.user_id
            }
            fetchData('GET', userHost + '/get_user/', getData)
                .then(data => {
                    //console.log(data);
                    if (data.status == "fail") {
                        //console.log(data.message);
                        //displayErrorMessage(data.message);
                    } else if (data.status == "success") {
                        // console.log("success");
                        var name = data.user.name;
                        // console.log(name);
                        document.getElementById("userName").innerText = name;
                    }
                });
        } else {
            location.href = "home.php";
        }
    } else {
        location.href = "login.php";
    }
}

function checkUserStatus() {
    var userCookie = getCookie('user');
    if (userCookie != "") {
        const user = JSON.parse(userCookie);
        var name = user.name;
        return 'template/navbar2.php';
    } else {
        return 'template/navbar.php';
    }
}

function navbar2Load() {
    var userCookie = getCookie("user");
    if (userCookie != "") {
        const user = JSON.parse(userCookie);
        if (user.role == "student") {
            //get admin info
            getData = {
                "user_id": user.user_id
            }
            fetchData('GET', userHost + '/get_user/', getData)
                .then(data => {
                    console.log(data);
                    if (data.status == "fail") {
                        console.log(data.message);
                        //displayErrorMessage(data.message);
                    } else if (data.status == "success") {
                        // console.log("success");
                        var name = data.user.name;
                        // console.log(name);
                        document.getElementById("userName").innerText = name;
                    }
                });
        }
    }
}
function homePageLoad() {
    var userCookie = getCookie("user");
    if (userCookie != ""){
        document.getElementById("intro").innerHTML = '';
    }
    else {
        document.getElementById("intro").innerHTML = `<div class="intro">
                                                            <div class="intro-text">
                                                                <h1 class="hide"><span class="text">Revolutionizing Your</span></h1>
                                                                <h1 class="hide"><span class="text">Library Experience</span></h1>
                                                                <h1 class="hide"><span class="text">With Just a Click!</span></h1>
                                                            </div>
                                                        </div>
                                                        <div class="slider"></div>`;
    const tl = gsap.timeline({
        defaults: {
            ease: "power1.out"
        }
    });

    tl.to('.text', {
        y: "0%",
        duration: 1,
        stagger: 0.25
    });
    tl.to('.slider', {
        y: "-100%",
        duration: 1.5,
        delay: 0.5
    });
    tl.to(".intro", {
        y: "-100%",
        duration: 1
    }, "-=1");
    tl.fromTo("#mainNavbar", {
        opacity: 0
    }, {
        opacity: 1,
        duration: 1
    });
    tl.fromTo("#content", {
        opacity: 0
    }, {
        opacity: 1,
        duration: 1
    }, "-=1");
    }
}