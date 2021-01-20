<?php


$user = 'root';
$password = 'root';
$db = 'tctl';
$host = 'localhost';

$link = mysqli_connect($host, $user, $password, $db) 
    or die("Ошибка " . mysqli_error($link));



?>