<?php
require_once 'template/head.php';

?>

<div class="logcontainer">
    <div class="forms-container">
        <div class="signin-signup">
            <form action="#" class="sign-in-form" name="loginForm">
                <img src="img/undraw_profile_pic_ic5t.svg" style="height: 100px;">
                <h2 class="title">Sign in</h2>
                <div class="input-field">
                    <i class="fas fa-envelope"></i>
                    <input type="email" name="emailInput" id="inputEmail" placeholder="Email Address" />
                </div>
                <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="passwordInput" id="inputPassword" placeholder="Password" />
                </div>
                <a href="#">Forgot Password?</a>
                <input type="submit" id="loginBtn" value="Login" class="btn solid" />
                <p class="social-text">Or</p>
                <div class="social-media">
                    <a href="#" id="googleLogin" data-onsuccess="onSignIn" class="g-signin2">
                        <i class="fab fa-google"></i>
                    </a>
                </div>
                <br>
                <p id="errorMsg"></p>
            </form>
            <form action="#" class="sign-up-form">
                <img src="img/undraw_profile_pic_ic5t.svg" style="height: 100px;">
                <h2 class="title">Sign up using your school email</h2>
                <div class="input-field">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder="Email" />
                </div>

                <input type="submit" class="btn" value="Sign up" />

            </form>
        </div>
    </div>

    <div class="panels-container">
        <div class="panel left-panel">
            <div class="content">
                <h3>New here ?</h3>
                <p>
                    Opt in to the school's new library seat reservation system
                </p>
                <button class="btn transparent" id="sign-up-btn">
                    Sign up
                </button>
            </div>
            <img src="img/undraw_Data_points_re_vkpq.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
            <div class="content">
                <h3>One of us ?</h3>
                <p>
                    What you waiting for? Log in now to enter the adventure right now!
                </p>
                <button class="btn transparent" id="sign-in-btn">
                    Sign in
                </button>
            </div>
            <img src="img/undraw_secure_login_pdn4.svg" class="image" alt="" />
        </div>
    </div>
</div>

<script>
    // If cookie available, redirect
    window.addEventListener('load', loginProtection);

    // Load required script
    window.addEventListener('load', loadScript("signIn2.css"))

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".logcontainer");

    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    //login
    document.getElementById("loginBtn").addEventListener("click", login);

    function displayLoginErrorMessage(msg) {
        innerHTML = "<div class='alert alert-danger alert-dismissible fade show d-none' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>"
        document.getElementById("errorMsg").innerHTML = innerHTML;

        let strong = document.createElement("strong");
        let p = document.createElement("p");
        strong.innerText = "Error";
        p.innerText = msg;

        document.getElementById("alertMsg").appendChild(strong);
        document.getElementById("alertMsg").appendChild(p);
        document.getElementById("alertMsg").className = "alert alert-danger alert-dismissible fade show";

    }


    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();

        const email = profile.getEmail();
        postData = {
            "email": email
        }
        fetchData('POST', userHost + '/googleAuthenticate/', postData)
            .then(data => {
                console.log(data);
                if (data.status == "fail") {
                    // console.log(data.message)
                    displayLoginErrorMessage(data.message);
                    googleSignOut();
                } else if (data.status == "success") {
                    deleteCookie("user")
                    createCookie("user", JSON.stringify(data), "10")
                    if (data.role == "admin") {
                        location.href = "admin_home.php";
                    } else {
                        console.log("hello");
                        location.href = "index.php";
                    }
                } else {
                    displayLoginErrorMessage("Please try again later")
                }
            });
        googleSignOut()
    }

    function login(event) {
        event.preventDefault()
        const email = document.forms["loginForm"]["emailInput"].value;
        const password = document.forms["loginForm"]["passwordInput"].value;
        //call authenticate api

        postData = {
            "email": email,
            "password": password
        }
        fetchData('POST', userHost + '/authenticate/', postData)
            .then(data => {
                console.log(data);
                if (data.status == "fail") {
                    console.log(data.message);
                    displayLoginErrorMessage(data.message);
                } else if (data.status == "success") {
                    deleteCookie("user");
                    createCookie("user", JSON.stringify(data), "10");
                    if (data.role == "admin") {
                        location.href = "admin_home.php";
                    } else {
                        location.href = "index.php";
                    }
                } else {
                    displayLoginErrorMessage("Please try again later");
                }
            });
    }

    function loginProtection() {
        var userCookie = getCookie("user");
        if (userCookie != "") {
            const user = JSON.parse(userCookie);
            if (user.role == "admin") {
                location.href = "admin_home.php";
            } else {
                location.href = "home.php";
            }
        }
    }
</script>
<?php
require_once 'template/footer.php';
?>