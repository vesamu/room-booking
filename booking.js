$(function(){
  
  //initialize datepicker
  $("#datepicker").datepicker({
    firstDay: 1,
    dateFormat: "dd.mm.yy",
    onSelect: function(dateText, inst){
      $newDate = "date=" + dateText;
    }
  });
  
  //Populate start and end selections
  (function(){
    for(var i = 8; i <= 16; i++){
      var j = i + 1;
      $("#startTime").append("<option value='" + i +"'>" + i + ":00" + "</option>"); 
      $("#endTime").append("<option value='" + j +"'>" + j + ":00" + "</option>"); 
    }
  })();
   
  //Get rooms data from file
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost/booking/rooms.json",
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
  
  //Post new reservation to PHP script
  $("#saveReservation").on("click", function(){  
    var $selectedRoom = $("#room");
    var $startTime = $("#startTime");
    var $endTime = $("#endTime");
    var $newReservation = $newDate + "&room=" + $selectedRoom.val() + "&start=" + $startTime.val() + "&end=" + $endTime.val();
    $.ajax({
      type: "POST",
      dataType: "text",
      url: "http://localhost/booking/save.php",
      data: $newReservation,
      success: function(newReservation) {
        alert("ok");
      },
      error: function(){
        alert("Error on saving reservation.");
      }
    });
  });
 
  //Get reservations data from file
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost/booking/reservations.json",
    success: function(reservations){
      $.each(reservations, function(i, reservation){  
        $("#reservations").append("<li>" + reservation.room + " " + reservation.date + " " + reservation.start + ":00 " + reservation.end + ":00</li>"); 
      });
    },
    error: function(){
      alert("Error on reading reservations data.");
    }             
  });
   
});