<?php
session_start();

if (isset($_SESSION["username"])){//fast track
    echo 1;
}
else echo 0;

?>
