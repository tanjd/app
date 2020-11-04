//if it is not a user, this page would not be run.
var userCookie = getCookie('user');
if (userCookie != "") {
    const user = JSON.parse(userCookie);
    var showBookings = document.getElementById("showBookings");
    if (showBookings !== null) {
        showBookings.innerHTML = `<div class="table-responsive booked_list">
                                    <h4 align="center">Seats Booked</h4>
                                    <br/>
                                    <table class="table table-striped">
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
                                        <tbody id="showBookedSeats">
                                        </tbody>
                                    </table>
                                </div>`;

    }
    var showBookedSeats = document.getElementById("showBookedSeats");
    if (showBookedSeats !== null) {
        fetchData('GET', "http://localhost:5001/get_libraries/",)
            .then(data => {
                var libArr = data.libraries;
                fetchData('GET', "http://localhost:5001/get_sections/",)
                    .then(data => {
                        var secArr = data.sections;
                        postData = {
                            "student_id": user.user_id,
                        }
                        fetchData('GET', "http://localhost:5002/get_reservations_by_student/",postData)
                        .then(data => {
                            var reservationArr = data.reservations;
                            if (typeof reservationArr !== "undefined"){
                                var html_str = "";
                                for (reservation of reservationArr){
                                    var library;
                                    var section;
                                    var library_id = reservation.library_id;
                                    for (let el of libArr){
                                        if (library_id === el.id){
                                            library = el.name.slice(0, el.name.length-8);
                                        }
                                    }
                                    var floor = reservation.floor;
                                    var section_id = reservation.section;
                                    for (let el of secArr){
                                        if (library_id === el.library_id && floor === el.floor && section_id === el.section) {
                                            section = el.venue;
                                        }
                                    }
                                    var seat_id = reservation.seat_id;
                                    var start = reservation.start;
                                    start = start.slice(0, start.length - 7);
                                    var end = reservation.end;
                                    end = end.slice(0, end.length - 7);
                                    html_str += `<tr><td>${library}</td><td>${floor}</td><td>${section}</td><td>${seat_id}</td><td>${start}</td><td>${end}</td></tr>`
                                }
                                showBookedSeats.innerHTML = html_str;
                            }
                        });
                    });

            });
    }
    var chosenLibrary;
    var chosenFloor;
    var chosenSection;
    var libraries = document.getElementsByClassName("libraries");
    if (typeof libraries[0] !== "undefined"){
        fetchData('GET', "http://localhost:5001/get_libraries/",)
            .then(data => {
                var librariesArr = data.libraries;
                var html_str;
                html_str = `<label for="library">Select Library:</label>
                <select class="form-control" id='library' required="required">
                    <option disabled selected value>Select Library</option>`;
                for (let el of librariesArr){
                    html_str +=  `<option value="${el.id}">${el.name}</option>`;
                }
                html_str += `</select>`;
                libraries[0].innerHTML = html_str;
                libraries[0].addEventListener('click',  function(){
                    var library = document.getElementById("library");
                    chosenLibrary = library.value;
                    var floorsEl = document.getElementsByClassName("floors");
                    console.log(chosenLibrary);
                    var html_str = `<label for='floor'> Select Floor:</label><select class='form-control' id='floor' required='required'><option disabled selected value>Select Floor</option>`;
                    for (let el of librariesArr){
                        if (el.id == chosenLibrary){
                            var numOfFloors = el.floors;
                        }
                    }
                    for (let k = 2; k < numOfFloors+2; k ++){
                        html_str += `<option value='${k}'>${k}</option>`;
                    }
                    html_str += `</select>`;
                    floorsEl[0].innerHTML = html_str;
                    chosenFloor = '';
                    chosenSection = '';
                    $("#showSeats").html("");
                    floorsEl[0].addEventListener('click', showSections);
                });
            });
    }
    function showSections(){
        var floor = document.getElementById("floor");
        floor.addEventListener("change", function () {
            chosenSection = '';
            $(".area").html("");
            $("#showSeats").html("");
            chosenFloor = floor.value;
            console.log(chosenFloor);
            var html_str="";
            postData = {
                "library_id": chosenLibrary,
                "floor":chosenFloor
            }
            fetchData('GET', "http://localhost:5001/get_sections_by_library_floor/",postData)
                .then(data => {
                    var sectionsArr = data.sections;
                    for (section of sectionsArr){
                        html_str += `<div class="col-sm-6 col-md-6 col-xl-6">
                                        <div class="card h-100" style="text-align:left">
                                            <img src="../img/lib_${chosenLibrary}_lvl_${chosenFloor}/${section.img_src}"  width="20%" height="50%" class="card-img-top">
                                            <div class="card-body">
                                            <h5 class="card-title">${section.venue}</h5>
                                            <p class="card-text" style="font-weight:bold">${section.description}</p>
                                            <button type="button" class="btn btn-primary specificSections" id="${section.section}">Select</button>
                                            </div>
                                        </div>
                                    </div>`;
                    }
                    $(".area").html(html_str);
                    var specificSections = document.getElementsByClassName("specificSections");
                    var prev_clicked;
                    for (var i = 0; i < specificSections.length; i++) {
                        //Button reactions. For toggling between clicked or not clicked.
                        specificSections[i].addEventListener('click', function(){
                            chosenSection = '';
                            $("#showSeats").html("");
                            //unselect
                            if (prev_clicked == this) {
                                prev_clicked = "undefined";
                                this.childNodes[0].nodeValue = "Select";
                                this.setAttribute("class", "btn btn-primary specificSections");
                                for (let i = 0; i < specificSections.length; i++) {
                                    if (specificSections[i] !== this) {
                                        specificSections[i].parentElement.parentElement.firstElementChild.style.filter = "grayscale(0%)";
                                    }
                                }
                            } else {
                                this.childNodes[0].nodeValue = "Selected";
                                this.setAttribute("class", "btn btn-secondary specificSections");
                                this.parentElement.parentElement.firstElementChild.style.filter = "grayscale(0%)";
                                for (let i = 0; i < specificSections.length; i++) {
                                    if (specificSections[i] !== this) {
                                        specificSections[i].parentElement.parentElement.firstElementChild.style.filter = "grayscale(100%)";
                                        specificSections[i].childNodes[0].nodeValue = "Select";
                                        specificSections[i].setAttribute("class", "btn btn-primary specificSections");
                                    }
                                }
                                prev_clicked = this;
                                chosenSection = this.id;
                            }
                        });
                    }
                }
            );
        });
    }
    var finalReservation;
    function create_reservation(student_id, library_id, seat_id, floor, section, start, end){
        postData = {
            "student_id": student_id,
            "library_id": library_id,
            "seat_id": seat_id,
            "floor": floor,
            "section": section,
            "start": start,
            "end": end
        }
        fetchData('POST', "http://localhost:5002/create_reservation/",postData)
        .then(data => {
            location.reload();
        })
    }
    document.addEventListener('DOMContentLoaded', async function() {
        var calendarEl = document.getElementById('calendar');
        //Get student's reservations then display on calendar
        postData = {
            "student_id": user.user_id
        }
        fetchData('GET', "http://localhost:5002/get_reservations_by_student/",postData)
            .then(data => {
                var reservations = data.reservations;
                var reservedTimeSlots=[];
                if (typeof reservations !== "undefined") {
                    reservations.forEach(reservation => {
                        var start = new Date(reservation.start);
                        var end = new Date(reservation.end);
                        reservedTimeSlots.push({
                            start: start,
                            end: end,
                            color: "#C0C0C0",
                            groupId: 2
                        });
                    });
                }
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    selectable: true,
                    initialView: 'timeGridWeek',
                    events: reservedTimeSlots,
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    },
                    allDaySlot:false,
                    views: {
                        timeGrid: {
                            allDaySlot: false,
                            nowIndicator: true,
                            slotEventOverlap: false
                        }
                    },
                    slotMinTime: "09:00:00",
                    slotMaxTime: "23:00:00",
                    editable: true,
                    timeZone: "Asia/Singapore",
                    selectAllow: function(info) {
                        var date = new Date();
                        var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,19);
                        if (info.startStr < isoDateTime){
                            return false;
                        }
                        return true;
                    },
                    select: function(reservation) {
                        $("#showSeats").html("");
                        var events = calendar.getEvents();
                        var toRemove = events[events.length - 1];
                        if (typeof reservations !== "undefined"){
                            if (events.length > reservations.length){
                                toRemove.remove();
                            }
                        }
                        var toProceed = true;
                        for (let i = 0; i < reservedTimeSlots.length; i++) {
                            eventStart = reservedTimeSlots[i].start;
                            eventEnd = reservedTimeSlots[i].end;
                            reservationStart = reservation.startStr.slice(0,19);
                            reservationEnd = reservation.endStr.slice(0,19);

                            if (reservationStart > eventStart && reservationStart < eventEnd) {
                                toProceed = false;
                                alert("You already have a reservation at this date and time.");
                            }

                            if (reservationEnd > eventStart && reservationEnd < eventEnd) {
                                toProceed = false;
                                alert("You already have a reservation at this date and time.");
                            }

                            if (reservationStart <= eventStart && reservationEnd >= eventEnd) {
                                toProceed = false;
                                alert("You already have a reservation at this date and time.");
                            }
                        }
                        if (toProceed == true) {
                            calendar.addEvent(reservation);
                            finalReservation = reservation;
                        }
                    },
                    selectOverlap: function (event) {
                        return event.rendering === "background";
                    },
                });
                calendar.render();
            });
    });
    var proceed = document.getElementById("continueBooking");
    if (proceed !== null) {
        proceed.addEventListener("click", continueBooking);
    }
    function continueBooking() {
        //Check parameters
        let msgBox = document.getElementsByClassName("message")[0];
        console.log(chosenFloor);
        if (!chosenLibrary){
            msgBox.innerHTML = "Please select a library.";
        } else if (!chosenFloor){
            msgBox.innerHTML = "Please select a floor.";
        } else if (!chosenSection){
            msgBox.innerHTML = "Please select a section.";
        } else if (!finalReservation){
            msgBox.innerHTML = "Please select a time slot.";
        } else {
            msgBox.innerHTML = "";
            //Show seats
            var showSeatsDIV = document.getElementById("showSeats");
            showSeatsDIV.innerHTML=`<div class="seatBox">
                                        <div class="col-md-12">
                                            <div class="screen-map">
                                                <label for="availableRoot">Selected Seat</label>
                                                <img src="img/selected.png" class="selectedRoot" id="selectedRoot">
                                                <label for="">Booked Seat</label>
                                                <img src="img/booked.png" class="bookedRoot" id="bookedRoot">
                                                <label for="">Available Seat</label>
                                                <img src="img/available.png" class="availableRoot" id="availableRoot">
                                            </div>
                                        </div>
                                        <div class  ="col-md-12">
                                            <table class="table table-striped" id="table-screen"></table>
                                            <thead id="screen-head">
                                            </thead>
                                        </div>
                                        <div class  ="col-md-12">
                                            <table class="table border" id="table-screen">
                                                <tbody id="screen-body">
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class = "row">
                                            <div class="col-12">
                                                <div id="screen">
                                                    <span color="white">Entrance 1</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "row">
                                            <div class="col-12 text-center justify-content-center">
                                                <button type="button" class="btn btn-success btn-sm nextButton" id="bookNow">Book Now</button>
                                            </div>
                                        </div>
                                    </div>`;
            var screenBody = document.getElementById("screen-body");
            //var chosenLibrary = document.getElementById("library");
            if (chosenLibrary == 1){
                var seatMap =
                [[2,0,1,1,1,1,1,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,1,1,1,1,2,1,1,1,1,0,2],
                [2,0,0,0,0,0,2,0,0,0,0,0,2]];
            } else {
                var seatMap =
                [[2,0,1,1,1,1,1,1,1,1,1,0,2],
                [2,0,1,0,0,0,0,0,0,0,1,0,2],
                [2,0,1,0,1,1,1,1,1,0,1,0,2],
                [2,0,1,0,1,0,0,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,1,0,1,0,1,0,2],
                [2,0,1,0,1,0,0,0,1,0,1,0,2],
                [2,0,1,0,0,0,0,0,0,0,1,0,2],
                [2,0,0,0,0,0,0,0,0,0,0,0,2]];
            }
            var html_str = "";
            var numOfSeats = 0;
            for (let i = 0; i < seatMap.length; i++) { //row - 6 rows
                html_str += "<tr>"
                for (let j = 0; j < seatMap[i].length; j++) { //col - 10 cols
                    html_str += "<td>"
                    //it is a seat
                    if (seatMap[i][j] == 1) {
                        numOfSeats += 1;
                        html_str += `<img class="empty-seat" id="seat_${numOfSeats}" /> <p class = "labelContent d-none"> seat_${numOfSeats}</p>`
                    } else if (seatMap[i][j] == 2) {
                        html_str += `<img src = "../img/space.png" class="space"/>`
                    }
                    html_str += "</td>"
                }
                html_str += "</tr>"
            }
            screenBody.innerHTML = html_str;
            //get booked seats at this timing
            var bookedSeats = [];
            if (finalReservation){
                var start = finalReservation.startStr.slice(0,19);
                console.log(chosenLibrary);
                console.log(chosenFloor);
                console.log(chosenSection);
                postData =  {
                    "library_id": chosenLibrary,
                    "floor": chosenFloor,
                    "section": chosenSection
                }
                fetchData('GET', "http://localhost:5002/get_reservations_by_library_floor_section/",postData)
                    .then(data => {
                        var reservations = data.reservations
                        if (typeof reservations !== "undefined"){
                            for (reservation of reservations){
                                let date = reservation.start;
                                date = new Date(date);
                                var dateISO = date.toISOString().slice(0,19);
                                console.log(dateISO);
                                console.log(start);
                                if (dateISO == start){
                                    bookedSeats.push(reservation.seat_id);
                                }
                            }
                        }
                        console.log(bookedSeats);
                        for (var bookedSeat of bookedSeats){
                            var elSeat = "seat_" + bookedSeat;
                            var bookSeat = document.getElementById(elSeat);
                            bookSeat.setAttribute("class", "booked-seat");
                        }
                        var availSeatsEl = [];
                        var allSeats = [];
                        var emptySeats = document.getElementsByClassName("empty-seat");
                        var selectedSeats = document.getElementsByClassName("selected-seat");
                        var bookedSeatsEl = document.getElementsByClassName("booked-seat");
                        for (let el of emptySeats){
                            availSeatsEl.push(el);
                            allSeats.push(el);
                        }
                        for (let el of selectedSeats){
                            availSeatsEl.push(el);
                            allSeats.push(el);
                        }
                        for (let el of bookedSeatsEl){
                            allSeats.push(el);
                        }
                        var prev_selected;
                        for (let i = 0; i < allSeats.length; i ++){
                            allSeats[i].addEventListener("mouseover", function () {
                                this.nextElementSibling.setAttribute("class", "labelContent");
                            });
                            allSeats[i].addEventListener("mouseout", function () {
                                this.nextElementSibling.setAttribute("class", "labelContent d-none");
                            });
                        }
                        for (let i = 0; i < availSeatsEl.length; i ++){
                            availSeatsEl[i].addEventListener("click", function () {
                                if (prev_selected == this) {
                                    prev_selected = "undefined";
                                    //Do not allow user to select more than one seat.
                                    for (let k = 0; k < availSeatsEl.length; k ++){
                                        availSeatsEl[k].setAttribute("class", "empty-seat");
                                    }
                                } else {
                                    //Do not allow user to select more than one seat.
                                    for (let j = 0; j < availSeatsEl.length; j ++){
                                        if (availSeatsEl[j] !== this){
                                            availSeatsEl[j].setAttribute("class", "empty-seat");
                                        }
                                    }
                                    prev_selected = this;
                                    this.setAttribute("class", "selected-seat");
                                }
                            });
                        }
                        var bookNow = document.getElementById("bookNow");
                        bookNow.addEventListener("click", confirmBooking);
                    });
            }
        }
    }
    function confirmBooking() {
        var selectedSeat = document.getElementsByClassName("selected-seat");
        var selectedSeatEl = selectedSeat[0];
        selectedSeatEl = selectedSeatEl.id.slice(5,);
        var seat_id = selectedSeatEl;
        var start = finalReservation.startStr.slice(0,19); //2020-10-24T16:30:00
        console.log(start);
        var end = finalReservation.endStr.slice(0,19);
        var startDT = new Date(start);
        var startString = startDT.toString().slice(0,3) + "," + startDT.toString().slice(3, 21);
        var endDT = new Date(end);
        var endString = endDT.toString().slice(0,3) + "," + endDT.toString().slice(3, 21);
        var confirmBooking = document.getElementById("confirmBooking");
        if (chosenLibrary == "1"){
            var chosenLibraryName = "LKS";
        } else {
            var chosenLibraryName = "KGC";
        }
        var html_str = `<div class="table-responsive booked_list">
                            <h4 align="center">Your Selection</h4>
                            <br/>
                            <table class="table table-striped">
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
                                <tbody>
                                    <tr>
                                        <td>${chosenLibraryName}</td>
                                        <td>${chosenFloor}</td>
                                        <td>${chosenSection}</td>
                                        <td>${seat_id}</td>
                                        <td>${startString}</td>
                                        <td>${endString}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class = "row">
                                <div class="col-12 text-center justify-content-center">
                                    <button type="button" class="btn btn-success btn-sm nextButton" id="confirmBookingBtn">Confirm Booking</button>
                                </div>
                            </div>
                        </div>`;
        confirmBooking.innerHTML = html_str;
        var confirmBtn = document.getElementById("confirmBookingBtn");
        confirmBtn.addEventListener("click", function () {
            create_reservation(user.user_id, chosenLibrary, seat_id, chosenFloor, chosenSection, start , end);
        })
    }
}