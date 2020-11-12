<?php
require_once 'template/head.php';

?>

<head>
    <style>
        .jumbotron {
            background-image: url("img/history.jpg");
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

            <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h5 style="align-content:center; color: black;">Current Bookings</h5>
                    </button>
                </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    
                    <div class="row" style="margin:20px;" id="current">
                    </div>
                </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h5 style="align-content:center; color: black;">Past Bookings</h5>
                    </button>
                </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                        
                            <div class="row" style="margin:20px;" id="past">
                            </div>
                </div>
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