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
                                <li class="breadcrumb-item active">Dashboard</li>
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
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-header">
                                        <h5 class="m-0">Block Off Seats</h5>
                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title">Please select the seats to be blocked off</h6>

                                        <p class="card-text">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    From (Date) <br>
                                                    <input id="datepickerFrom" class="rounded input-block-level" type="text" autocomplete="off" />
                                                </div>
                                                <div class="col-lg-6 d-none" id="toDate">
                                                    To (Date)<br>
                                                    <input id="datepickerTo" class="rounded input-block-level" type="text" autocomplete="off" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6" id="fromTime">
                                                    From (Time)<br>
                                                    <input id="timepickerFrom" class="rounded input-block-level" type="text" autocomplete="off" />
                                                </div>
                                                <div class="col-lg-6 d-none" id="toTime">
                                                    To (Time)<br>
                                                    <input id="timepickerTo" class="rounded input-block-level" type="text" autocomplete="off" />
                                                </div>
                                            </div>
                                            </br>
                                            <div class="row d-none" id="chooseSeats">
                                                <div class="col-6">
                                                    <div class="dropdown" id="seatsDropdown">
                                                        <button class="btn btn-secondary dropdown-toggle btn-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Choose Seats
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <button class="dropdown-item blockOffSelections" id="Odd" value="Odd">Odd Seats</button>
                                                            <button class="dropdown-item blockOffSelections" id="Even" value="Even">Even Seats</button>
                                                            <button class="dropdown-item blockOffSelections" id="Section" value="Section">Section</button>
                                                            <button class="dropdown-item blockOffSelections" id="Floor" value="Floor">Floor</button>
                                                            <button class="dropdown-item blockOffSelections" id="Library" value="Library">Library</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="dropdown" id="specificationsDropdown">
                                                    </div>
                                                </div>
                                            </div>
                                            </br>
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="dropdown" id="specificationsDropdown2">
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="dropdown" id="specificationsDropdown3">
                                                    </div>
                                                </div>
                                            </div>
                                            </br>
                                            <div class="row">
                                                <p class="card-text d-none" id="message">
                                                </p>
                                            </div>
                                        </p>
                                        <div id="confirmBtn">
                                            <button type="button" class="btn btn-danger btn-sm nextButton" id="continueBooking">Confirm</button>
                                        </div>
                                        <div class="row d-none" id="loading">
                                            <div class="spinner-border text-dark" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                    </br>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">
                                        <i class="ion ion-clipboard mr-1"></i>
                                        To Do List
                                    </h3>

                                    <div class="card-tools">
                                        <ul class="pagination pagination-sm">
                                            <li class="page-item"><a href="#" class="page-link">&laquo;</a></li>
                                            <li class="page-item"><a href="#" class="page-link">1</a></li>
                                            <li class="page-item"><a href="#" class="page-link">2</a></li>
                                            <li class="page-item"><a href="#" class="page-link">3</a></li>
                                            <li class="page-item"><a href="#" class="page-link">&raquo;</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <ul class="todo-list" data-widget="todo-list">
                                        <li>
                                            <!-- drag handle -->
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <!-- checkbox -->
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo1" id="todoCheck1">
                                                <label for="todoCheck1"></label>
                                            </div>
                                            <!-- todo text -->
                                            <span class="text">Check if library online booking system is running properly</span>
                                            <!-- Emphasis label -->
                                            <small class="badge badge-danger"><i class="far fa-clock"></i> 2 mins</small>
                                            <!-- General tools such as edit or delete-->
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo2" id="todoCheck2" checked>
                                                <label for="todoCheck2"></label>
                                            </div>
                                            <span class="text">Mark attendence in the excel sheet</span>
                                            <small class="badge badge-info"><i class="far fa-clock"></i> 4 hours</small>
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo3" id="todoCheck3">
                                                <label for="todoCheck3"></label>
                                            </div>
                                            <span class="text">Prepare for system update</span>
                                            <small class="badge badge-warning"><i class="far fa-clock"></i> 1 day</small>
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo4" id="todoCheck4">
                                                <label for="todoCheck4"></label>
                                            </div>
                                            <span class="text">Host an orientation for the new employee</span>
                                            <small class="badge badge-success"><i class="far fa-clock"></i> 3 days</small>
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo5" id="todoCheck5">
                                                <label for="todoCheck5"></label>
                                            </div>
                                            <span class="text">Check emails for any important notifications</span>
                                            <small class="badge badge-primary"><i class="far fa-clock"></i> 1 week</small>
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle">
                                                <i class="fas fa-ellipsis-v"></i>
                                                <i class="fas fa-ellipsis-v"></i>
                                            </span>
                                            <div class="icheck-primary d-inline ml-2">
                                                <input type="checkbox" value="" name="todo6" id="todoCheck6">
                                                <label for="todoCheck6"></label>
                                            </div>
                                            <span class="text">Check for any no-shows at the end of the working day</span>
                                            <small class="badge badge-warning"><i class="far fa-clock"></i> 1 day</small>
                                            <div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer clearfix">
                                    <button type="button" class="btn btn-info float-right"><i class="fas fa-plus"></i> Add item</button>
                                </div>
                            </div>
                        </div>
                        <!-- /.col-md-6 -->
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="m-0" align="left">Blocked Off Seats By You</h5>
                                </div>
                                <div class="card-body">
                                    <div class="showBlockedOff">
                                        <div class="table-responsive booked_list">
                                            <table class="table table-striped" id="showBS">
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
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="m-0" align="left">All Reservations</h5>
                                </div>
                                <div class="card-body">
                                    <div class="showAllReservations">
                                        <div class="table-responsive booked_list">
                                            <table class="table table-striped" id="showAll">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Library</th>
                                                        <th>Floor</th>
                                                        <th>Section</th>
                                                        <th>Seat</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="showAllReservationsSeats">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.col-md-6 -->
                        </div>
                        <!-- /.row -->

                        <!-- /.card -->
                    </div>
                    <!-- <div class="row">
                        <div class="col-lg-6">
                        </div>
                    </div> -->
                    <!-- /.container-fluid -->
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