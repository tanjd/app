<?php
require_once 'template/admin_head.php';

?>
<head>
    <link rel="stylesheet" type="text/css" href="css/admin-style.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/timepicker@1.13.15/jquery.timepicker.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
        <?php require_once 'template/admin_navbar.php'; ?>
        <?php require_once 'template/admin_sidebar.php'; ?>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Admin Home</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Starter Page</li>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <div class="content">
                <div class="container-fluid">
                    <!-- Body Row -->
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card admin-card">
                                <div class="card-body">
                                    <div class = "row">
                                        <h5 class="card-title font-weight-bold">Block Off Seats</h5>
                                    </div>
                                    <div class = "row">
                                        <p class="card-text">
                                            Please select the seats to be blocked off.
                                        </p>
                                    </div>
                                    </br>
                                    <div class = "row">
                                        <div class = "col-lg-6">
                                            From (Date) <br>
                                            <input id="datepickerFrom" class = "rounded input-block-level" type="text" autocomplete = "off"/>
                                        </div>
                                        <div class = "col-lg-6 d-none" id = "toDate">
                                            To (Date)<br>
                                            <input id="datepickerTo" class = "rounded input-block-level" type="text" autocomplete = "off"/>
                                        </div>
                                    </div>
                                    <div class = "row">
                                        <div class = "col-lg-6" id = "fromTime">
                                            From (Time)<br>
                                            <input id="timepickerFrom" class = "rounded input-block-level" type="text" autocomplete = "off"/>
                                        </div>
                                        <div class = "col-lg-6 d-none" id = "toTime">
                                            To (Time)<br>
                                            <input id="timepickerTo" class = "rounded input-block-level" type="text" autocomplete = "off"/>
                                        </div>
                                    </div>
                                    </br>
                                    <div class = "row d-none" id ="chooseSeats">
                                        <div class = "col-6">
                                            <div class="dropdown" id ="seatsDropdown">
                                                <button class="btn btn-secondary dropdown-toggle btn-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Choose Seats
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <button class = "dropdown-item blockOffSelections" id = "Odd" value = "Odd">Odd Seats</button>
                                                    <button class = "dropdown-item blockOffSelections" id = "Even" value = "Even">Even Seats</button>
                                                    <button class = "dropdown-item blockOffSelections" id = "Section" value = "Section">Section</button>
                                                    <button class = "dropdown-item blockOffSelections" id = "Floor" value = "Floor">Floor</button>
                                                    <button class = "dropdown-item blockOffSelections" id = "Library" value = "Library">Library</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "col-6">
                                            <div class="dropdown" id ="specificationsDropdown">
                                            </div>
                                        </div>
                                    </div>
                                    </br>
                                    <div class = "row">
                                        <div class = "col-6">
                                            <div class="dropdown" id ="specificationsDropdown2">
                                            </div>
                                        </div>
                                        <div class = "col-6">
                                            <div class="dropdown" id ="specificationsDropdown3">
                                            </div>
                                        </div>
                                    </div>
                                    </br>
                                    <div class = "row">
                                        <p class="card-text d-none" id="message">
                                        </p>
                                    </div>
                                    </br>
                                    <div class = "row justify-content-center" id = "confirmBtn">
                                        <div class="text-center">
                                            <button type="button" class="btn btn-danger btn-sm nextButton"
                                                id="continueBooking">Confirm</button>
                                        </div>
                                    </div>
                                    </br>
                                    <div class = "row d-none" id = "loading">
                                        <div class="spinner-border text-dark" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>

                                    <p class="card-text">
                                        Some quick example text to build on the card title and make up the bulk of the card's
                                        content.
                                    </p>
                                    <a href="#" class="card-link">Card link</a>
                                    <a href="#" class="card-link">Another link</a>
                                </div>
                            </div><!-- /.card -->
                        </div>
                        <!-- /.col-md-6 -->
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="m-0" align="center">Blocked Off Seats By You</h5>
                                </div>
                                <div class="card-body">
                                    <!--
                                    <h6 class="card-title">Special title treatment</h6>

                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                    -->
                                    <div class = "showBlockedOff">
                                        <div class="table-responsive booked_list">
                                        <table class="table table-striped" id = "showBS">
                                            <thead>
                                                <tr>
                                                    <th>Library</th>
                                                    <th>Floor</th>
                                                    <th>Section</th>
                                                    <th>Seat</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                </tr>
                                            </thead>
                                            <tbody id="showBlockSeats">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--
                            <div class="card card-primary card-outline">
                                <div class="card-header">
                                    <h5 class="m-0">Featured</h5>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-title">Special title treatment</h6>

                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            -->
                        </div>
                        <!-- /.col-md-6 -->
                    </div>
                    <!-- /.row -->

                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
        <?php
        require_once 'template/admin_footer.php';
        ?>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
<script src="https://cdn.jsdelivr.net/npm/timepicker@1.13.15/jquery.timepicker.min.js"></script>
<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/admin-blockoff.js"></script>
<script>
    window.addEventListener('load', adminPageLoad);

    // const vm = new Vue({
    //     el: '#admin_sidebar',
    //     data: {
    //         name: name
    //     },
    //     methods: {
    //         // doMagic: function() {
    //         //     this.specialNumber = this.specialNumber ** 2;
    //         // }
    //     }
    // });
</script>