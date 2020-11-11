var seatsDropdownItems = document.getElementsByClassName("blockOffSelections");
var wtf = document.getElementById("wtf");
console.log(wtf);
var library;
var floor;
var section;
var msg = document.getElementById("message");
var isoDateFrom; //2020-10-23
var isoDateTo; 
var isoTimeFrom;
var isoTimeTo;
var timeFrom;
var dateFrom;
var selection;
var userCookie = getCookie('user');
if (userCookie != "") {
    const user = JSON.parse(userCookie);
    var showBlockSeats = document.getElementById("showBlockSeats");
    if (showBlockSeats !== null) {
        fetchData('GET', libraryHost+"/get_libraries/",)
        .then(data => {
            var libArr = data.libraries;
            fetchData('GET', libraryHost+"/get_sections/",)
                .then(data => {
                    var secArr = data.sections;
                    postData = {
                        "student_id": user.user_id,
                    }
                    fetchData('GET', reservationHost+"/get_reservations_by_student/",postData)
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
                            showBlockSeats.innerHTML = html_str;
                            $('#showBS').DataTable({
                                pageLength: 5
                            });
                        }
                    });
                });
        });
    }
}
function getNearestHalfHourTimeString() {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var ampm = "AM";
     if (minutes > 30){
        minutes = "00";
        ++hour;
    } else {
        minutes = "30";
    }
    if (hour > 23) {
        hour = 12;
    } else if (hour > 12) {
        hour = hour - 12;
        ampm = "PM";
    } else if (hour == 12) {
        ampm = "PM";
    } else if (hour == 0) {
        hour = 12;
    }
    return(hour + ":" + minutes + "" + ampm);
}
var minTimeF = getNearestHalfHourTimeString();
var picker1Date;
picker1Date = new Date();
if (minTimeF === "11:30PM" || minTimeF === "12:00AM"){
    const today = new Date();
    picker1Date = new Date(today);
    picker1Date.setDate(picker1Date.getDate() + 1);
    console.log(picker1Date);
}
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'pm') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}
function create_reservation_bulk(reservations){
    var userCookie = getCookie('user');
    const user = JSON.parse(userCookie);
    console.log(user.user_id);
    postData = {
        "student_id" : user.user_id
    }
    fetchData('GET', reservationHost+"/get_reservations_by_student/",postData)
    .then(data => {
        var resArr = data.reservations;
        var twoDArrGetResStr = [];
        if (typeof resArr != "undefined"){
            for (let res of resArr){
                let startStr = res.start.toString();
                let startObj = new Date(startStr);
                let start = startObj.toISOString().slice(0,19);
                let endStr = res.end.toString();
                let endObj = new Date(endStr);
                let end = endObj.toISOString().slice(0,19);
                let text = {"student_id": user.user_id, "library_id": res.library_id, "seat_id": res.seat_id, "floor": res.floor, "section": res.section, "start": start, "end": end};
                let objStr = JSON.stringify(text);
                twoDArrGetResStr.push(objStr);
            }
            reservationsStr = [];
            for (el of reservations){
                reservationsStr.push(JSON.stringify(el));
            }
            var temp = [];
            for(var i = 0; i < reservationsStr.length; i++){
                if(twoDArrGetResStr.indexOf(reservationsStr[i]) == -1){
                    console.log('wtf');
                    temp.push(reservations[i]);
                }
            }
            reservations = temp;
        }
        postData = {
            "reservations" : reservations
        }
        fetchData('POST', reservationHost+"/create_reservation_bulk/",postData)
        .then(data => {
            location.reload();
            msg.setAttribute("class", "card-text d-none");
        });
    })
}
var fromTimeEl = document.getElementById("fromTime");
var toTimeEl = document.getElementById("toTime");
var toDateEl = document.getElementById("toDate");
var fromD;
var fromDT;
var toD;
var toT;
var timePickerFrom = document.getElementById("timepickerFrom");
var timePickerTo = document.getElementById("timepickerTo");
var datePickerTo = document.getElementById("datepickerTo");
var picker;
var picker2;
//from date input
var datePickerFrom = document.getElementById("datepickerFrom");
var hasSelectedFrom = false;
$('#timepickerFrom').timepicker({
    'minTime': '9:00am',
    'maxTime': '10:30pm',
    'scrollDefault': 'now'
});
$('#timepickerTo').timepicker({
    'minTime': '9:00am',
    'maxTime': '11:00pm'
});
var confirmBtn = document.getElementById("confirmBtn");
confirmBtn.addEventListener("click", function () {
    msg.setAttribute("class", "card-text d-block");
    if (typeof fromD == "undefined") {
        msg.innerHTML = "Please fill in from date";
    } else if (typeof timeF == "undefined") {
        msg.innerHTML = "Please fill in from time";
    }

});
picker = new Pikaday({
    field: document.getElementById('datepickerFrom'),
    firstDay: 1,
    minDate: picker1Date,
    onSelect: function() {
        timePickerFrom.value = "";
        timePickerTo.value = "";
        datePickerTo.value = "";
        hasSelectedFrom = true;
        if (typeof picker2 !== "undefined"){
            msg.setAttribute("class", "card-text d-none");
            location.reload();
        }
        var date = this._d;
        isoDateFrom = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
        var [yearF, monthF, dayF] = isoDateFrom.split("-");
        monthF = monthF - 1;
        fromD = new Date(yearF, monthF, dayF);
        dateFrom = fromD;
        //from time input
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        //only if selected from date equals to today's date, then strict restriction
        if (isoDateFrom == today){
            $('#timepickerFrom').timepicker({
                'minTime': minTimeF,
                'maxTime': '10:30pm',
                'scrollDefault': 'now'
            });
        }
        $('#timepickerFrom').on('changeTime', function() {
            if (typeof picker2 !== "undefined"){
                msg.setAttribute("class", "card-text d-none");
                location.reload();
            }
            //to add half an hour to chosen time for processing of min time for timepickerto if same day.
            let rawValue = this.value;
            let rawTime = rawValue.slice(0, rawValue.length-2) //4:00pm
            var is_AM = true;
            if (rawValue.slice(rawValue.length-2,) != "am"){
                is_AM = false;
            }
            const [hourF, minF] = rawTime.split(":");
            fromDT = new Date(yearF, monthF, dayF, hourF, minF);
            timeFrom = fromDT.addHours(0.5);
            timeFrom = timeFrom.toString().slice(16,21);
            if (is_AM === true){
                timeFrom = timeFrom + "am"
            } else {
                timeFrom = timeFrom + "pm"
            }
            // to add a space between time and am/pm so to use the function 
            var timeF = this.value;
            var processedTimeF = timeF.slice(0,timeF.length-2); //4:00pm
            processedTimeF += " " + timeF.slice(timeF.length-2,);
            isoTimeFrom = convertTime12to24(processedTimeF);
            var toDateEl = document.getElementById("toDate");
            toDateEl.setAttribute("class", "col-lg-6 d-block");
            var toTimeEl = document.getElementById("toTime");
            toTimeEl.setAttribute("class", "col-lg-6 d-block");
            confirmBtn.addEventListener("click", function () {
                msg.setAttribute("class", "card-text d-block");
                if (typeof toD == "undefined") {
                    msg.innerHTML = "Please fill in to date";
                }
            });
            picker2 = new Pikaday({
                field: document.getElementById('datepickerTo'),
                firstDay: 1,
                minDate: dateFrom,
                onSelect: function() {
                    var date = this._d;
                    isoDateTo = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
                    var [yearT, monthT, dayT] = isoDateTo.split("-");
                    monthT = monthT - 1;
                    //to time input
                    var minTime = '09:00am';
                    //only if its the same day, then strict restriction
                    if (isoDateFrom == isoDateTo){
                        minTime = timeFrom;
                    }
                    console.log(minTime);
                    $('#timepickerTo').timepicker({
                        'minTime': minTime,
                        'maxTime': '11:00pm'
                    });
                    confirmBtn.addEventListener("click", function () {
                        msg.setAttribute("class", "card-text d-block");
                        console.log(toT);
                        if (typeof toT == "undefined") {
                            msg.innerHTML = "Please fill in to time";
                        }
                    });
                    $('#timepickerTo').on('changeTime', function() {
                        var time = this.value;
                        var processedTimeT = time.slice(0,time.length-2);
                        processedTimeT += " " + time.slice(time.length-2,);
                        isoTimeTo = convertTime12to24(processedTimeT);
                        toD = new Date(yearT, monthT, dayT);
                        toT = this.value;
                        confirmBtn.addEventListener("click", function () {
                            msg.setAttribute("class", "card-text d-block");
                            if (typeof selection == "undefined"){
                                console.log(selection); 
                                msg.innerHTML = "Please choose seats to be blocked off.";
                            }
                        });
                        msg.setAttribute("class", "card-text d-none");
                        msg.innerHTML = '';
                        const text = "From " + fromD.toString().slice(0,15) + " " + timeF + " to " + toD.toString().slice(0,15) + " " + this.value + ", ";
                        var isoDTFrom = isoDateFrom + "T" + isoTimeFrom + ":00";
                        var isoDTTo = isoDateTo + "T" + isoTimeTo + ":00";
                        //allow choosing of seats
                        var chooseSeats = document.getElementById("chooseSeats");
                        chooseSeats.setAttribute("class", "row");
                        console.log(chooseSeats);
                        var userCookie = getCookie('user');
                        const user = JSON.parse(userCookie);
                        var loading = document.getElementById("loading");
                        var seatsDropdownBtn = document.getElementById("seatsDropdown");
                        seatsDropdownBtn.addEventListener("click", function (){
                            $("#specificationsDropdown").html("");
                            $("#specificationsDropdown2").html("");
                            $("#specificationsDropdown3").html("");
                            msg.setAttribute("class", "card-text d-none");
                            var string = msg.innerHTML;
                            var count = (string.match(/continue/g) || []).length;
                            if (count > 0){
                                var arr = string.split(",");
                                console.log(arr);
                                msg.innerHTML = arr[0] + ", ";
                            }
                        });
                        console.log(msg.innerHTML);
                        for (let i = 0; i < seatsDropdownItems.length; i++) {
                            seatsDropdownItems[i].addEventListener('click', function () {
                                selection = this.id;
                                var dropDownBtnSeats = document.getElementById('dropdownMenuButton');
                                dropDownBtnSeats.innerText = selection + " seats";
                                if (selection == "Odd" || selection == "Even") {
                                    fetchData('GET', libraryHost+"/get_seats/",)
                                    .then(data => {
                                        msg.innerHTML = text;
                                        msg.innerHTML += "you are blocking all the " + selection + " seats! Press confirm to continue.";
                                        msg.setAttribute("class", "card-text d-block");
                                        confirmBtn.addEventListener("click", function () {
                                            msg.setAttribute("class", "card-text d-none");
                                            loading.setAttribute("class", "row d-block");
                                            var oddReservations = [];
                                            var evenReservations = [];
                                            var seats = data.seats;
                                            for (seat of seats){
                                                if (seat.id %2 ==0){
                                                    var evenReservationJSON = {"student_id": user.user_id, "library_id": seat.library_id, "seat_id": seat.id, "floor": seat.floor, "section": seat.section, "start": isoDTFrom, "end": isoDTTo};
                                                    evenReservations.push(evenReservationJSON);
                                                } else {
                                                    var oddReservationJSON = {"student_id": user.user_id, "library_id": seat.library_id, "seat_id": seat.id, "floor": seat.floor, "section": seat.section, "start": isoDTFrom, "end": isoDTTo};
                                                    oddReservations.push(oddReservationJSON);
                                                }
                                            }
                                            if (selection == "Odd"){
                                                create_reservation_bulk(oddReservations);
                                            } else {
                                                create_reservation_bulk(evenReservations);
                                            }
                                        });
                                    });
                                } else {
                                    fetchData('GET', libraryHost+"/get_libraries/",)
                                        .then(data => {
                                            var libraries = data.libraries;
                                            msg.innerHTML = text;
                                            var specificationsDropdown = document.getElementById("specificationsDropdown");
                                            specificationsDropdown.addEventListener("click", function (){
                                                var string = msg.innerHTML;
                                                var count = (string.match(/continue/g) || []).length;
                                                if (count == 1){
                                                    msg.setAttribute("class", "card-text d-block");
                                                } else if(count >= 1) {
                                                    var arr = string.split(",");
                                                    msg.innerHTML = arr[0] + ", ";
                                                    var arr1 = string.split(".");
                                                    console.log(arr1);
                                                    msg.innerHTML += arr1[1] + ".";
                                                    msg.setAttribute("class", "card-text d-block");
                                                } else{
                                                    msg.setAttribute("class", "card-text d-none");
                                                }
                                            });
                                            var html_str = `<button class="btn btn-secondary dropdown-toggle btn-block " type="button" id="dropdownMenuButtonLib" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Choose Library
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
                                            for (var library of libraries){
                                                html_str += `<button class = "dropdown-item libraries" id = "${library.id}" value = "${library.name}">${library.name}</button>`;
                                            }
                                            html_str += `</div>`;
                                            specificationsDropdown.innerHTML = html_str;
                                            var librariesDropdownItems = document.getElementsByClassName("libraries");
                                            for (let j = 0; j < librariesDropdownItems.length; j++) {
                                                librariesDropdownItems[j].addEventListener('click', function () {
                                                    library_id = this.id;
                                                    var dropDownBtnLib = document.getElementById('dropdownMenuButtonLib');
                                                    dropDownBtnLib.innerText = this.value;
                                                    library = this.value;
                                                    if (selection == "Floor" || selection =="Section") {
                                                        var specificationsDropdown2 = document.getElementById("specificationsDropdown2");
                                                        msg.innerHTML = text;
                                                        specificationsDropdown2.addEventListener("click", function (){
                                                            var string = msg.innerHTML;
                                                            var count = (string.match(/continue/g) || []).length;
                                                            if (count == 1){
                                                                msg.setAttribute("class", "card-text d-block");
                                                            } else if(count >= 1) {
                                                                var arr = string.split(",");
                                                                msg.innerHTML = arr[0] + ", ";
                                                                var arr1 = string.split(".");
                                                                console.log(arr1);
                                                                msg.innerHTML += arr1[1] + ".";
                                                                msg.setAttribute("class", "card-text d-block");
                                                            } else{
                                                                msg.setAttribute("class", "card-text d-none");
                                                            }
                                                        });
                                                        var html_str2 = `<button class="btn btn-secondary btn-block dropdown-toggle" type="button" id="dropdownMenuButtonFloor" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Choose Floor
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
                                                        for (let el of libraries){
                                                            if (el.id == library_id){
                                                                var numOfFloors = el.floors;
                                                            }
                                                        }
                                                        for (let k = 2; k < numOfFloors+2; k ++){
                                                            html_str2 += `<button class = "dropdown-item floors" id = "${k}" value = "${k}">${k}</button>`;
                                                        }
                                                        html_str2 += `</div>`;
                                                        specificationsDropdown2.innerHTML = html_str2;
                                                        var floorsDropdownItems = document.getElementsByClassName("floors");
                                                        for (let a = 0; a < floorsDropdownItems.length; a++) {
                                                            floorsDropdownItems[a].addEventListener('click', function () {
                                                                floor = this.id;
                                                                var dropDownBtnFloor = document.getElementById('dropdownMenuButtonFloor');
                                                                dropDownBtnFloor.innerText = "Floor " + this.id;
                                                                    if (selection == "Section"){
                                                                        var specificationsDropdown3 = document.getElementById("specificationsDropdown3");
                                                                        msg.innerHTML = text;
                                                                        specificationsDropdown3.addEventListener("click", function (){
                                                                            var string = msg.innerHTML;
                                                                            var count = (string.match(/continue/g) || []).length;
                                                                            if (count == 1){
                                                                                msg.setAttribute("class", "card-text d-block");
                                                                            } else if(count >= 1) {
                                                                                var arr = string.split(",");
                                                                                msg.innerHTML = arr[0] + ", ";
                                                                                var arr1 = string.split(".");
                                                                                console.log(arr1);
                                                                                msg.innerHTML += arr1[1] + ".";
                                                                                msg.setAttribute("class", "card-text d-block");
                                                                            } else{
                                                                                msg.setAttribute("class", "card-text d-none");
                                                                            }
                                                                        });
                                                                        var html_str3 = `<button class="btn btn-secondary btn-block dropdown-toggle" type="button" id="dropdownMenuButtonSec" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        Choose Section
                                                                        </button>
                                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
                                                                        postData = {
                                                                            "library_id": library_id,
                                                                            "floor": floor
                                                                        }
                                                                        fetchData('GET', libraryHost+"/get_sections_by_library_floor/", postData)
                                                                            .then(data => {
                                                                                var sectionsArr = data.sections;
                                                                                for (let section of sectionsArr){
                                                                                    html_str3 += `<button class = "dropdown-item sections" id = "${section.section}" value = "${section.venue}">${section.venue}</button>`;
                                                                                }
                                                                                html_str3 += `</div>`;
                                                                                specificationsDropdown3.innerHTML = html_str3;
                                                                                var sectionsDropdownItems = document.getElementsByClassName("sections");
                                                                                for (let a = 0; a < sectionsDropdownItems.length; a++) {
                                                                                    sectionsDropdownItems[a].addEventListener('click', function () {
                                                                                        section_id = this.id;
                                                                                        section = this.value;
                                                                                        var dropDownBtnSec = document.getElementById('dropdownMenuButtonSec');
                                                                                        dropDownBtnSec.innerText = this.value;
                                                                                        msg.innerHTML += "you are blocking section " + section + " of floor " + floor + " of " + library + "! Press confirm to continue.";
                                                                                        console.log(msg.innerHTML); 
                                                                                        msg.setAttribute("class", "card-text d-block");
                                                                                        confirmBtn.setAttribute("class", "row justify-content-center d-block");
                                                                                        confirmBtn.addEventListener("click", function () {
                                                                                            msg.setAttribute("class", "card-text d-none");
                                                                                            loading.setAttribute("class", "row d-block");
                                                                                            specificationsDropdown.innerHTML="";
                                                                                            specificationsDropdown2.innerHTML="";
                                                                                            specificationsDropdown3.innerHTML="";
                                                                                            postData = {
                                                                                                "library_id": library_id,
                                                                                                "floor": floor,
                                                                                                "section": section_id
                                                                                            }
                                                                                            fetchData('GET', libraryHost+"/get_seats_by_library_floor_section/",postData)
                                                                                                .then(data => {
                                                                                                    var sectionReservations = [];
                                                                                                    var seats = data.seats;
                                                                                                    for (seat of seats){
                                                                                                        var sectionReservationJSON = {"student_id": user.user_id, "library_id": seat.library_id, "seat_id": seat.id, "floor": seat.floor, "section": seat.section, "start": isoDTFrom, "end": isoDTTo};
                                                                                                        sectionReservations.push(sectionReservationJSON);
                                                                                                    }
                                                                                                    create_reservation_bulk(sectionReservations);
                                                                                                });
                                                                                        });
                                                                                    });
                                                                                }
                                                                            });
                                                                    }  else {
                                                                                msg.innerHTML += "you are blocking floor " + floor + " of " + library + "! Press confirm to continue.";
                                                                                msg.setAttribute("class", "card-text d-block");
                                                                                confirmBtn.setAttribute("class", "row justify-content-center d-block")
                                                                                confirmBtn.addEventListener("click", function () {
                                                                                    msg.setAttribute("class", "card-text d-none");
                                                                                    loading.setAttribute("class", "row d-block");
                                                                                    specificationsDropdown.innerHTML="";
                                                                                    specificationsDropdown2.innerHTML="";
                                                                                    postData = {
                                                                                        "library_id": library_id,
                                                                                        "floor": floor
                                                                                    }
                                                                                    fetchData('GET', libraryHost+"/get_seats_by_library_floor/",postData)
                                                                                        .then(data => {
                                                                                            var floorReservations = [];
                                                                                            var seats = data.seats;
                                                                                            for (seat of seats){
                                                                                                var floorReservationJSON = {"student_id": user.user_id, "library_id": seat.library_id, "seat_id": seat.id, "floor": seat.floor, "section": seat.section, "start": isoDTFrom, "end": isoDTTo};
                                                                                                floorReservations.push(floorReservationJSON);
                                                                                            }
                                                                                            create_reservation_bulk(floorReservations);
                                                                                        });
                                                                                });
                                                                    }
                                                            });
                                                        }
                                                    }  else {
                                                        for (let j = 0; j < librariesDropdownItems.length; j++) {
                                                            librariesDropdownItems[j].addEventListener('click', function () {
                                                                msg.innerHTML += "you are blocking " + library + "! Press confirm to continue.";
                                                                msg.setAttribute("class", "card-text d-block");
                                                                confirmBtn.setAttribute("class", "row justify-content-center d-block");
                                                                confirmBtn.addEventListener("click", function () {
                                                                    msg.setAttribute("class", "card-text d-none");
                                                                    loading.setAttribute("class", "row d-block");
                                                                    specificationsDropdown.innerHTML="";
                                                                    postData = {
                                                                        "library_id": library_id,
                                                                    }
                                                                    fetchData('GET', libraryHost+"/get_seats_by_library/",postData)
                                                                        .then(data => {
                                                                            var libraryReservations = [];
                                                                            var seats = data.seats;
                                                                            for (seat of seats){
                                                                                var libraryReservationJSON = {"student_id": user.user_id, "library_id": seat.library_id, "seat_id": seat.id, "floor": seat.floor, "section": seat.section, "start": isoDTFrom, "end": isoDTTo};
                                                                                libraryReservations.push(libraryReservationJSON);
                                                                            }
                                                                            create_reservation_bulk(libraryReservations);
                                                                        });
                                                                });
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                }
                            });
                        }
                        fromD = "";
                        toD = "";
                    });
                }
            });
        });
    }
});


