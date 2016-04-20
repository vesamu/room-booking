$(function(){
  
  //initialize datepicker
  $( "#datepicker" ).datepicker({
    firstDay: 1,
    dateFormat: "dd.mm.yy",
    onSelect: function(dateText, inst) {
      $newDate = "date=" + dateText;
    }
  });
   
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
    var $newReservation = $newDate + "&room=" +$selectedRoom.val();
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
        //$("#reservations").append("<li>" + reservation.room + "</li>" + "<li>" + reservation.date + "</li>");   
        $("#reservations").append("<li>" + reservation.room + " " + reservation.date + "</li>"); 
      });
    },
    error: function(){
      alert("Error on reading reservations data.");
    }              
  });
   
});