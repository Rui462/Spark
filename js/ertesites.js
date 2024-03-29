let hibacounter = 0;
let sikercounter = 0;
function hiba(cim, szoveg){
    if(hibacounter==0){
        document.getElementById('ertesitescontainer').style.visibility = 'visible';
        document.getElementById('ertesitescontainer').style.opacity = '1';
        document.getElementById("ertesitescontainer").style.animationName = 'ertesites';
        document.getElementById("ertesitescontainer").style.animationDuration = '7s';
        document.getElementById("ertesitescontainer").style.animationFillMode = 'none';
        document.getElementById('ertesitescontainer').innerHTML = `
            <div class='ertesites' style='border: 2px solid #6b0d09;'>
                <span style='color: #a82b27; font-family: roboto; font-size: 1.3em;'><b>${cim}</b></span><br>
                <span style='color: #c94a44; font-family: roboto; font-size: 1.3em;'>${szoveg}</span>
            </div>
        `;
        hibacounter = 1;
        setTimeout(function(){
            document.getElementById("ertesitescontainer").style.animationName = null;
            document.getElementById("ertesitescontainer").style.animationDuration = null;
            document.getElementById("ertesitescontainer").style.animationFillMode = null;
            hibacounter = 0;
        }, 7000)
    }
}
function sikeres(cim, szoveg){
    if(sikercounter==0){
        document.getElementById('ertesitescontainer').style.visibility = 'visible';
        document.getElementById('ertesitescontainer').style.opacity = '1';
        document.getElementById("ertesitescontainer").style.animationName = 'ertesites';
        document.getElementById("ertesitescontainer").style.animationDuration = '7s';
        document.getElementById("ertesitescontainer").style.animationFillMode = 'none';
        document.getElementById('ertesitescontainer').innerHTML = `
            <div class='ertesites' style='border: 2px solid #32a852;'>
                <span style='color: #32a852; font-family: roboto; font-size: 1.3em;'><b>${cim}</b></span><br>
                <span style='color: #70d16d; font-family: roboto; font-size: 1.3em;'>${szoveg}</span>
            </div>
        `;
        hibacounter = 1;
        setTimeout(function(){
            document.getElementById("ertesitescontainer").style.animationName = null;
            document.getElementById("ertesitescontainer").style.animationDuration = null;
            document.getElementById("ertesitescontainer").style.animationFillMode = null;
            hibacounter = 0;
        }, 7000)
    }
}
function figyelmeztet(cim, szoveg){

}