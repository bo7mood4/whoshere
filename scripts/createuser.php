<?php
session_start();
require('credentials.php');

if (isset($_POST["username"])&&isset($_POST["password"])){
    $stmt = $pdo->prepare("INSERT INTO users(username,password,timestamp) VALUES(:username,:password,NOW())");
    $stmt->bindParam("username",$_POST['username']);
    $stmt->bindParam("password",md5($_POST['password']));
    if ($stmt->execute()){
        echo 1;//success
    }
    else echo 0;//failure. prolly duplicate key
}

?>
