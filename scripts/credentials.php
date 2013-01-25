<?php
    $username = "root";
    $password = "8Characters!";//mysql.99;
    $database = "whoshere";//menu;    
    $host = "localhost";

    $pdo = new PDO("mysql:dbname=$database;host=".$host, $username, $password);


?>
