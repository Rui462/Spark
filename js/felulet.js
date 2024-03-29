function $(id){
    return document.getElementById(id);
}

document.getElementById('keresesnev').setAttribute('size',document.getElementById('keresesnev').getAttribute('placeholder').length);

function ellenorzes(){
    document.fonts.ready.then(() => {
        betoltes();
      })
      
}

function betoltes(){
    setTimeout( function(){
        $('betoltes').style.animationName = 'eltunik';
        $('betoltes').style.animationDuration = '0.2s';
        $('betoltes').style.animationFillMode = 'both';
        $('felulet').style.animationName = 'megjelen';
        $('felulet').style.animationDuration = '0.3s';
        $('felulet').style.animationDelay = '0.5s';
        $('felulet').style.animationFillMode = 'both';
    }, 500)
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

async function felhasznalokeres(adat){
    try {
        let keres = await fetch('./php/index.php/felhasznalokeres', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let valasz = await keres.json();
        if(valasz.uzenet == 'nincsilyen'){
            hiba("Hiba!","Nem létezik ilyen felhasználó");
        }
        if(valasz.uzenet == 'marvan'){
            hiba("Hiba!","A felhasználó már az ismerősöd!");
        }
        if(valasz.uzenet == 'sikerkuldve'){
            sikeres("Siker!","A felhasználónak is vissza kell igazolnia téged! (Rád kell keresnie.)");
        }
        if(valasz.uzenet == 'sikerkapva'){
            sikeres("Siker!","A felhasználóval ismerősök vagytok!");
            emberlistazas();
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function emberlistazas(){
    document.getElementById('emberek').innerHTML = "";
    try {
        let keres = await fetch('./php/index.php/emberlistazas', {
            method : 'POST',
        });
        let valasz = await keres.json();
        if(valasz.valasz.uzenet=='Nincs találat!'){
            document.getElementById('emberek').innerHTML += `
            <div style='width: 100%; padding: 1em; text-align: center; font-family: robtronika; font-size: 0.7em; color: white;'>
                Nincs ismerős
            </div>
            `;
        }
        else{
            for(let i=0; i<(valasz.valasz).length; i++){
                if(valasz.valasz[i]['felhasznaloid_egy']==valasz.nev){
                    var kijelzettnev = valasz.valasz[i]['felhasznaloid_ketto'];
                }
                else{
                    var kijelzettnev = valasz.valasz[i]['felhasznaloid_egy'];
                }
                document.getElementById('emberek').innerHTML += `
                <div class='felhasznalogomb' onclick='chatablak("${valasz.valasz[i]['uzenetid']}","${kijelzettnev}")' style='width: 100%; padding: 1em; text-align: center; box-sizing: border-box; border: 2px solid white;'>
                    ${kijelzettnev}
                </div>
                `;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

function felhasznalokereses() {
    let kuldendo = {
        'nevkeres' : $('keresesnev').value    
    };

    felhasznalokeres(kuldendo);
   
}

async function chatmegnyit(adat){
    try {
        let keres = await fetch('./php/index.php/chatmegnyitas', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let valasz = await keres.json();
        let masik = 0;

        document.getElementById("mydivheader").innerHTML = `${valasz.kinev}`;
        document.getElementById("uzenetek").innerHTML = `<div style='height: 100%;'>
            <div id='uzi' style='overflow: scroll; display: flex; flex-direction: column; justify-content: flex-end; height: 30em; padding: 0.5em; box-sizing: border-box;'>
            </div>
            <div style='position: relative; top: 0%; box-sizing: border-box; padding: 0; width: 100%; transform: translate(0%); border: 1px solid white;'><input type='text' id='uzenetszoveg' style='padding: 1em; width: 100%; background-color: #121212; color: white; outline: none;' placeholder='Üzenet...'></div>
            </div>`;
        document.getElementById('uzenetszoveg').addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                uzenetkuld(document.getElementById('uzenetszoveg').value);
            }
        }); 
        if(valasz.uzenetek.uzenet!='Nincs találat!'){
            for(let i = 0; i<(valasz.uzenetek).length; i++){
                document.getElementById('uzi').innerHTML += `<div style='width: 100%; width: 100%; color: white; font-family: Verdana;'><b>${valasz.uzenetek[i]['nev']}</b> : ${valasz.uzenetek[i]['uzenet']}<hr></div>`;
                if(valasz.uzenetek[i]['nev']!=document.getElementById('fnev').value){
                    masik+=1;
                }
            }
            localStorage.setItem('uzdb',masik);
        }
        

    }
    catch (error) {
        console.log(error);
    }
}

async function uzenetcheck(adat){
    try {
        let keres = await fetch('./php/index.php/uzenetcheck', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let valasz = await keres.json();
        if(valasz.valasz!="nincsuj"){
            localStorage.setItem('uzdb',valasz.db);
            for(let i = 0; i<(valasz.valasz).length; i++){
                document.getElementById('uzi').innerHTML += `<div style='width: 100%; color: white; font-family: Verdana;'><b>${valasz.valasz[i]['nev']}</b> : ${valasz.valasz[i]['uzenet']}<hr></div>`;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

function chatablak(id){
    let kuld = {
        'id' : id,
   }
   localStorage.setItem('chatid',id);
    chatmegnyit(kuld);
    window.setInterval( function(){
        let keres = {
            'id' : id,
            'db' : localStorage.getItem('uzdb')
        };
        uzenetcheck(keres);
      },3000)
}

async function uzenetkuldes(adat){
    try {
        let keres = await fetch('./php/index.php/uzenetkuld', {
            method : 'POST',
            body : JSON.stringify(adat)
        });
        let nev = document.getElementById('fnev').value;
        let uzszoveg = document.getElementById('uzenetszoveg').value;
        document.getElementById('uzi').innerHTML += `<div style='width: 100%; color: white; font-family: Verdana;'><b>${nev}</b> : ${uzszoveg}<hr></div>`;
        document.getElementById('uzenetszoveg').value = "";
    }
    catch (error) {
        console.log(error);
    }
}

function uzenetkuld(uzenet){
    let id = localStorage.getItem('chatid');
    let kuld = {
        'uzenet' : uzenet,
        'id' : id
    };
    uzenetkuldes(kuld);
}

window.onload = ellenorzes();
window.onload = emberlistazas();
window.onload = localStorage.removeItem('chatid');
window.onload = localStorage.removeItem('uzdb');
window.onload = document.body.innerHTML += `<div id='betoltes' style='position: absolute; top:50%; left: 50%; transform: translate(-50%, -50%);' class="lds-ripple"><div></div><div></div></div>`;