<?php
session_start();
if (session_destroy()){
    echo 1;
}
else echo 0;

?>
