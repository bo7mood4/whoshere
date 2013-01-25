$.get("scripts/logout.php",function(data){
    if (data == "1"){
        $("#message").html("successfully logged out!");
    }
    else $("#message").html("error deleting session");
});
