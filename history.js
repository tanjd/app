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
                    for (reservation of reservationArr){
                        var library;
                        var library_id = reservation.library_id;
                        if (library_id == '1') {
                            library = "LKS";
                        } else {
                            library = "KGC";
                        }
                        var start = reservation.start;
                        start = start.slice(5, start.length - 7);
                        // console.log(start);
                        // console.log(end);

                        var end = reservation.end;
                        end = end.slice(5, end.length - 7);
                        var floor = reservation.floor;
                        var section = reservation.section;
                        var seat_id = reservation.seat_id;

                        console.log(section);
                        console.log(sectionArr);
                        for(let sect of sectionArr){
                            console.log(sect);
                            if(section === sect.section && library_id === sect.library_id && floor === sect.floor){
                                console.log(sect.library_id);
                                console.log(sect.floor);
                                console.log(sect.section);
                                var venue = sect.venue;
                                var image = sect.img_src;
                            
                        console.log(venue);
                        // console.log(typeof(end));

                        
                        html_str += `
                        
                        <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="img/lib_${library_id}_lvl_${floor}/${image}" width="20%" height="50%" class="card-img-top" alt="Card image cap">
                        <div class="card-body">
                          <h5 class="card-title">${library} Level ${floor} ${venue} </h5>
                          <h6 class="card-subtitle mb-2 ">Seat ${seat_id}</h6>
                          <h6 class="card-text">Booked from ${start} to ${end}</h6>
                          
                        </div>
                        </div>
                        </div>
                        
                        `;

                        if(today < start){
                            current.innerHTML = html_str
                        }
                        else{
                            past.innerHTML = html_str
                        }
                            }
                        }
                    }
                }


                })
            })
        }
        
    

                    








