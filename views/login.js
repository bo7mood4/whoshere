$("#submit").click(function(){
    $.post("scripts/login.php",{username:$("#username").val(), password:$("#password").val()},function(data){
        console.log(data);
        if (data=="1"){
            console.log("truthiness");
            show("map");
        }
        else if (data == "0"){
            $("#message").append("bad login, retry")
        }
    );
});
