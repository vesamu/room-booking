$(function(){
  
  $( "#datepicker" ).datepicker({
    firstDay: 1
  });
      
  //Get rooms data from file
  $.ajax({
    type: "GET",
      dataType: "json",
      url: "rooms.json",
      success: function(rooms){
        $.each(rooms, function(i, room){
          $("#rooms").append("<td><ul><li>" + room.name + "</li>" + "<li>" + room.location + "</li>" + "<li>" + room.persons + "</li></ul></td>");    
        });
      },
      error: function(){
        alert("Error on reading rooms data.");
      }              
  });
   
});