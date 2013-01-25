<?php
session_start();
require('credentials.php');
$_POST["username"] = "bob";
$_POST["password"] = "8Characters!";
if (isset($_SESSION["username"])){//fast track
    echo 1;
}
else if (isset($_POST["username"])&&isset($_POST["password"])){
    $stmt = $pdo->prepare("select COUNT(*) FROM users WHERE username = ? AND password = ?");
    $stmt->bindParam(1,$_POST['username']);
    $stmt->bindParam(2,md5($_POST['password']));
    if ($stmt->execute()){
        $bool = $stmt->fetch(PDO::FETCH_NUM);
        $bool = $bool[0];
        if ($bool == 1){//authenticated
            echo 1;//echo true didnt work
            $_SESSION["username"] = $_POST["username"];
        }
        else{//not authenticated or something really bad happened
            echo 0;
        }
    }
    else echo "problem officer";
}
else echo 0;

?>
