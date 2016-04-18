$(function(){
    
    //Get rooms data from file
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "rooms.json",
        success: function(rooms){
            $.each(rooms, function(i, room){
                $("#rooms").append("<tr><td>" + room.name + "</td>" + "<td>" + room.location + "</td>" + "<td>" + room.persons + "</td></tr>");    
            });
        },
        error: function(){
            alert("Error on reading rooms data.");
        }              
    });
   
});