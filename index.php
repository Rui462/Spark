<?php
    SESSION_START();
    if(isset($_SESSION["nev"])){
        header("Location: felulet");
    }
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spark | Bejelentkezés</title>
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/ertesites.css">
</head>
<body>
    <div id='ertesitescontainer' class='ertesitescontainer'>
    </div>
    <div id='glitch' class="glitch-wrapper">
        <div class="glitch" data-glitch="Spark">Spark</div>
    </div>
    <div id='bejelentkezofelulet' class='bejelentkezofelulet'>
        <div id='bejelentkezo'>
        <span style='font-family: robtronika; color: white; font-size: 1.5em;'>BEJELENTKEZÉS</span>
        <div style='padding-top: 1em;'></div>
        <input type='text' id='felhasznalonev' onkeydown='billentyuhang()' placeholder='Felhasználónév'/>
        <div style='padding-top: 1em;'></div>
        <input type='text' id='jelszo' placeholder='Jelszó' onkeydown='billentyuhangjelszo()' style='-webkit-text-security: square;'/>
        <div style='padding-top: 1em;'></div>
        <input type='button' id='bejelentkezes' value='BEJELENTKEZÉS' class='bejelentkezesgomb'/>
        <div style='padding-top: 1em;'></div>
        <input type='button' id='regisztracioat' value='REGISZTRÁCIÓ' class='bejelentkezesgomb'/>
        </div>
    </div>
    <div id='regisztraciofelulet' class='bejelentkezofelulet'>
        <span style='font-family: robtronika; color: white; font-size: 1.5em;'>REGISZTRÁCIÓ</span>
        <div style='padding-top: 1em;'></div>
        <input type='text' id='felhasznalonevreg' onkeydown='billentyuhang()' placeholder='Felhasználónév'/>
        <div style='padding-top: 1em;'></div>
        <input type='text' id='jelszoreg' placeholder='Jelszó' style='-webkit-text-security: square;' onkeydown='billentyuhangjelszo()' />
        <div style='padding-top: 1em;'></div>
        <input type='text' id='emailreg' placeholder='Email' onkeydown='billentyuhangemail()' />
        <div style='padding-top: 1em;'></div>
        <input type='button' id='regisztraciooke' value='REGISZTRÁCIÓ' class='bejelentkezesgomb'/>
        <div style='padding-top: 1em;'></div>
        <input type='button' id='regvissza' value='VISSZA A BEJELENTKEZÉSHEZ' class='bejelentkezesgomb'/>
    </div>

</body>
<script src='js/ertesites.js'></script>
<script src='js/login.js'></script>
</html>