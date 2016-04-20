$(function(){
  
  //initialize datepicker
  $( "#datepicker" ).datepicker({
    firstDay: 1,
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
   
});