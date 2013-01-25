$("#messageButton").click(function(){
    console.log($("#messageInput").val());
    $.post("scripts/updatemessage.php",{message:$("#messageInput").val()},function(data){
        console.log(data);
        if (data == "1"){
            $("#message").html("successfully set your message");
            show("map");
        }
        else{
            $("#message").html("error setting your message");
        }
    });
});
