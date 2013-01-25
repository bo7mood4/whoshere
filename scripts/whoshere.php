<?php
session_start();
//$_SESSION["username"] = "bob";
//$_POST["lng"] = -1;
//$_POST["lat"] = -1;
if (isset($_SESSION["username"])&&isset($_POST["lng"])&&isset($_POST["lat"])){
    require('credentials.php');
    
    $stmt = $pdo->prepare("INSERT INTO users(username,lng,lat,timestamp) VALUES(:name,:lng,:lat,NOW()) ON DUPLICATE KEY UPDATE lng = :lng, lat = :lat, timestamp = NOW()");
    $stmt->bindParam("lng",$_POST['lng']);
    $stmt->bindParam("lat",$_POST['lat']);
    $stmt->bindParam("name",$_SESSION['username']);

    if ($stmt->execute()){
        //success, let's get the list
        if ($res = $pdo->query("SELECT username,lng,lat,message,timestamp FROM users WHERE lat IS NOT NULL AND lng IS NOT NULL")){
            echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));//hopefully
        }
    }
    else{
        print_r($stmt->errorInfo());
        echo json_encode(array("error" => "malformed request"));
    }
}
else echo json_encode(array("error" => "parameters not correct or you are no longer authenticated"));


?>
