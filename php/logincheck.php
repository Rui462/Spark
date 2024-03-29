<?php
    SESSION_START();
    if(isset($_SESSION["nev"])){
        $nev = $_SESSION["nev"];
    }
    else{
        header("Location: index");
    }
?>