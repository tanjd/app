<?php
require_once 'template/head.php';

?>
<html>

<head>
    <meta charset="utf-8">
    <title>Seats Booking</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="http://netdna.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.3.2/main.min.css" rel='stylesheet' />
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.3.2/main.css" rel='stylesheet' />
    <link rel="stylesheet" type="text/css" href="css/user-booking-style.css">
    
</head>

<body>

    <?php
    if (isset($_COOKIE['user'])) {
        require_once 'template/navbar2.php';
    } else {
        require_once 'template/navbar.php';
    }

    ?>
    <div class="container">
        <div class="row d-flex justify-content-center" id="showBookings">
        </div>
        <div class="alert alert-light" role="alert" id = "showMe">
            Scroll up to see your past bookings.
        </div>
        <div class="alert alert-info" role="alert" id = "showMe1">
            Scroll up to see your past bookings. Proceed to book by selecting time slot, library, floor and area.
        </div>
        <div class="row d-flex justify-content-center">
            <form class='bookingSeat'>
                <div id='calendar'></div>
                </br>
                <div class="row" id = "showMe2">
                    <div class="col-md-6">
                        <div class="form-group libraries">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group floors">
                        </div>
                    </div>
                </div>
                Select Area:
                </br></br>
                <div class="container">
                    <div class="row justify-content-center area">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center">
                            <span class="message"></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="text-center">
                            <button type="button" class="btn btn-success btn-sm nextButton" id="continueBooking">Continue</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="alert alert-light d-none" role="alert" id = "showMe3">
            Scroll up to see your past bookings.
        </div>
        <div class="alert alert-info d-none" role="alert" id = "showMe4">
            Choose your seat and scroll to click "Book Now" after finished selecting.
        </div>
        <div class="row d-flex justify-content-center" id="showSeats">
        </div>
        <div class="alert alert-light d-none" role="alert" id = "showMe5">
            Scroll up to see your past bookings.
        </div>
        <div class="alert alert-info d-none" role="alert" id = "showMe6">
            Check your seat selection and click "Confirm Booking" to officially place a booking.
        </div>
        <div class="row d-flex justify-content-center" id="confirmBooking">
        </div>
        <div class="alert alert-success alert-dismissible fade show d-none" role="alert" id = "successMsg">
            Your booking request has processed successfully!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</body>
<script type="text/javascript" src="./include/autoload.js"></script>
<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.3.2/main.min.js'></script>
<script type="text/javascript" src="js/user-booking.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

</html>