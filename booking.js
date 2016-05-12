$(function(){
  
  //Array for conflict checking
  var $currentReservations = [];
  
  //initialize datepicker
  $("#datepicker").val("Select date");
  $("#datepicker").datepicker({
    firstDay: 1,
    minDate: 0,
    dateFormat: "yy-mm-dd",
    onSelect: function(dateText, inst){
      $newDate = dateText;
    }
  });
  
  //Populate start and end selections
  (function(){
    for(var i = 8; i <= 16; i++){
      var j = i + 1;
      $("#startTime").append("<option value='" + i + "'>" + i + ":00" + "</option>"); 
      $("#endTime").append("<option value='" + j + "'>" + j + ":00" + "</option>"); 
    }
  })();
  
  //disaple end times before start time
  $("#startTime").on("change click", function(){
    var $minEnd = $("#startTime").val();   
    for(var i = 9; i <= 16; i++){
      $("#endTime option[value='" + i + "']").attr("selected", false);
        if(i <= $minEnd){
          $("#endTime option[value='" + i + "']").attr("disabled", true);
        } else {
          $("#endTime option[value='" + i + "']").attr("disabled", false); 
        }
    }
    $("#endTime option:not([disabled])").first().attr("selected", true); 
  });
 
  //Get rooms data from file
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost/booking/rooms.json", //replace with server path
    success: function(rooms){
      $.each(rooms, function(i, room){  
        $("#rooms").append("<tr><td>" + room.name + "</td>" + "<td>" + room.location + "</td>" + "<td>" + room.persons + "</td></tr>");   
        $("#room").append("<option value=" + room.name + " data-color=" + room.color + ">" + room.name + "</option>");
      });
    },
    error: function(){
      $("#errorText").text("Error on reading rooms data.");
      $("#errorMessage").modal();
    }              
  });
  
  //Check and save new reservation
  $("#saveReservation").on("click", function(){  
    if($("#datepicker").val() == "Select date"){
      $("#errorText").text("Please select date first.");
      $("#errorMessage").modal();
    }
    var $selectedRoom = $("#room");
    var $startTime = $("#startTime");
    var $endTime = $("#endTime");
    var $calColor = $("#room").find(":selected").data("color");
    var $newReservation = "date=" + $newDate + "&room=" + $selectedRoom.val() + "&start=" + $startTime.val() + "&end=" + $endTime.val() + "&id=" + $.now() + "&color=" + $calColor;
    var $noConflict = false;
    
    //Check conflicts
    $.each($currentReservations, function(i, currentReservation){
      if(Number(currentReservation.end) <= Number($startTime.val()) ||
         Number($endTime.val()) <= Number(currentReservation.start) ||
         currentReservation.room != $selectedRoom.val() ||
         currentReservation.date != $("#datepicker").val()){
           $noConflict = true;
        } else {
          $noConflict = false;
          $("#errorText").text("Conflict with reservation:");
          $("#errorDetails").text(currentReservation.room + " " + currentReservation.date + " " + currentReservation.start + ":00 " + currentReservation.end + ":00");
          $("#errorMessage").modal();
          return false;
        }
    });
    //Save if no conflicts
    if($noConflict){
    $.ajax({
      type: "POST",
      dataType: "text",
      url: "http://localhost/booking/save.php", //replace with server path
      data: $newReservation,
      success: function(newReservation) {
        $("#successText").text("Reservation saved");
        $("#successMessage").modal();
        location.reload();
      },
      error: function(){
        $("#errorText").text("Error on saving reservation.");
        $("#errorMessage").modal();
      }
    });
    }
  });
 
  //Get reservations data from file
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost/booking/reservations.json", //replace with server path
    success: function(reservations){
      $currentReservations = reservations;
      $.each(reservations, function(i, reservation){ 
        if(reservation.id){  
          $("#reservations").append("<li class='list-group-item'><button class='delete btn btn-danger' id=" + reservation.id + ">Delete</button>" + reservation.room + " " + 
          moment(reservation.date).format("DD.MM.YYYY") + " " + reservation.start + ":00 " + reservation.end + ":00</li>");
          if(reservation.start < 10) {
            reservation.start = "0" + reservation.start;
          }
          if(reservation.end < 10) {
            reservation.end = "0" + reservation.end;
          }
          //View reservation on calendar
          $("#calendar").fullCalendar("renderEvent", {title: reservation.room, start: "" + reservation.date + "T" + reservation.start + ":00:00", end: reservation.date + "T" +
          reservation.end + ":00:00", color: reservation.color}, "stick");
        }
      });
    },
    error: function(){
      $("#errorText").text("Error on reading reservations data.");
      $("#errorMessage").modal();
    }             
  });
  
  //Delete reservation
  $("#reservations").delegate(".delete", "click", function(){ 
    $.ajax({
      type: "POST",
      dataType: "text",
      url: "http://localhost/booking/delete.php", //replace with server path
      data: "id=" + $(this).attr("id"),
      success: function(){
        location.reload();
      }
    });
  });
  
  //Booking calendar
  $("#calendar").fullCalendar({
    lang: "fi",
	  defaultView: "agendaWeek",
    minTime: "08:00:00",
    maxTime: "18:00:00",
    height: "auto",
    allDaySlot: false
  });
   
});