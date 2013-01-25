console.log("i fire now");
$("#submit").click(function(){
    console.log("you submitted");
    $.post("scripts/authenticate.php",{username:$("#username").val(), password:$("#password").val()},function(data){
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
$("#create").click(function(){
    show("create");
});
