<?php
require_once 'template/head.php';

?>

<?php
if (isset($_COOKIE['user'])) {
    require_once 'template/navbar2.php';
} else {
    require_once 'template/navbar.php';
}

?>

<div id="fullpage">
    <section class="section s1">
        <div class="container-fluid" id="main">
            <div class="row text-center lead">
                <div class="col-lg-12">
                    <div id="content">
                        <h1 class="lobster mt-5">SMU Library Booking System</h1>
                        <br>
                        <br>
                        <h3>
                            The Fastest and Easiest Way to Ensure You Always Have a Seat!
                        </h3>
                        <hr class="hr">
                        <button class="btn btn-light btn-lg text-dark" onclick="toBooking()">
                            <i class="fas fa-book-reader pr-2"></i>Start Booking!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section s2">
        
        <!-- <lottie-player id="lottie" src="img/lf30_editor_pifdp6py.json" background="transparent" speed="1" loop autoplay></lottie-player> -->
        <div class="container lead mt-5">


            <h1 class="lobster" id="about">About Us</h1>
            <hr class="hr">
            <div class="row">
                <div class="col-md-6">
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <lottie-player id="lottie" src="img/lf30_editor_pifdp6py.json" background="transparent" speed="1" loop autoplay></lottie-player>
                </div>
                <div class="col-md-6 pt-5">
                    <p class="aboutPara">Established in 2020, made for students!</p>
                    <p class="aboutPara">With the improvements of technology over the years, we have come out with the one and only solution to solve every students' worries</p>
                    <p class="aboutPara">Now with just a click of a button, you are able to select the seat you want, without having to worry about people fighting over it</p>
                    <p class="aboutPara">
                        <b>Fuss Free Booking System by us!</b>
                    </p>
                </div>
            </div>


        </div>
    </section>
    <section class="section s3" style="background-color:#efefef;">
        <div class="container">
            <div class="containerContact">
                <div class="form">
                    <div class="contact-info">
                        <h3 class="title">Let's get in touch</h3>
                        <p class="textContact">
                            If you have any enquiries, do feel free to leave a message and we will be happy to answer your questions!
                        </p>

                        <div class="info">
                            <div class="information">
                                <img src="img/contactLocation.png" class="icon" alt="" />
                                <p>70 Stamford Rd, Singapore 178901</p>
                            </div>
                            <div class="information">
                                <img src="img/contactEmail.png" class="icon" alt="" />
                                <p>smulibrary@smu.edu.sg</p>
                            </div>
                            <div class="information">
                                <img src="img/contactCall.png" class="icon" alt="" />
                                <p>6828 0355</p>
                            </div>
                        </div>

                        <div class="social-media">
                            <p>Connect with us :</p>
                            <div class="social-icons">
                                <a href="https://www.facebook.com/sgsmu/">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://twitter.com/sgSMU?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/sgsmu/?hl=en">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="https://sg.linkedin.com/school/singapore-management-university/">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="contact-form">
                        <form id="form" autocomplete="off">
                            <h3 class="title">Contact us</h3>
                            <div class="input-container">
                                <input type="text" name="name" class="input" />
                                <label for="">Username</label>
                                <span>Username</span>
                            </div>
                            <div class="input-container">
                                <input type="email" name="email" class="input" />
                                <label for="">Email</label>
                                <span>Email</span>
                            </div>
                            <div class="input-container">
                                <input type="tel" name="phone" class="input" />
                                <label for="">Phone</label>
                                <span>Phone</span>
                            </div>
                            <div class="input-container textarea">
                                <textarea name="message" class="input"></textarea>
                                <label for="">Message</label>
                                <span>Message</span>
                            </div>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="sendEnquiry()">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </section>
</div>
<div class="modal fade" id="myModal" role="dialog" style="position:relative;">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>

            </div>
            <div class="modal-body">
                <p>Thank you for the enquiry! We will get back to you in 1 to 2 working days.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

</div>
<div id="intro">

</div>


<?php
require_once 'template/footer.php';
?>
<script src="js/fullpage.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js" integrity="sha512-IQLehpLoVS4fNzl7IfH8Iowfm5+RiMGtHykgZJl9AWMgqx0AmJ6cRWcB+GaGVtIsnC4voMfm8f2vwtY+6oPjpQ==" crossorigin="anonymous"></script>

<script>
    window.addEventListener('load', homePageLoad);
    window.addEventListener('load', loadScript("contactForm.css"));


    new fullpage("#fullpage", {
        autoScrolling: true,
        navigation: true,
        navigationTooltips: ['Home', 'About Us', 'Contact Us'],
        anchors: ['section1', 'section2', 'section3'],
        responsiveWidth: 768,
        onLeave: (origin, destination, direction) => {
            const section = destination.item;
            const title = section.querySelector("h1");
            const tl = new TimelineMax({
                delay: 0.5
            });
            tl.fromTo(title, 0.5, {
                y: "50",
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            });
        }
    });

    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
    });


    function toBooking() {
        var userCookie = getCookie("user");
        if (userCookie != "") {
            window.location.href = "user_booking.php";
        } else {
            window.location.href = "login.php";
        }
    }

    function sendEnquiry() {
        document.getElementById("form").reset();
    }
</script>
