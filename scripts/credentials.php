<?php
    $username = "root";
    $password = "YOURPASSWORD";//mysql.99;
    $database = "whoshere";//menu;    
    $host = "localhost";

    $pdo = new PDO("mysql:dbname=$database;host=".$host, $username, $password);


?>
