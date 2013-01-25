<?
session_start();
require('credentials.php');

if (isset($_SESSION['username'])&&isset($_POST["message"])){
    $stmt = $pdo->prepare("UPDATE users SET message = :message WHERE username = :name");
    $stmt->bindParam("message",$_POST["message"]);
    $stmt->bindParam("name",$_SESSION['username']);
    if ($stmt->execute()){
        echo 1;//TODO: should prolly change? we can send errors if it's JSON
    }
    else echo 0;
}
else echo 0;

?>
