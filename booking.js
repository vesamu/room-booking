$(function(){
  
  //Array for conflict checking
  var $currentReservations = [];
  
  //initialize datepicker
  $("#datepicker").datepicker({
    firstDay: 1,
    minDate: 0,
    dateFormat: "dd.mm.yy",
    onSelect: function(dateText, inst){
      $newDate = "date=" + dateText;
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
        $("#rooms").append("<td><ul><li>" + room.name + "</li>" + "<li>" + room.location + "</li>" + "<li>" + room.persons + "</li></ul></td>");   
        $("#room").append("<option value=" + room.name + ">" + room.name + "</option>");
      });
    },
    error: function(){
      alert("Error on reading rooms data.");
    }              
  });
  
  //Check and save new reservation
  $("#saveReservation").on("click", function(){  
    var $selectedRoom = $("#room");
    var $startTime = $("#startTime");
    var $endTime = $("#endTime");
    var $newReservation = $newDate + "&room=" + $selectedRoom.val() + "&start=" + $startTime.val() + "&end=" + $endTime.val();
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
          alert("Conflict with reservation: " + currentReservation.room + " " + currentReservation.date + 
          " " + currentReservation.start + ":00 " + currentReservation.end + ":00");
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
        alert("Reservation saved");
      },
      error: function(){
        alert("Error on saving reservation.");
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
        $("#reservations").append("<li>" + reservation.room + " " + reservation.date + " " + reservation.start + ":00 " + reservation.end + ":00</li>"); 
      });
    },
    error: function(){
      alert("Error on reading reservations data.");
    }             
  });
   
});