
$("#submit").click(function(){
    $.post("scripts/authenticate.php",{username:$("#username").val(), password:$("#password").val()},function(data){
        console.log(data);
        if (data=="1"){
            $("#message").html("successfully logged in!");
            show("map");
        }
        else if (data == "0"){
            $("#message").html("bad login, retry")
        }
    });
});
$("#create").click(function(){
    $.post("scripts/createuser.php",{username:$("#username").val(), password:$("#password").val()},function(data){
        console.log(data);
        if (data=="1"){
            console.log("truthiness");
            show("map");
        }
        else if (data == "0"){
            $("#message").append("bad login, retry")
        }
    });
});
