
function deleteBooking(id){
    postData = {
        "reservation_id" : id
    }
    fetchData('POST',"http://localhost:5002/remove_reservation/",postData)
        .then(data => {
            location.reload();
        });
}
var userCookie = getCookie("user");
if(userCookie !== ""){
    var user = JSON.parse(userCookie);
    
    var current = document.getElementById("current");
    var past = document.getElementById("past");

            stuId = {
            "student_id": user.user_id,
        }
        fetchData('GET', "http://localhost:5002/get_reservations_by_student/",stuId)
            .then(data => {
                var reservationArr = data.reservations;
                fetchData('GET',"http://localhost:5001/get_sections/")
                .then(data => {
                    var sectionArr = data.sections;
                if (typeof(reservationArr) !== "undefined"){
                    var html_str = "";
                    var today = new Date();
                    today = today.toLocaleDateString(undefined, {day:'2-digit'}) + " " +  today.toLocaleDateString(undefined, {month:'short'}) + " " +  today.toLocaleDateString(undefined, {year:'numeric'})

                    // console.log(today);
                    // console.log(typeof(today));
                    // today is an object

                    // console.log(dateToday.length);
                    // console.log(typeof(dateToday));

                    for (reservation of reservationArr){
                        var library;
                        var id = reservation.id;
                        var library_id = reservation.library_id;
                        if (library_id == '1') {
                            library = "LKS";
                        } else {
                            library = "KGC";
                        }
                        var start = reservation.start;
                        // console.log(start);
                        var startDate = start.slice(5, start.length - 7);
                        // var startTime = start.slice(17, start.length - 7);

                        // console.log(typeof(start));
                        
                        // startDate = JSON.parse(startDate);
                        // console.log(startDate);
                        // console.log(typeof(startDate));
                        // startDate => 04 Nov 2020 16:00 is a string
                        // console.log(startTime);

                        var end = reservation.end;
                        end = end.slice(5, end.length - 7);
                        var floor = reservation.floor;
                        var section = reservation.section;
                        var seat_id = reservation.seat_id;

                        // console.log(section);
                        // console.log(sectionArr);
                        for(let sect of sectionArr){
                            // console.log(sect);
                            if(section === sect.section && library_id === sect.library_id && floor === sect.floor){
                                // console.log(sect.library_id);
                                // console.log(sect.floor);
                                // console.log(sect.section);
                                var venue = sect.venue;
                                var image = sect.img_src;
                            
                        // console.log(venue);
                        // console.log(typeof(end));

                        // var currentArr  += [startDate];


                        html_str = `
                        <div class="card mx-3 my-2" style="width: 18rem;">
                        <img class="card-img-top " src="img/lib_${library_id}_lvl_${floor}/${image}" width="20%" height="50%" class="card-img-top" alt="Card image cap">
                        <div class="card-body" id="meep">
                          <h5 class="card-title">${library} Level ${floor} ${venue} </h5>
                          <h6 class="card-subtitle mb-2 ">Seat ${seat_id}</h6>
                          <h6 class="card-text">Booked from <b><u>${startDate}</u></b> to <b><u>${end}</u></b></h6>
                          
                        
                        `;



                        // console.log(today);
                        // console.log(typeof(today));
                        
                        // console.log(start);
                        // console.log(startDate);
                        // console.log(startTime);
                        // console.log(typeof(startDate));

                        var todayArr = today.split(" ");
                        var startArr = startDate.split( " ");

                        // console.log(todayArr);
                        // console.log(startArr);
                        // console.log(typeof(todayArr));
                        // console.log(typeof(startArr));

                        
                        todayArr = [todayArr[2],todayArr[1],todayArr[0], todayArr[3]];

                        
                        startArr = [startArr[2],startArr[1],startArr[0], startArr[3]];

                        // console.log(todayArr);
                        // console.log(startArr);

                        var monthDict = {
                            "Jan" : 1,
                            "Feb" : 2,
                            "Mar" : 3,
                            "Apr" : 4,
                            "May" : 5,
                            "Jun" : 6,
                            "Jul" : 7,
                            "Aug" : 8,
                            "Sep" : 9,
                            "Oct" : 10,
                            "Nov" : 11,
                            "Dec" : 12
                        }

                        // console.log(todayArr[1]);
                        // console.log(typeof(todayArr[1]));

                        var monthTdy = todayArr[1]
                        var monthStart = startArr[1]

                        console.log(startArr);

                        var todayMth = monthDict[monthTdy];
                        var startMth = monthDict[monthStart];


                        // console.log(todayMth);
                        // console.log(startMth);
                        var card = html_str + `<button type="button" class="btn btn-outline-danger mx-auto" id="buttonDelete" onclick="deleteBooking(${id})">Cancel reservation</button>
                          
                          
                                </div>
                                </div>
                                </div>`;
                        if ((todayArr[2] < startArr[2])){
                            current.innerHTML += card;
                            // function deleteBooking(){
                            //     postData = {
                            //         "user_id" : user.user_id,
                            //         "id" : reservation.id
                            //         }
                            //         fetchData('POST',"http://localhost:5002/remove_reservation/",postData)
                            //         .then(data => {
                            //             location.reload();
                            //         });
                            // }
                        }

                        else{
                            if(todayMth < startMth){
                                current.innerHTML += card
                                // function deleteBooking(){
                                //     postData = {
                                //         "user_id" : user.user_id,
                                //         "id" : reservation.id
                                //         }
                                //         fetchData('POST',"http://localhost:5002/remove_reservation/",postData)
                                //         .then(data => {
                                //             location.reload();
                                //         });
                                // }
                            }
                            else{
                                if(todayArr[0] < startArr[0]){
                                    current.innerHTML += card
                                    // function deleteBooking(){
                                    //     postData = {
                                    //         "user_id" : user.user_id,
                                    //         "id" : reservation.id
                                    //         }
                                    //         fetchData('POST',"http://localhost:5002/remove_reservation/",postData)
                                    //         .then(data => {
                                    //             location.reload();
                                    //         });
                                    // }
                                }
                                else{
                                    past.innerHTML += html_str + `</div></div></div>`;
                                }
                            }

                        }



                        
                        // if( || todayArr[0] <= startArr[0] || todayMth <= startMth){
                        //     current.innerHTML = html_str
                        // }
                        // else{
                        //     past.innerHTML = html_str
                        // }
                            }
                        }
                    }
                }


                })
                
            })

            
        }
        
    









