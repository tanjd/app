<?php
require_once 'template/head.php';

?>

<head>
    <style>
        .jumbotron {
            background-image: url("../img/history.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            /* opacity: 0.7; */

        }
    </style>
</head>

<body>
    <?php
    if (isset($_COOKIE['user'])) {
        require_once 'template/navbar2.php';
    } else {
        require_once 'template/navbar.php';
    }

    ?>
    <main role="main" class="container">

        <div class="wrapper" style="background-color:white;">
            <div class="jumbotron jumbotron-fluid">
                <h1 class="display-4" style="text-align: bottom; color: white; margin-top: 150px; margin-left: 50px;">History</h1>
                <!-- <p class="lead" style="text-align: left; color: white;">You can check your current and past bookings in this page! </p> -->
            </div>

            <div class="container" id="history">
                <h2>Current Bookings</h2>
                <div class="row" style="margin:20px;" id="current">
                </div>

                <h2>Past Bookings</h2>
                <div class="row" style="margin:20px;" id="past">
                </div>

            </div>




        </div>
    </main><!-- /.container -->
    <?php
    require_once 'template/footer.php';
    ?>
</body>

<script>
    // Load required script
    window.addEventListener('load', loadScript("starter-template.css"))
</script>
<script src="history.js"></script>