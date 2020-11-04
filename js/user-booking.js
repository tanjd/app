var BookedSeats = [];
var Rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
var Columns = 15;
var TotalSeats = Rows.length * Columns;
var ChosenLibrary = $('#library').val();
console.log(ChosenLibrary);

function convertIntToSeatNumbers(seats) {
    var bookedSeats = "";
    _.each(seats, function(seat) {
        var row = Rows[parseInt(parseInt(seat) / 12)];
        var column = parseInt(seat) % 12;
        if (column == 0) {
            column = 12;
        }
        if (_.indexOf(seats, seat) == seats.length - 1) {
            bookedSeats = bookedSeats + row + column;
        } else {
            bookedSeats = bookedSeats + row + column + ",";
        }
    });
    return bookedSeats;
}

var FloorView = Backbone.View.extend({
    events: {
        "click #library": "showFloors"
    },
    showFloors: function() {
        if (ChosenLibrary == "1") {
            $(".floors").html("<label for='floor'> Select Floor:</label><select class='form-control' id='floor' required='required'><option disabled selected value>Select Floor</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>");
        } else {
            $(".floors").html("<label for='floor'> Select Floor:</label><select class='form-control' id='floor' required='required'><option disabled selected value>Select Floor</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>");
        }
    }
});
var FloorView = new FloorView({
    el: $('.row')
});

var AreaView = Backbone.View.extend({
    events: {
        "change #floor": "showAreas"
    },
    showAreas: function() {
        var ChosenFloor = $('#floor').val();
        /*supposedly should retrieve from backend through api to access the json objects of the areas based on level
        then display accordingly*/
        console.log(ChosenLibrary);
        console.log(ChosenFloor);
        var xhr = new XMLHttpRequest();
        var html_str = '';
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                var sectionsArr = obj.sections;
                _.each(sectionsArr, function() {
                    html_str += `<div class="col-sm-4 col-md-6 col-xl-4">
                                    <!-- Add a card -->
                                    <div class="card" style="text-align:left">
                                        <img src="../img/lib_${ChosenLibrary}_lvl_${ChosenFloor}/${section.img_src}" class="card-img-top">
                                        <div class="card-body">
                                        <h5 class="card-title">${section.venue}</h5>
                                        <p class="card-text" style="font-weight:bold">${section.description}</p>
                                        </div>
                                    </div>
                                </div>`;
                });
                $(".area").html(html_str);
            } else {
                $(".message").html('HTTP Error ' + this.readyState);
            }
        }
        var gotoURL = "http://localhost:5001/get_sections_by_library_floor/?library_id="
        + ChosenLibrary + "&floor=" + ChosenFloor + "";
        xhr.open("GET", gotoURL, false);
        xhr.send();

    }
});
var AreaView = new AreaView({
    el: $('.container')
});



var InitialView = Backbone.View.extend({
    events: {
        "click #continueBooking": "submitForm"
    },
    submitForm: function() {
        var seatsBooked = JSON.parse(localStorage.getItem('seatsBooked')); //to change to get specific seats from each area
        var seatsAvailable = TotalSeats;
        var selectedNumberOfSeats = $('#seats').val();
        if (seatsBooked != null)
            seatsAvailable = TotalSeats - seatsBooked.length;
        if (!$('#library').val()) {
            $(".message").html("Please select a library.");
        } else if (!$('#floor').val()) {
            $(".message").html("Please select a floor.");
        }else if (!selectedNumberOfSeats) {
            $(".message").html("Please select seat(s).");
        } else if (parseInt(selectedNumberOfSeats) > seatsAvailable) {
            $(".message").html("You can only select " + seatsAvailable + " seats in this area.")
        } else if (!seatsAvailable) { //may not need this part
            $(".message").html("This area is unavailable.")
            //change image to grey scale
        } else {
            $(".message").html("");
            screenUI.showView();
        }
    }
});
var initialView = new InitialView({
    el: $('.bookingTicket')
});

var ScreenUI = Backbone.View.extend({
    events: {
        "click .empty-seat,.booked-seat": "toggleBookedSeat",
        "click #confirmSelection": "bookTickets"
    },
    initialize: function() {
        var tableheaderTemplate = _.template($("#displayTickets").html());
        var tableBodyTemplate = _.template($("#displaybodyTickets").html());
        var data = {
            "rows": Rows,
            "columns": Columns
        };
        $("#screen-head").after(tableheaderTemplate(data));
        $("#screen-body").after(tableBodyTemplate(data));
    },
    hideView: function() {
        $(this.el).hide();
    },
    showView: function() {
        $(this.el).show();
    },
    toggleBookedSeat: function(event) {
        var id = "#" + event.currentTarget.id;
        if ($(id).attr('class') == 'empty-seat' && BookedSeats.length < $('#seats').val()) {
            BookedSeats.push(id.substr(1));
            //$(id).attr('src', 'img/booked.png');
            $(id).attr('class', 'booked-seat');

        } else if ($(id).attr('class') == 'booked-seat') {
            BookedSeats = _.without(BookedSeats, id.substr(1));
            //$(id).attr('src', 'img/available.png');
            $(id).attr('class', 'empty-seat');
        }
    },
    updateTicketInfo: function() {
        var bookedSeats = convertIntToSeatNumbers(BookedSeats);
        $("#soldMessage").append("<tr><td>" + $('#name').val() + "</td><td>" + $('#seats').val() + "</td><td>" + bookedSeats + "</td></tr>");
    },
    bookTickets: function() {
        if (BookedSeats.length == parseInt($('#seats').val())) {
            $(".message").text("");
            var seatsBooked = JSON.parse(localStorage.getItem('seatsBooked')) || [];
            _.each(BookedSeats, function(bookedSeat) {
                seatsBooked.push(bookedSeat);
            });
            var identifySeats = JSON.parse(localStorage.getItem('identifySeats')) || {};
            identifySeats[$('#name').val()] = BookedSeats;
            localStorage.setItem('identifySeats', JSON.stringify(identifySeats));
            localStorage.setItem('seatsBooked', JSON.stringify(seatsBooked));
            this.updateTicketInfo();
            window.location.reload();
        } else {
            $(".message").html("Please select exactly " + $('#seats').val() + " seats");
        }
    },
});

var screenUI = new ScreenUI({
    el: $('.ticketBox')
});
screenUI.hideView();

var TicketInfo = Backbone.View.extend({
    initialize: function() {
        var items = [];
        var json = JSON.parse(localStorage.getItem('identifySeats'));
        if (json != null) {
            _.each(json, function(key, value) {
                var name = value;
                var number = key.length;
                var bookedSeats = convertIntToSeatNumbers(key);
                items.push({
                    names: name,
                    numbers: number,
                    seats: bookedSeats
                });
            });
            var data = {
                "items": items
            };
            var ticketInfoBody = _.template($("#ticketMessage").html());
            $("#soldMessage").html(ticketInfoBody(data));
        }
    }
});

var ticketInfo = new TicketInfo({
    el: $('.table-responsive')
});