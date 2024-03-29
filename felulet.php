<?php
    include 'php/logincheck.php';
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/felulet.css">
    <link rel="stylesheet" href="css/ertesites.css">
    <title>Spark | <?php echo $nev;?></title>
</head>
<body>
    <input type='hidden' id='fnev' value='<?php echo $_SESSION["nev"];?>'/>
    <div id='ertesitescontainer' class='ertesitescontainer'>
    </div>
    <div id='felulet'>
    <div id='mydiv'>
        <div id="mydivheader">Nincs aktív chat.</div>
        <div style='border: 2px solid white; width: 100%; box-sizing: border-box;'>
            <div id='uzenetek' style='height: 30em;'>
            <div style='padding: 0.8em;'>
            </div>
            </div>
        </div>
    </div>
    <div class='oldalpanel'>
        <div class='felhasznalokereses'>
            <input type='text' id='keresesnev' placeholder='Felhasználó hozzáadása...' />
            <input type='button' id='keresesnev' onclick='felhasznalokereses()' value='Keresés' />
            <button href='logout' style='color: #a62929; border: 2px solid #a62929; cursor: pointer;' onclick='window.location.href = "logout";' id='keresesnev'>Kijelentkezés</button>
        </div>
        <div style='padding-top: 2em;'></div>
        <div style='background-color: white; color: black; font-family: robtronika; font-size: 0.8em; text-align: center; padding: 0.5em;'>Barátok</div>
        <div id='emberek'>

        </div>
    </div>
    </div>
</body>
<script src='js/felulet.js'></script>
<script src='js/ertesites.js'></script>
<script>
    dragElement(document.getElementById("mydiv"));
</script>
</html>