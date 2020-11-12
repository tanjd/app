$(function () {

  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder: 'sort-highlight',
    connectWith: '.connectedSortable',
    handle: '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex: 999999
  })
  $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder: 'sort-highlight',
    handle: '.handle',
    forcePlaceholderSize: true,
    zIndex: 999999
  })
  /* Chart.js Charts */
  // Sales chart
  var libraryChartCanvas = document.getElementById('library-chart-canvas').getContext('2d');
  var lksChartCanvas = document.getElementById('lks-chart-canvas').getContext('2d');
  var kgcChartCanvas = document.getElementById('kgc-chart-canvas').getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');


  var libraryChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: true,
        }
      }],
      yAxes: [{
        gridLines: {
          display: false,
        }
      }]
    }
  }

  let getData = {
    "library_id": 1
  }
  fetchData('GET', reservationHost + '/get_reservations_data_by_school/', getData)
    .then(data => {
      // console.log(data);
      let library_one_data = data
      if (library_one_data.status == "fail") {
        // console.log(data.message)
        displayErrorMessage(data.message);
      } else if (library_one_data.status == "success") {
        let getData = {
          "library_id": 2
        }
        fetchData('GET', reservationHost + '/get_reservations_data_by_school/', getData)
          .then(data => {
            // console.log(data);
            let library_two_data = data
            if (library_two_data.status == "fail") {
              // console.log(data.message)
              displayErrorMessage(data.message);
            } else if (library_two_data.status == "success") {
              // console.log(library_one_data.reservations);
              let library_one_reservationData = library_one_data.reservations;
              let library_two_reservationData = library_two_data.reservations;

              var labelList = [];
              for (let library_one_reservation of library_one_reservationData) {
                // console.log(library_one_reservation);

                let hour = library_one_reservation.x.toString();
                let label = "";
                if (hour.length == 1) {
                  hour = library_one_reservation.x.toString()
                  label = "0" + hour + "00";
                  // label = label.replace('a', '');
                } else {
                  label = library_one_reservation.x + "00";
                }
                labelList.push(label);

                var libraryChart = new Chart(libraryChartCanvas, {
                  type: 'line',
                  data: {
                    labels: labelList,
                    datasets: [
                      {
                        label: 'LKS Library',
                        backgroundColor: 'rgba(60,141,188,0.9)',
                        borderColor: 'rgba(60,141,188,0.8)',
                        pointRadius: false,
                        pointColor: '#3b8bba',
                        pointStrokeColor: 'rgba(60,141,188,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data: library_one_reservationData
                      }
                      ,
                      {
                        label: 'KGC Library',
                        backgroundColor: 'rgba(210, 214, 222, 1)',
                        borderColor: 'rgba(210, 214, 222, 1)',
                        pointRadius: false,
                        pointColor: 'rgba(210, 214, 222, 1)',
                        pointStrokeColor: '#c1c7d1',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: library_two_reservationData
                      }
                    ]
                  },
                  options: libraryChartOptions
                })
              }
            } else {
              displayErrorMessage("Please try again latter")
              //loading screen;
            }
          });
      } else {
        displayErrorMessage("Please try again latter")
        //loading screen;
      }
    });


  getData = {
    "library_id": 1
  }
  fetchData('GET', reservationHost + '/get_reservations_data_by_school/', getData)
    .then(data => {
      // console.log(data);
      let library_one_data = data
      if (library_one_data.status == "fail") {
        // console.log(data.message)
        displayErrorMessage(data.message);
      } else if (library_one_data.status == "success") {
        let library_one_reservationData = library_one_data.reservations;
        var labelList = [];
        for (let library_one_reservation of library_one_reservationData) {
          // console.log(library_one_reservation);

          let hour = library_one_reservation.x.toString();
          let label = "";
          if (hour.length == 1) {
            hour = library_one_reservation.x.toString()
            label = "0" + hour + "00";
            // label = label.replace('a', '');
          } else {
            label = library_one_reservation.x + "00";
          }
          labelList.push(label);
          var lksChart = new Chart(lksChartCanvas, {
            type: 'bar',
            data: {
              labels: labelList,
              datasets: [
                {
                  label: 'LKS Library',
                  backgroundColor: 'rgba(60,141,188,0.9)',
                  borderColor: 'rgba(60,141,188,0.8)',
                  borderSkipped: false,
                  barPercentage: 0.5,
                  barThickness: 35,
                  maxBarThickness: 35,
                  minBarLength: 2,
                  data: library_one_reservationData
                }
                ,

              ]
            },
            options: libraryChartOptions
          })
        }
      } else {
        displayErrorMessage("Please try again latter");
        //loading screen
      }
    });

  getData = {
    "library_id": 2
  }
  fetchData('GET', reservationHost + '/get_reservations_data_by_school/', getData)
    .then(data => {
      // console.log(data);
      let library_two_data = data
      if (library_two_data.status == "fail") {
        // console.log(data.message)
        displayErrorMessage(data.message);
      } else if (library_two_data.status == "success") {
        let library_two_reservationData = library_two_data.reservations;
        var labelList = [];
        for (let library_two_reservation of library_two_reservationData) {
          // console.log(library_one_reservation);

          let hour = library_two_reservation.x.toString();
          let label = "";
          if (hour.length == 1) {
            hour = library_two_reservation.x.toString()
            label = "0" + hour + "00";
            // label = label.replace('a', '');
          } else {
            label = library_two_reservation.x + "00";
          }
          labelList.push(label);
          var kgcChart = new Chart(kgcChartCanvas, {
            type: 'bar',
            data: {
              labels: labelList,
              datasets: [
                {
                  label: 'KGC Library',
                  backgroundColor: 'rgba(210, 214, 222, 1)',
                  borderColor: 'rgba(210, 214, 222, 1)',
                  borderSkipped: false,
                  barPercentage: 0.5,
                  barThickness: 35,
                  maxBarThickness: 35,
                  minBarLength: 2,
                  data: library_two_reservationData
                }
                ,
              ]
            },
            options: libraryChartOptions
          })
        }
      } else {
        displayErrorMessage("Please try again latter")
        //loading screen
      }
    });

  var lkcCapacityChartCanvas = $('#lkcCapacity-chart').get(0).getContext('2d');
  var kgcCapacityChartCanvas = $('#kgcCapacity-chart').get(0).getContext('2d');


  fetchData('GET', reservationHost + '/get_capacity_by_school/', getData)
    .then(data => {
      // console.log(data);
      let capacity_data = data
      if (capacity_data.status == "fail") {
        // console.log(data.message)
        displayErrorMessage(data.message);
      } else if (capacity_data.status == "success") {
        // console.log(capacity_data.capacity);
        for (let capacity of capacity_data.capacity) {
          if (capacity.library_id == 1) {
            var lksCurrentCapacity = capacity.library_capacity
          } else if (capacity.library_id == 2) {
            var kgcCurrentCapacity = capacity.library_capacity
          }
        }
        var lkcCapacityChartData = {
          labels: ['Occupancy', 'Available'],
          datasets: [
            {
              // borderColor: '#efefef',
              backgroundColor: ['#f56954', '#00a65a'],
              data: [lksCurrentCapacity, 1424 - lksCurrentCapacity]
            }]
        }
        var kgcCapacityChartData = {
          labels: ['Occupancy', 'Available'],
          datasets: [
            {
              // borderColor: '#efefef',
              backgroundColor: ['#f56954', '#00a65a'],
              data: [kgcCurrentCapacity, 1264 - kgcCurrentCapacity]
            }]
        }
        var capacityChartOptions = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: true,
          }
        }
        var lkcCapacityChartChart = new Chart(lkcCapacityChartCanvas, {
          type: 'doughnut',
          data: lkcCapacityChartData,
          options: capacityChartOptions
        })
        var kgcCapacityChartChart = new Chart(kgcCapacityChartCanvas, {
          type: 'doughnut',
          data: kgcCapacityChartData,
          options: capacityChartOptions
        })
      }
    })
})

// The Calender
$('#calendar').datetimepicker({
  format: 'L',
  inline: true
})