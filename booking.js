$(function(){
    
    //Get rooms data from file
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "rooms.json",
        success: function(rooms){
            $.each(rooms, function(i, room){
                $("#rooms").append("<li>"+ room.name + "</li>");    
            });
        },
        error: function(){
            alert("Error on reading rooms data.");
        }              
    });
   
});